import { useSyncExternalStore } from "react";

import { getUsage, type Plan, type UsageSnapshot } from "@/lib/usage";

/**
 * Composite view used by the dashboard / chat panel.
 *
 * Post-payment-removal: the effective plan is always "pro" (full access).
 * Trial / billing fields are no-ops. The shape is preserved so any
 * component that destructures `effectivePlan`, `isOnTrial`, etc. keeps
 * compiling and behaves correctly.
 *
 * Question counter still comes from localStorage so the UI can show
 * stats; the limit is Infinity so nothing ever blocks.
 */

export type DashboardUsage = UsageSnapshot & {
  effectivePlan: Plan;
  trialUntil: number | null;
  trialDaysRemaining: number;
  isOnTrial: boolean;
  billingCycle: "monthly" | "yearly" | null;
};

const SERVER_SNAPSHOT: DashboardUsage = {
  plan: "pro",
  questionsThisMonth: 0,
  monthKey: "1970-01",
  effectivePlan: "pro",
  trialUntil: null,
  trialDaysRemaining: 0,
  isOnTrial: false,
  billingCycle: null,
};

let lastComposite: DashboardUsage = SERVER_SNAPSHOT;
const compositeListeners = new Set<() => void>();

function recomputeIfChanged(): void {
  const usage = getUsage();
  const next: DashboardUsage = {
    ...SERVER_SNAPSHOT,
    plan: usage.plan,
    questionsThisMonth: usage.questionsThisMonth,
    monthKey: usage.monthKey,
  };
  if (
    lastComposite.plan !== next.plan ||
    lastComposite.questionsThisMonth !== next.questionsThisMonth ||
    lastComposite.monthKey !== next.monthKey
  ) {
    lastComposite = next;
    for (const l of compositeListeners) l();
  }
}

function subscribe(callback: () => void): () => void {
  recomputeIfChanged();
  compositeListeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("telux:usage-changed", recomputeIfChanged);
  }
  return () => {
    compositeListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("telux:usage-changed", recomputeIfChanged);
    }
  };
}

function getSnapshot(): DashboardUsage {
  return lastComposite;
}

function getServerSnapshot(): DashboardUsage {
  return SERVER_SNAPSHOT;
}

export function useUsage(): DashboardUsage {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Convenience: read only the effective plan. Always "pro" post-payment-removal. */
export function usePlan(): Plan {
  return useUsage().effectivePlan;
}
