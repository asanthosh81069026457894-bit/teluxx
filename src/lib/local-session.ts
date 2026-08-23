// Single source of truth for "session-bound cleanup at sign-out".
//
// Why one helper:
//   - On explicit signOut AND on session-expiry (`SIGNED_OUT` from
//     Supabase), we run a small idempotent cleanup. Both call-sites
//     (`signOut()` and the `onAuthStateChange` listener) invoke this;
//     the listener wraps the call in a "wipe in flight" flag to keep
//     the two paths idempotent when they fire back-to-back.
//
// What changed:
//   - Per-user scoping (chat history keyed by userId in
//     `dashboard-state.tsx`, IndexedDB docs already userId-scoped)
//     means the *next* signed-in user no longer inherits the previous
//     user's data. So most of what this helper used to wipe is now
//     safe to **leave** on this device.
//   - All we still want to do is: (a) drop module-level in-memory
//     stores so the next signed-in user starts with a blank session;
//     (b) run the legacy-key migration once per browser (purges the
//     old un-namespaced keys from before this change so no
//     previous-account leakage can sneak in).
//
// What's preserved on this device across sign-outs:
//   - Per-user chat scrollback (keyed by `telux:chat-history-v1:${userId}`)
//   - Per-user IndexedDB documents (already scoped by `userId`)
//   - Voice picker preferences
//   - Usage counter
//   - Last-used email (login form autofill)
//
//   When the *next* user signs in, the chat panel mounts with their
//   own scrollback key; if they happen to share the device with the
//   previous user, neither one sees the other's history.
//
// What we clear:
//   - The module-level in-memory chat / talk arrays (so the in-memory
//     cache doesn't leak the previous user's typed-but-not-sent
//     turns across sign-outs).
//   - The legacy shared chat key (one-time cleanup of `telux:chat-
//     history-v1` from before this change, which used to be shared
//     across all users on a device).

import { clearChatMessages, clearTalkMessages } from "@/components/dashboard-state";

// Legacy keys from before per-user / per-pane namespacing. One-time
// cleanup: if these keys happen to exist on this device, we drop them
// so the new user doesn't accidentally see the previous user's data
// via the legacy fallback (`telux:chat-history-v1`).
const LEGACY_CHAT_KEY = "telux:chat-history-v1";
const LEGACY_DONE_KEY = "telux:legacy-cleanup-v1-done";

/**
 * Idempotent session-bound cleanup at sign-out. We intentionally do
 * NOT wipe per-user data — chat history and IndexedDB documents are
 * namespaced by user id, so each signed-in account sees only their own
 * history on this device. The only thing we wipe is in-memory module
 * state (so the next signed-in user starts with a blank session) and
 * legacy un-namespaced storage keys from before per-user scoping was
 * introduced.
 *
 * Safe to call multiple times — every step is idempotent.
 *
 * @param _userId Retained for back-compat. Previously used to scope
 *                the IndexedDB document delete; that's no longer
 *                needed because docs are already keyed by userId and
 *                per-user docs must survive a sign-out so the next
 *                sign-in picks them up.
 */
export async function wipeLocalSessionData(_userId: string | null): Promise<void> {
  if (typeof window === "undefined") return;

  // 1. Drop in-memory module-level stores. External stores live at module
  //    scope (not React state) so we need to clear them here, otherwise
  //    the next /dashboard mount would see this user's mid-flight
  //    pending turns.
  clearChatMessages();
  clearTalkMessages();

  // 2. One-time migration: remove legacy un-namespaced storage keys from
  //    before per-user / per-pane namespacing was introduced. The next
  //    user on this device used to inherit the previous user's chat via
  //    these. Idempotent — once we know we've run, skip.
  try {
    if (!window.localStorage.getItem(LEGACY_DONE_KEY)) {
      window.localStorage.removeItem(LEGACY_CHAT_KEY);
      window.localStorage.setItem(LEGACY_DONE_KEY, "1");
    }
  } catch {
    // localStorage may be disabled; not critical.
  }

  // 3. Defensive cleanup of the cross-route handshake in case the
  //    dashboard unmounted mid-handshake.
  window.__telux_pendingSession = undefined;

  // 4. Notify open subscribers so the UI re-reads storage. With the
  //    per-user keys, any module-level cache for the previous user is
  //    already empty; this just refreshes list views.
  window.dispatchEvent(new CustomEvent("telux:documents-changed"));
  window.dispatchEvent(new CustomEvent("telux:usage-changed"));
}
