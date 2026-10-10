// Client-side subscription store — stubbed post-payment-removal.
//
// Every signed-in user gets full access. The DB `subscriptions` table is
// still created by the migrations (in case it's referenced elsewhere) but
// this client module no longer reads or writes it. The shape is preserved
// so any callers that still import `useSubscription` / `loadSubscription`
// compile and run without throwing — they just always see "full access".

import type { Plan } from "./usage";

export type SubscriptionSnapshot = {
  plan: "free" | "personal" | "pro";
  effectivePlan: Plan;
  isOnTrial: boolean;
  trialStartedAt: number | null;
  trialEndsAt: number | null;
  trialDaysRemaining: number;
  billingCycle: "monthly" | "yearly" | null;
  validUntil: number | null;
  loading: boolean;
};

const FULL_ACCESS: SubscriptionSnapshot = {
  plan: "pro",
  effectivePlan: "pro",
  isOnTrial: false,
  trialStartedAt: null,
  trialEndsAt: null,
  trialDaysRemaining: 0,
  billingCycle: null,
  validUntil: null,
  loading: false,
};

const cache: SubscriptionSnapshot = FULL_ACCESS;
const loadedFor: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function getSubscriptionSnapshot(): SubscriptionSnapshot {
  return cache;
}

export function subscribeSubscription(callback: () => void): () => void {
  listeners.add(callback);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("storage", callback);
    };
  }
  return () => {
    listeners.delete(callback);
  };
}

export function getSubscriptionServerSnapshot(): SubscriptionSnapshot {
  return FULL_ACCESS;
}

export function setSubscriptionSnapshot(_next: SubscriptionSnapshot, _userId: string | null): void {
  // no-op — we never write from the browser anymore.
}

export function resetSubscriptionCache(): void {
  // no-op — there's nothing to reset; the cache is always full-access.
  void loadedFor;
}

export function getLoadedUserId(): string | null {
  return loadedFor;
}

/** Fire the cross-component change event after a serverFn mutation. */
export function emitSubscriptionChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("telux:subscription-changed"));
  emit();
}

/**
 * Stubbed — kept so callers that still call `loadSubscription` don't throw.
 * Returns the full-access snapshot immediately.
 */
export async function loadSubscription(
  _userId: string,
  _opts: { force?: boolean } = {},
): Promise<SubscriptionSnapshot> {
  return FULL_ACCESS;
}
