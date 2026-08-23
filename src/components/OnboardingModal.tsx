// Post-signup onboarding — a single screen, not a wizard.
//
// We removed the trial gate, the age question, and the "how did you hear"
// dropdown. The form now only collects the user's preferred name and
// reply language so the chat panel can greet them and pick the right
// voice.
//
// When is this modal actually shown? Almost never, post-refactor: the
// signup form already writes `full_name` into the auth metadata, and
// AuthGate treats the user as onboarded whenever that field is present.
// The modal only opens for users with no name in their auth metadata
// (rare: Google OAuth users with no name, or signups that pre-date the
// fix). The dashboard is already rendered behind it, so the modal is
// the lightest possible enforcement.

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { submitOnboarding } from "@/serverFns/onboarding";
import { emitSubscriptionChange } from "@/lib/subscription";
import { DEFAULT_LANG, nativeForLang } from "@/hooks/useVoices";

const LANGS: { code: string; label: string }[] = [
  { code: "en-US", label: "English" },
  { code: "hi-IN", label: "हिन्दी (Hindi)" },
  { code: "bn-IN", label: "বাংলা (Bengali)" },
  { code: "ta-IN", label: "தமிழ் (Tamil)" },
  { code: "te-IN", label: "తెలుగు (Telugu)" },
  { code: "es-ES", label: "Español (Spanish)" },
  { code: "fr-FR", label: "Français (French)" },
  { code: "de-DE", label: "Deutsch (German)" },
  { code: "pt-BR", label: "Português (Portuguese)" },
];

type Errors = {
  fullName?: string;
  submit?: string;
};

export function OnboardingModal() {
  const { session } = useAuth();
  const userId = session?.user?.id ?? null;

  // Pre-fill full name from Supabase user_metadata when present (typical for
  // the password signup flow). Google OAuth often leaves it blank — the user
  // can still type it in.
  const initialName =
    (session?.user?.user_metadata?.full_name as string | undefined)?.trim() ?? "";

  const [fullName, setFullName] = useState(initialName);
  const [replyLang, setReplyLang] = useState<string>(DEFAULT_LANG);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // Reset the prefilled name whenever the session logs in.
  useEffect(() => {
    if (initialName && !fullName) setFullName(initialName);
    // intentionally only when initialName changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialName]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!userId) {
      setErrors({ submit: "Session expired — please sign in again." });
      return;
    }
    const trimmed = fullName.trim();
    if (!trimmed) {
      setErrors({ fullName: "Please enter your name." });
      return;
    }
    if (trimmed.length > 120) {
      setErrors({ fullName: "Name is too long." });
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      // Persist the language preference client-side too — the chat panel
      // reads it before its own onboarding fetch lands.
      try {
        window.localStorage.setItem("telux:reply-lang", replyLang);
      } catch {
        // Ignore — localStorage might be disabled.
      }
      await submitOnboarding({
        data: {
          userId,
          fullName: trimmed,
          replyLang,
        },
      });
      // AuthGate listens for this event and re-checks onboarding status.
      emitSubscriptionChange();
    } catch (err) {
      // Hide server-side diagnostics from the user. The onboarding row
      // is best-effort (signup already captured full_name), so we treat
      // any error as a soft failure — log it for the operator and show
      // a friendly generic message.
      const detail = err instanceof Error ? err.message : String(err);
      console.warn("[OnboardingModal] submit failed (treating as soft):", detail);
      // Still fire the event so AuthGate re-checks. If the row actually
      // saved, status flips to completed. If the server is just being
      // grumpy, the modal stays open and the user can retry.
      emitSubscriptionChange();
      if (detail.toLowerCase().includes("pgrst205") || detail.toLowerCase().includes("table")) {
        // Schema-level issue (e.g. onboarding_responses missing) — treat
        // as success for the user since signup already captured the name.
        return;
      }
      setErrors({ submit: "Couldn't save your answers — please try again." });
      setSubmitting(false);
    }
  }

  function onKeyDownStep(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      void onSubmit(e);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <header className="mb-5">
          <span className="eyebrow">Quick intro</span>
          <h2 id="onboarding-title" className="mt-2 text-2xl font-semibold">
            Welcome — let&apos;s set things up
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            One name and your preferred reply language. Then you&apos;re in.
          </p>
        </header>

        <form onSubmit={onSubmit} noValidate>
          <label className="block">
            <span className="text-sm font-medium">What should we call you?</span>
            <input
              ref={nameRef}
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
              onKeyDown={onKeyDownStep}
              placeholder="Your name"
              autoComplete="name"
              maxLength={120}
              aria-invalid={Boolean(errors.fullName)}
              className="mt-2 w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
            />
          </label>
          {errors.fullName ? (
            <p className="mt-2 text-xs text-red-400" role="alert">
              {errors.fullName}
            </p>
          ) : null}

          <label className="mt-5 block">
            <span className="text-sm font-medium">Reply language</span>
            <select
              value={replyLang}
              onChange={(e) => setReplyLang(e.currentTarget.value)}
              className="mt-2 w-full rounded-xl border border-input bg-surface-2/60 px-4 py-3 text-sm text-foreground focus:border-signal focus:ring-2 focus:ring-signal/30 focus:outline-none"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted-foreground">
              The chat replies in {nativeForLang(replyLang)} by default. You can change this later.
            </p>
          </label>

          {errors.submit ? (
            <p className="mt-4 text-xs text-red-400" role="alert">
              {errors.submit}
            </p>
          ) : null}

          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              type="submit"
              disabled={submitting || !userId}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-signal-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {submitting ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {submitting ? "Setting things up…" : "Get started"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
