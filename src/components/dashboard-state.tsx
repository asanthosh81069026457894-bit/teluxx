// Shared state for the /dashboard workspace + /talk transcript.
//
// Why this module exists:
//   - Chat history and talk transcript were each held in local component
//     state. Switching Documents ↔ Chat ↔ Talk remounted those components
//     and wiped the messages.
//   - The user wants the conversation history to persist as they move
//     between features in a single session and across page reloads, so
//     the panels can hold multi-turn context without losing turns when
//     the user clicks around the app.
//
// Why two layers:
//   - `chatMessages` is exposed as a module-level external store
//     **backed by localStorage** via `useChatMessages()`. The chat
//     panel lives inside /dashboard, but the user navigates away
//     (Documents ↔ Chat) and back frequently; a Provider was
//     destroyed on unmount, wiping the conversation. Module-level
//     state survives navigation, and a localStorage mirror survives
//     hard reloads so the user can pick up the conversation tomorrow.
//   - `talkMessages` is exposed as a module-level external store via
//     `useTalkMessages()`. The /talk route is a separate page, and the
//     DashboardStateProvider unmounts when the user navigates away from
//     `/dashboard`. The external store survives that navigation so the
//     rolling transcript is preserved when the user comes back. /talk
//     is intentionally session-only (a page reload clears it) — the
//     feature is a live voice workspace, not a Claude-style chat log.
//
// The external stores use React's `useSyncExternalStore` so any
// component reading the messages re-renders when the list grows. No
// external state library is needed — two plain arrays + one
// subscription mechanism + optional localStorage mirror.

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// --- Shared message shape -----------------------------------------------------

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  error?: boolean;
  feedback?: "up" | "down" | null;
  // Names of the documents that contributed to this assistant answer.
  // Surfaced in the UI as "Answered from: a.pdf, b.pdf" so the user
  // can see when an answer came from multiple files.
  contributors?: string[];
};

// `talkMessages` reuses the same shape so the panel components can be
// used without per-feature typing.
export type Message = ChatMessage;

// --- External store for /talk messages (module-level, session-only) ----------

let talkMessages: ChatMessage[] = [];
const talkListeners = new Set<() => void>();

function emitTalk(): void {
  for (const fn of talkListeners) fn();
}

function subscribeTalk(listener: () => void): () => void {
  talkListeners.add(listener);
  return () => {
    talkListeners.delete(listener);
  };
}

function getTalkSnapshot(): ChatMessage[] {
  return talkMessages;
}

// React's `useSyncExternalStore` requires a server snapshot that's
// referentially stable. Returning the same empty array each time keeps
// SSR happy and avoids hydration mismatches.
const EMPTY_SNAPSHOT: ChatMessage[] = [];
function getTalkServerSnapshot(): ChatMessage[] {
  return EMPTY_SNAPSHOT;
}

/**
 * Read/write the talk-with-document transcript. Survives navigation away
 * from /talk because the store is module-level (not React-state). Lives
 * only in memory; a page reload clears it (the rolling transcript is
 * ephemeral by design — /talk is ephemeral by design).
 */
export function useTalkMessages(): {
  messages: ChatMessage[];
  setMessages: (next: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
} {
  const snapshot = useSyncExternalStore(subscribeTalk, getTalkSnapshot, getTalkServerSnapshot);
  // Wrap setState so callers can pass either a new array or an updater fn.
  // The wrapper runs the updater against the freshest snapshot, not the
  // one captured in a closure — same trick the chat panel already uses.
  const setMessages = useCallback(
    (next: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
      talkMessages =
        typeof next === "function"
          ? (next as (p: ChatMessage[]) => ChatMessage[])(talkMessages)
          : next;
      emitTalk();
    },
    [],
  );
  return { messages: snapshot, setMessages };
}

/** Clear the talk transcript (used by future "Clear conversation" buttons). */
export function clearTalkMessages(): void {
  talkMessages = [];
  emitTalk();
}

// --- External store for chat messages (module-level + localStorage) ----------
//
// The chat panel lives inside /dashboard. The user navigates away
// (Documents ↔ Chat) and back frequently; an in-context store was
// destroyed on unmount, wiping the conversation. Module-level state
// survives navigation, and a localStorage mirror survives hard reloads
// so the user can pick up the conversation tomorrow.
//
// Schema-versioned key (`-v1`) so we can bump the suffix when the
// message shape changes — old data is silently ignored without writing
// a migration. Bounded by `CHAT_MAX_MESSAGES` so the entry can't grow
// without bound; oldest turns are dropped on overflow.
//
// Pane-aware AND user-aware history: when the Parallel tab on /dashboard
// mounts two ChatPanels side-by-side, each pane needs its own scrollback.
// And accounts that share a device (Google login on a shared laptop, or
// a family computer) need to see their own scrollback, not each other's.
//
// The key shape is:
//   `telux:chat-history-v1:<userId>:<paneId>` when signed in
//   `telux:chat-history-v1:anon:<paneId>`         when not signed in
//   `telux:chat-history-v1`                       legacy fallback (no
//                                                user/pane) — preserved so
//                                                users with a saved chat
//                                                from before this change
//                                                keep their scrollback.

const CHAT_STORAGE_PREFIX = "telux:chat-history-v1";
const ANON_USER = "anon";
const CHAT_MAX_MESSAGES = 200; // hard cap so the entry can't grow without bound

function chatStorageKey(
  paneId: string | null | undefined,
  userId: string | null | undefined,
): string {
  if (paneId) return `${CHAT_STORAGE_PREFIX}:${userId || ANON_USER}:${paneId}`;
  if (userId) return `${CHAT_STORAGE_PREFIX}:${userId}`;
  return CHAT_STORAGE_PREFIX;
}

// Per-pane in-memory caches. Keyed by the localStorage key (with any
// `:paneId` suffix), value is the cached message array. Lazy-initialised
// on first read so panels that never mount don't pull anything from
// storage.
const chatMessagesByKey = new Map<string, ChatMessage[]>();
const chatListenersByKey = new Map<string, Set<() => void>>();

function loadChatFromStorage(storageKey: string): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessage =>
        m &&
        typeof m === "object" &&
        typeof m.id === "string" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.text === "string",
    );
  } catch {
    return [];
  }
}

function persistChat(storageKey: string, next: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    const slice = next.length > CHAT_MAX_MESSAGES ? next.slice(-CHAT_MAX_MESSAGES) : next;
    window.localStorage.setItem(storageKey, JSON.stringify(slice));
  } catch {
    // Quota / private mode / disabled storage — silent fallback.
  }
}

function emitChat(storageKey: string): void {
  const set = chatListenersByKey.get(storageKey);
  if (!set) return;
  for (const l of set) l();
}

function subscribeChat(storageKey: string, listener: () => void): () => void {
  let set = chatListenersByKey.get(storageKey);
  if (!set) {
    set = new Set();
    chatListenersByKey.set(storageKey, set);
  }
  set.add(listener);
  return () => {
    set!.delete(listener);
  };
}

function getChatSnapshot(storageKey: string): ChatMessage[] {
  let arr = chatMessagesByKey.get(storageKey);
  if (!arr) {
    arr = loadChatFromStorage(storageKey);
    chatMessagesByKey.set(storageKey, arr);
  }
  return arr;
}

function getChatServerSnapshot(): ChatMessage[] {
  return EMPTY_SNAPSHOT;
}

/**
 * Read/write the chat panel history. Persists across page reloads via
 * `localStorage`. Survives navigation between Documents and Chat inside
 * `/dashboard` because the store is module-level, not context-bound.
 *
 * Pass `paneId` to use a per-pane key (the Parallel tab does this so
 * the two side-by-side chats don't clobber each other). Pass `userId`
 * to use a per-user key (so two accounts on the same device see
 * separate scrollback). Both can be combined:
 *
 *   useChatMessages("multiA", session?.user?.id)
 *
 * When neither is passed, falls back to the legacy key so users with a
 * saved chat from before this change keep their scrollback.
 */
export function useChatMessages(
  paneId: string | null | undefined = undefined,
  userId: string | null | undefined = undefined,
): {
  messages: ChatMessage[];
  setMessages: (next: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
} {
  const storageKey = chatStorageKey(paneId, userId);
  const snapshot = useSyncExternalStore(
    (l) => subscribeChat(storageKey, l),
    () => getChatSnapshot(storageKey),
    getChatServerSnapshot,
  );
  const setMessages = useCallback(
    (next: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
      const current = getChatSnapshot(storageKey);
      const nextArr =
        typeof next === "function" ? (next as (p: ChatMessage[]) => ChatMessage[])(current) : next;
      chatMessagesByKey.set(storageKey, nextArr);
      persistChat(storageKey, nextArr);
      emitChat(storageKey);
    },
    [storageKey],
  );
  return { messages: snapshot, setMessages };
}

/** Wipe the chat panel history. Pass `paneId` / `userId` to scope. */
export function clearChatMessages(
  paneId: string | null | undefined = undefined,
  userId: string | null | undefined = undefined,
): void {
  const storageKey = chatStorageKey(paneId, userId);
  chatMessagesByKey.set(storageKey, []);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore — localStorage might be disabled
    }
  }
  emitChat(storageKey);
}

// --- Dashboard context --------------------------------------------------------
//
// Kept as a thin marker provider around `DashboardPage` for any future
// dashboard-only shared state. The chat message store has been promoted
// to a module-level external store above (`useChatMessages`), so this
// provider no longer carries message data.

type DashboardStateValue = Record<string, never>;

const DashboardStateContext = createContext<DashboardStateValue | null>(null);

/**
 * Provider mounted around `DashboardPage`. Children must be inside the
 * `/dashboard` route — outside the provider the hook throws.
 */
export function DashboardStateProvider({ children }: { children: ReactNode }) {
  // Intentionally empty: chat messages moved to `useChatMessages()` (a
  // module-level external store with localStorage backing). The provider
  // remains so any dashboard-only shared state added later has a home.
  const value = useMemo<DashboardStateValue>(() => ({}), []);
  return <DashboardStateContext.Provider value={value}>{children}</DashboardStateContext.Provider>;
}

export function useDashboardState(): DashboardStateValue {
  const ctx = useContext(DashboardStateContext);
  if (!ctx) {
    throw new Error("useDashboardState must be used inside a <DashboardStateProvider />.");
  }
  return ctx;
}
