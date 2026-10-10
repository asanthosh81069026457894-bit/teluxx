// AuthGate — single wrapper applied to every protected route.
//
// Post-payment-removal: we ONLY block on the Supabase session. No more
// background subscription fetch, no more backend-offline warning. The
// dashboard mounts the instant we know who's signed in.
//
// Flow:
//   1. Supabase session resolves → render the dashboard IMMEDIATELY.
//   2. Onboarding row missing AND we have no name to fall back on (rare:
//      Google OAuth with no full_name and no onboarding_responses row) →
//      overlay OnboardingModal. The modal is a single form (name +
//      language) so signup → working app is now zero clicks.
//
// Name fallback: the signup form already writes `full_name` into
// `auth.users.raw_user_meta_data`, and `OnboardingModal` falls back to
// that on the off chance the row write failed. Reply language defaults
// to en-US — the chat panel has its own language picker, so blocking
// the dashboard to ask is unnecessary friction.

import { useEffect, useState, type ReactNode } from "react";

import { useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";

import { consumePendingSession, useAuth } from "@/hooks/useAuth";
import { getOnboardingStatus } from "@/serverFns/onboarding";
import { OnboardingModal } from "@/components/OnboardingModal";

function readSessionFullName(
  session: { user?: { user_metadata?: Record<string, unknown> } } | null,
): string {
  const meta = session?.user?.user_metadata as { full_name?: unknown } | undefined;
  const v = meta?.full_name;
  return typeof v === "string" ? v.trim() : "";
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  // `undefined` = "still loading", `false` = "no onboarding row → maybe show modal",
  // `true` = "row exists (or we have a name fallback) → render dashboard".
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | undefined>(undefined);
  // Track whether the serverFn has actually returned at least once. Until
  // then we trust the auth-metadata fast path — the dashboard should
  // never be blocked waiting on a slow Supabase call.
  const [onboardingResolved, setOnboardingResolved] = useState<boolean>(false);
  // A pending-session promise set by /login or /signup before navigate().
  // AuthGate awaits it on mount so the redirect race is resolved at the
  // route boundary — React's commit phase lags navigate(), so reading
  // `session` from context alone isn't enough on the very first render.
  const [pendingHandshake, setPendingHandshake] = useState<boolean>(() => {
    return typeof window !== "undefined" && Boolean(window.__telux_pendingSession);
  });

  // Resolve the pending-session promise if one was set by the login form.
  // `consumePendingSession` returns null when there's nothing to wait for
  // (a direct visit to /dashboard with no prior auth flow).
  useEffect(() => {
    if (loading) return;
    if (session) {
      setPendingHandshake(false);
      return;
    }
    const p = consumePendingSession();
    if (!p) return;
    setPendingHandshake(true);
    let cancelled = false;
    void p.then((resolved) => {
      if (cancelled) return;
      // The AuthProvider's signIn handler has already committed the
      // session into context by the time the resolver fires, but we
      // re-render here to clear the handshake flag.
      setPendingHandshake(false);
    });
    return () => {
      cancelled = true;
    };
  }, [loading, session]);

  // Onboarding check — kicked off the moment we know who the user is. We
  // deliberately do this in parallel with rendering the dashboard so a
  // slow backend doesn't delay first paint. The modal pops in only when
  // (a) the server confirmed the row is missing AND (b) we have no
  // name in the auth metadata to fall back on.
  useEffect(() => {
    if (loading || !session?.user?.id) return;
    const userId = session.user.id;
    setOnboardingCompleted(undefined);
    setOnboardingResolved(false);
    // If the session already carries a name, treat the user as onboarded
    // for the duration of the fetch. This is the hot path — almost every
    // signup lands here because the signup form writes full_name.
    if (readSessionFullName(session)) {
      setOnboardingCompleted(true);
    }
    void getOnboardingStatus({ data: { userId } })
      .then((res) => {
        setOnboardingResolved(true);
        // Server said no row, but we have a name fallback → keep the
        // dashboard mounted and skip the modal. The chat panel falls
        // back to en-US for reply language.
        if (!res.completed && readSessionFullName(session)) {
          setOnboardingCompleted(true);
          return;
        }
        setOnboardingCompleted(res.completed);
      })
      .catch((err: unknown) => {
        console.warn("[AuthGate] onboarding status check failed:", err);
        // Network blip — keep the user in the dashboard rather than
        // throwing a modal in their face. The next sign-in (or the
        // modal submit itself) will retry the check.
        setOnboardingCompleted(true);
        setOnboardingResolved(true);
      });
  }, [loading, session?.user?.id]);

  // Re-check onboarding after the modal dispatches a successful submit.
  useEffect(() => {
    if (loading || !session?.user?.id) return;
    function onChange() {
      const userId = session?.user?.id;
      if (!userId) return;
      void getOnboardingStatus({ data: { userId } })
        .then((res) => {
          setOnboardingResolved(true);
          if (!res.completed && readSessionFullName(session)) {
            setOnboardingCompleted(true);
            return;
          }
          setOnboardingCompleted(res.completed);
        })
        .catch(() => {
          // Keep existing state on a transient failure.
        });
    }
    window.addEventListener("telux:subscription-changed", onChange);
    return () => window.removeEventListener("telux:subscription-changed", onChange);
  }, [loading, session?.user?.id]);

  // Once the auth metadata flips to having a name (rare race: user
  // updated their profile between session changes), promote the user
  // out of the onboarding state by forcing a re-render with the
  // updated gating decision below.
  useEffect(() => {
    setOnboardingCompleted((prev) =>
      prev === false && readSessionFullName(session) ? true : prev,
    );
  }, [session]);

  // Auth guard. We never redirect while a pending-session handshake is
  // active (set when /login or /signup just called signInWithPassword
  // and is mid-navigate). The handshake clears the moment the resolver
  // fires, which happens synchronously inside signInWithPassword before
  // navigate() runs.
  useEffect(() => {
    if (loading) return;
    if (session) return;
    if (pendingHandshake) return; // wait for the cross-route handshake
    const t = window.setTimeout(() => {
      // Re-check — pendingHandshake may have just cleared.
      if (pendingHandshake) return;
      void navigate({ to: "/login" });
    }, 800);
    return () => window.clearTimeout(t);
  }, [loading, session, pendingHandshake, navigate]);

  if (loading || pendingHandshake) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-signal">
            <LoaderCircle className="size-4 animate-spin text-signal-foreground" />
          </span>
          <p className="text-xs tracking-widest text-muted-foreground uppercase">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // The modal only appears when the server has confirmed the row is
  // missing AND we have no name in the auth metadata. Before the
  // serverFn has returned, we trust the auth-metadata fast path — the
  // dashboard should never be blocked waiting on a slow Supabase call.
  const showOnboarding =
    onboardingResolved === true && onboardingCompleted === false && !readSessionFullName(session);

  return (
    <>
      {children}
      {showOnboarding ? <OnboardingModal key={session.user.id} /> : null}
    </>
  );
}
