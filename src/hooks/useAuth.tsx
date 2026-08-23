import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { supabase, SUPABASE_CONFIGURED } from "@/lib/supabase";
import { wipeLocalSessionData } from "@/lib/local-session";
import { loginWithRateLimit } from "@/serverFns/auth";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  configured: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithPassword: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * One-shot session resolver exposed on `window`. The login/signup forms set
 * `window.__telux_pendingSession` to a Promise resolving with the new
 * session BEFORE they navigate to /dashboard. The dashboard's AuthGate
 * `await`s that promise on first render — so even if React's commit phase
 * hasn't flushed the new session into context yet, the gate sees it.
 *
 * Why a window global:
 *   - The login form is in a different React subtree than the dashboard's
 *     AuthGate. There is no synchronous way to hand a freshly-minted
 *     session across the route boundary.
 *   - React context updates are async; `flushSync` works but is fragile
 *     when called from inside an `await` chain.
 *   - The dashboard route's AuthGate component is unmounted the moment
 *     we navigate away from /dashboard and remounted when we navigate
 *     back — the new render sees the post-commit state, but only AFTER
 *     React has flushed, which can lag the navigate() call.
 *
 * The window stash is the simplest, most reliable hand-off. We read it
 * once on mount and clear it immediately so a stale value can't leak
 * across sessions.
 */
declare global {
  interface Window {
    __telux_pendingSession?: {
      promise: Promise<Session | null>;
      resolve: (session: Session | null) => void;
    };
  }
}

function setPendingSession(session: Session | null) {
  if (typeof window === "undefined") return;
  if (window.__telux_pendingSession) {
    window.__telux_pendingSession.resolve(session);
  }
}

export function consumePendingSession(): Promise<Session | null> | null {
  if (typeof window === "undefined") return null;
  const p = window.__telux_pendingSession;
  if (!p) return null;
  // Clear it so a subsequent /dashboard visit doesn't read the old value.
  window.__telux_pendingSession = undefined;
  return p.promise;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setLoading(false);
      return;
    }

    let mounted = true;
    // Idempotency guard: explicit signOut() and the SIGNED_OUT event both
    // call wipeLocalSessionData. When the user clicks Sign out, both
    // fire back-to-back. Without this flag we'd run the (already-slow)
    // IndexedDB clear twice in quick succession — harmless but wasteful.
    let wipeInFlight = false;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      if (!mounted) return;
      // Session expired, refresh failed, or explicit sign-out — wipe the
      // local-only session data (chat history, voice prefs, IDB docs).
      // We only wipe when the session actually transitions away from a
      // logged-in state; the initial `INITIAL_SESSION` event is ignored
      // so the freshly-loaded user doesn't see their own data disappear.
      if (event === "SIGNED_OUT" || (event !== "INITIAL_SESSION" && nextSession == null)) {
        if (!wipeInFlight) {
          wipeInFlight = true;
          try {
            await wipeLocalSessionData(null);
          } catch (err) {
            console.warn("[AuthProvider] wipeLocalSessionData failed", err);
          } finally {
            // Keep the guard up for a short window so an immediate
            // duplicate event (e.g. signOut + the SDK's own
            // SIGNED_OUT emit) is a no-op.
            window.setTimeout(() => {
              wipeInFlight = false;
            }, 250);
          }
        }
      }
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Action functions are kept stable across renders via useRef so the
  // closure captures inside them are deterministic. We rebuild the value
  // memo whenever `session` or `loading` flips, but the FUNCTIONS inside
  // it are the same instance — they read from refs for any state they
  // need at call time.
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const signInRef = useRef<(email: string, password: string) => Promise<{ error: string | null }>>(
    async () => ({ error: "not initialised" }),
  );
  const signUpRef = useRef<
    (
      email: string,
      password: string,
      fullName?: string,
    ) => Promise<{ error: string | null; needsEmailConfirmation: boolean }>
  >(async () => ({ error: "not initialised", needsEmailConfirmation: false }));

  signInRef.current = async (email, password) => {
    if (!SUPABASE_CONFIGURED) {
      return {
        error:
          "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.",
      };
    }
    try {
      const result = await loginWithRateLimit({ data: { email, password } });
      const { error: setErr, data: setData } = await supabase.auth.setSession({
        access_token: result.accessToken,
        refresh_token: result.refreshToken,
      });
      if (setErr) {
        return { error: "Signed in but the session could not be applied. Please refresh." };
      }
      // Resolve the session from the SDK's return value. If the SDK returned
      // null (rare — happens when the access_token is rejected outright),
      // fall back to a fresh read so we don't navigate with no session.
      let resolved: Session | null = setData?.session ?? null;
      if (!resolved) {
        const { data: fresh } = await supabase.auth.getSession();
        resolved = fresh.session ?? null;
      }
      // Publish to context AND to the cross-route pending stash so the
      // dashboard's AuthGate can pick it up on first render without
      // depending on React's commit phase.
      if (resolved) setSession(resolved);
      setPendingSession(resolved);
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Sign-in failed." };
    }
  };

  signUpRef.current = async (email, password, fullName) => {
    if (!SUPABASE_CONFIGURED) {
      return { error: "Supabase is not configured.", needsEmailConfirmation: false };
    }
    const origin = import.meta.env.VITE_AUTH_REDIRECT_ORIGIN ?? window.location.origin;
    const trimmedName = fullName?.trim() ? fullName.trim() : undefined;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin.replace(/\/$/, "")}/auth/callback`,
        data: trimmedName ? { full_name: trimmedName } : undefined,
      },
    });
    if (error) return { error: error.message, needsEmailConfirmation: false };
    if (data.session) {
      setSession(data.session);
      setPendingSession(data.session);
    }
    const user = data.user;
    const hasSession = Boolean(data.session);
    const unconfirmed = !hasSession && user != null && user.email_confirmed_at == null;
    return { error: null, needsEmailConfirmation: unconfirmed };
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      configured: SUPABASE_CONFIGURED,
      // Bound wrappers so consumers always call the latest impl without
      // holding a stale reference.
      signInWithPassword: (email, password) => signInRef.current(email, password),
      signUpWithPassword: (email, password, fullName) =>
        signUpRef.current(email, password, fullName),
      async signInWithGoogle() {
        if (!SUPABASE_CONFIGURED) {
          return { error: "Supabase is not configured." };
        }
        const origin = import.meta.env.VITE_AUTH_REDIRECT_ORIGIN ?? window.location.origin;
        const redirectTo = `${origin.replace(/\/$/, "")}/auth/callback`;
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo, queryParams: { prompt: "select_account" } },
        });
        return { error: error?.message ?? null };
      },
      async signOut() {
        if (!SUPABASE_CONFIGURED) return;
        // Capture the userId before the SDK nulls the session — we need
        // it to scope the IndexedDB document wipe to this user only.
        const userId = sessionRef.current?.user?.id ?? null;
        await supabase.auth.signOut();
        // The `SIGNED_OUT` event will also fire from `signOut()` and
        // re-enter this path. The wipeInFlight guard above deduplicates,
        // so calling here is safe but optional — we still do it for
        // the case where the Supabase event doesn't reach us (e.g. the
        // SDK is in a degraded state).
        try {
          await wipeLocalSessionData(userId);
        } catch (err) {
          console.warn("[useAuth.signOut] wipeLocalSessionData failed", err);
        }
      },
    }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
