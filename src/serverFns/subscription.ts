// Server-side subscription helpers — stubbed post-payment-removal.
//
// These still exist so existing imports don't break. Every serverFn returns
// a full-access snapshot. The DB `subscriptions` table is left alone (the
// migrations create it; we just don't read or write it from the app).

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { Plan } from "@/lib/usage";

export class TrialRateLimitedError extends Error {
  readonly code = "TRIAL_RATE_LIMITED";
  readonly retryAfterMs = 0;
  constructor() {
    super("Trials are disabled.");
    this.name = "TrialRateLimitedError";
  }
}

export class TeluxBackendOfflineError extends Error {
  readonly code = "BACKEND_OFFLINE";
  constructor(message = "Account features are temporarily unavailable.") {
    super(message);
    this.name = "TeluxBackendOfflineError";
  }
}

export type ServerSubscription = {
  plan: "free" | "personal" | "pro";
  trialStartedAt: number | null;
  trialEndsAt: number | null;
  effectivePlan: Plan;
  isOnTrial: boolean;
  trialDaysRemaining: number;
  billingCycle: "monthly" | "yearly" | null;
  validUntil: number | null;
};

const FULL_ACCESS: ServerSubscription = {
  plan: "pro",
  trialStartedAt: null,
  trialEndsAt: null,
  effectivePlan: "pro",
  isOnTrial: false,
  trialDaysRemaining: 0,
  billingCycle: null,
  validUntil: null,
};

export const getEffectivePlan = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string().uuid() }))
  .handler(async (): Promise<ServerSubscription> => FULL_ACCESS);

export const activatePaidPlan = createServerFn({ method: "POST" })
  .validator(
    z.object({
      userId: z.string().uuid(),
      plan: z.enum(["personal", "pro"]),
      cycle: z.enum(["monthly", "yearly"]),
      paymentId: z.string().optional(),
      orderId: z.string().optional(),
    }),
  )
  .handler(async (): Promise<ServerSubscription> => FULL_ACCESS);

export const startTrial = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string().uuid() }))
  .handler(async (): Promise<ServerSubscription> => FULL_ACCESS);

export const cancelTrial = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string().uuid() }))
  .handler(async (): Promise<ServerSubscription> => FULL_ACCESS);
