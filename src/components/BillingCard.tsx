// BillingCard — display-only pricing summary on the dashboard.
//
// Post-payment-removal: there is no real billing flow. Every signed-in
// user gets the full app. This card exists so the user has a visible
// "your plan" anchor in the dashboard and so a future paid tier can
// drop in here without changing the surrounding layout.
//
// The question counter comes from `useUsage()` (a localStorage-backed
// store) so it updates live as the user chats. "Unlimited" is the
// display string for the cap since the runtime limit is Infinity.

import { Check, Sparkles } from "lucide-react";

import { useUsage } from "@/hooks/useUsage";

export function BillingCard() {
  const { questionsThisMonth } = useUsage();

  return (
    <section
      aria-label="Your plan"
      className="rounded-2xl border border-signal/30 bg-gradient-to-br from-signal/10 via-signal/5 to-transparent p-4 sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-signal/20 text-signal">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
              Your plan
            </p>
            <p className="text-base font-semibold sm:text-lg">
              Free <span className="text-muted-foreground">— full access</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-emerald-400 uppercase">
            <Check className="size-3" />
            Active
          </span>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
        <li className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-3 py-2">
          <Check className="size-3.5 shrink-0 text-emerald-400" />
          <span className="text-muted-foreground">Unlimited questions</span>
        </li>
        <li className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-3 py-2">
          <Check className="size-3.5 shrink-0 text-emerald-400" />
          <span className="text-muted-foreground">Voice & 9 languages</span>
        </li>
        <li className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-2/40 px-3 py-2">
          <Check className="size-3.5 shrink-0 text-emerald-400" />
          <span className="text-muted-foreground">On-device storage</span>
        </li>
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          <span className="font-mono text-foreground">{questionsThisMonth}</span> question
          {questionsThisMonth === 1 ? "" : "s"} this month · no cap
        </p>
        <button
          type="button"
          disabled
          aria-label="Upgrade to Pro (coming soon)"
          className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-4 py-2 text-xs font-medium text-muted-foreground opacity-70"
        >
          Pro · ₹899/mo
          <span className="rounded-full bg-border/70 px-1.5 py-0.5 text-[9px] tracking-wide uppercase">
            Soon
          </span>
        </button>
      </div>
    </section>
  );
}
