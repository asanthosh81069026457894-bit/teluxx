import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase, SUPABASE_CONFIGURED } from "@/lib/supabase";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallbackPage,
});

function setPendingSession(session: Session | null) {
  if (typeof window === "undefined") return;
  if (window.__telux_pendingSession) {
    window.__telux_pendingSession.resolve(session);
  }
}

function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setError(
        "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.",
      );
      return;
    }

    // Stash a pending-session promise so the dashboard's AuthGate sees
    // the session on first render. Even with detectSessionInUrl, the
    // session is parsed by Supabase's internal code path and committed
    // through the onAuthStateChange listener — which runs as a side
    // effect and isn't always visible to React on the very next render.
    if (typeof window !== "undefined") {
      let resolve!: (s: Session | null) => void;
      const promise = new Promise<Session | null>((r) => {
        resolve = r;
      });
      window.__telux_pendingSession = { promise, resolve };
    }

    // detectSessionInUrl is enabled, so the client has already parsed the
    // URL fragment / query. Wait for the resulting session to appear.
    let cancelled = false;

    const commitAndNavigate = (session: Session) => {
      if (cancelled) return;
      // Resolve the cross-route handshake BEFORE navigate(). The
      // dashboard's AuthGate awaits this promise on first render.
      setPendingSession(session);
      void navigate({ to: "/dashboard" });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      if (session) {
        commitAndNavigate(session);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        commitAndNavigate(data.session);
      }
    });

    // If the URL itself had a problem (e.g. expired OAuth code), Supabase
    // surfaces it via getSessionFromUrl which detectSessionInUrl calls.
    // Give it a generous window — many flows take a second to land — before
    // falling back to /login. We previously used 4 s which was too short
    // for users on slow connections and would drop them into /login while
    // the session was still in flight.
    const timeout = window.setTimeout(() => {
      if (cancelled) return;
      setError("Sign-in didn't complete. Please try again.");
      if (typeof window !== "undefined") window.__telux_pendingSession = undefined;
      void navigate({ to: "/login" });
    }, 8_000);

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {error ? "Sign-in failed" : "Finishing sign-in…"}
        </h1>
        {error ? <p className="mt-2 text-sm text-muted-foreground">{error}</p> : null}
      </div>
    </div>
  );
}
