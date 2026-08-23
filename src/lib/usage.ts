// On-device usage tracking — simplified post-payment-removal.
//
// All users now get full access: unlimited docs, unlimited pages, unlimited
// questions, voice everywhere. The local question counter remains as a
// harmless no-op (we never hit the limit; Personal/Pro were already unlimited).
// Plan tier is preserved only as a type so existing UI keeps rendering; the
// gate helpers all return "allowed".

import type { BillingCycle, Plan } from "./usage.types";

export type { BillingCycle, Plan } from "./usage.types";
export { YEARLY_DISCOUNT_PERCENT } from "./usage.types";

type PlanDef = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  priceLabel: string;
  priceLabelYearly: string;
  docs: number;
  pages: number;
  questionsPerMonth: number;
  voice: boolean;
  multiDocChat: boolean;
  voiceGenderPicker: boolean;
  features: string[];
  featuresYearlyBadge?: string;
};

export const PLAN_LIMITS: Record<Plan, PlanDef> = {
  starter: {
    name: "Free",
    priceMonthly: 0,
    priceYearly: 0,
    priceLabel: "₹0 / forever",
    priceLabelYearly: "₹0 / forever",
    // All unlimited — every signed-in user gets full access.
    docs: Number.POSITIVE_INFINITY,
    pages: Number.POSITIVE_INFINITY,
    questionsPerMonth: Number.POSITIVE_INFINITY,
    voice: true,
    multiDocChat: true,
    voiceGenderPicker: true,
    features: [
      "Unlimited documents",
      "Unlimited pages",
      "Unlimited questions",
      "Talk with Document — speak & listen",
      "Multi-document simultaneous chat",
      "Male / Female voice picker",
      "Read-aloud in any language",
    ],
  },
  personal: {
    name: "Personal",
    priceMonthly: 0,
    priceYearly: 0,
    priceLabel: "Included",
    priceLabelYearly: "Included",
    docs: Number.POSITIVE_INFINITY,
    pages: Number.POSITIVE_INFINITY,
    questionsPerMonth: Number.POSITIVE_INFINITY,
    voice: true,
    multiDocChat: true,
    voiceGenderPicker: true,
    features: ["Full access"],
  },
  pro: {
    name: "Pro",
    priceMonthly: 0,
    priceYearly: 0,
    priceLabel: "Included",
    priceLabelYearly: "Included",
    docs: Number.POSITIVE_INFINITY,
    pages: Number.POSITIVE_INFINITY,
    questionsPerMonth: Number.POSITIVE_INFINITY,
    voice: true,
    multiDocChat: true,
    voiceGenderPicker: true,
    features: ["Full access"],
  },
};

/** Effective page cap — always Infinity post-payment-removal. */
export function pageCapFor(_plan: Plan, _cycle: BillingCycle | null = null): number {
  return Number.POSITIVE_INFINITY;
}

/** Format price label — kept for back-compat; always reads "Included". */
export function formatPriceLabel(plan: Plan, cycle: BillingCycle): string {
  return cycle === "yearly" ? PLAN_LIMITS[plan].priceLabelYearly : PLAN_LIMITS[plan].priceLabel;
}

// --- Gate helpers — all return "allowed" post-payment-removal -----------------

export const STARTER_DOC_LIMIT = Number.POSITIVE_INFINITY;

/** Trial length is irrelevant — kept for back-compat with copy. */
export const TRIAL_DAYS = 0;

export function planHasVoice(_plan: Plan): boolean {
  return true;
}

export function planHasPremium(_plan: Plan): boolean {
  return true;
}

/** Always true — every signed-in user has voice. */
export function canUseVoice(
  _plan: Plan,
  _docCount: number,
  _planOverride?: Plan,
): boolean {
  return true;
}

/** Always true — every signed-in user can upload. */
export function canUploadDocument(
  _plan: Plan,
  _docCount: number,
  _totalPages: number = 0,
  _planOverride?: Plan,
  _billingCycle: BillingCycle | null = null,
): boolean {
  return true;
}

/** Always null — never blocks. */
export function uploadBlockReason(
  _plan: Plan,
  _docCount: number,
  _totalPages: number = 0,
  _planOverride?: Plan,
  _billingCycle: BillingCycle | null = null,
): string | null {
  return null;
}

/** Always Infinity — never blocks. */
export function remainingSlots(_plan: Plan, _docCount: number, _planOverride?: Plan): number {
  return Number.POSITIVE_INFINITY;
}

/** Always true. */
export function canUseMultiDocChat(_plan: Plan, _planOverride?: Plan): boolean {
  return true;
}

/** Always true. */
export function hasVoiceGenderPicker(_plan: Plan, _planOverride?: Plan): boolean {
  return true;
}

/** Always null — never blocks. */
export function voiceBlockReason(
  _plan: Plan,
  _docCount: number,
  _planOverride?: Plan,
): string | null {
  return null;
}

// --- Monthly question counter (still local — always unlimited) ---------------

const STORAGE_KEY = "telux:usage:v1";

type StoredUsage = {
  plan: Plan;
  questionsThisMonth: number;
  monthKey: string;
};

function currentMonthKey(now: Date = new Date()): string {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function readUsage(): StoredUsage {
  if (typeof window === "undefined") {
    return { plan: "starter", questionsThisMonth: 0, monthKey: currentMonthKey() };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { plan: "starter", questionsThisMonth: 0, monthKey: currentMonthKey() };
    }
    const parsed = JSON.parse(raw) as Partial<StoredUsage>;
    const plan: Plan =
      parsed.plan === "personal" || parsed.plan === "pro" ? parsed.plan : "starter";
    const monthKey = typeof parsed.monthKey === "string" ? parsed.monthKey : currentMonthKey();
    const count = typeof parsed.questionsThisMonth === "number" ? parsed.questionsThisMonth : 0;
    return { plan, monthKey, questionsThisMonth: count };
  } catch {
    return { plan: "starter", questionsThisMonth: 0, monthKey: currentMonthKey() };
  }
}

function writeUsage(u: StoredUsage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  } catch {
    // Quota exceeded or storage disabled — fail silently, usage just won't track.
  }
}

// Public API ------------------------------------------------------------------

export type UsageSnapshot = {
  plan: Plan;
  questionsThisMonth: number;
  monthKey: string;
};

export function getUsage(): UsageSnapshot {
  const u = readUsage();
  const month = currentMonthKey();
  if (u.monthKey !== month) {
    const reset: StoredUsage = { ...u, questionsThisMonth: 0, monthKey: month };
    writeUsage(reset);
    return { plan: reset.plan, questionsThisMonth: 0, monthKey: month };
  }
  return { plan: u.plan, questionsThisMonth: u.questionsThisMonth, monthKey: u.monthKey };
}

export type CanAskResult =
  | { ok: true; remaining: number; resetsAt: Date }
  | { ok: false; reason: "limit-reached"; resetsAt: Date };

/** Always allowed — limit is Infinity. */
export function canAsk(_effectivePlan: Plan): CanAskResult {
  const now = new Date();
  const resetsAt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0));
  return { ok: true, remaining: Number.POSITIVE_INFINITY, resetsAt };
}

export function recordQuestion(): void {
  const u = readUsage();
  const month = currentMonthKey();
  const next: StoredUsage = {
    ...u,
    monthKey: month,
    questionsThisMonth: u.monthKey === month ? u.questionsThisMonth + 1 : 1,
  };
  writeUsage(next);
  // Notify React subscribers listening via useUsage().
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("telux:usage-changed"));
  }
}

/**
 * Drop the persisted usage counter. Called on sign-out (and from the
 * auto-wipe path) so the next signed-in user starts at zero questions
 * for the month. Fires `telux:usage-changed` so any open tab refreshes.
 */
export function clearUsage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage might be disabled — nothing we can do.
  }
  window.dispatchEvent(new CustomEvent("telux:usage-changed"));
}

export function formatResetsAt(d: Date): string {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
