// Onboarding serverFns — minimal post-payment-removal.
//
// The questionnaire is now: full name + reply language. We persist both
// to `public.onboarding_responses` (the existing schema — `age` and
// `hear_about` are nullable now) so the analytics queries upstream
// still work, and a `reply_lang` field is added if it's not present.
//
// The `startTrial` round-trip is gone — there is no trial anymore. The
// dashboard just gets a confirmation back.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { consume } from "@/lib/rate-limit";
import {
  isSupabaseConfigured,
  readOnboardingRow,
  writeOnboardingRow,
} from "@/lib/supabaseServer";

const answersSchema = z.object({
  userId: z.string().uuid(),
  fullName: z.string().trim().min(1, "Please enter your name").max(120),
  replyLang: z.string().min(2).max(20).default("en-US"),
});

export const getOnboardingStatus = createServerFn({ method: "POST" })
  .validator(z.object({ userId: z.string().uuid() }))
  .handler(async ({ data }): Promise<{ completed: boolean }> => {
    if (!isSupabaseConfigured()) return { completed: true };
    try {
      const row = await readOnboardingRow(data.userId);
      // `row == null` happens in two cases:
      //   1. The user genuinely hasn't filled the form yet (modal needed).
      //   2. The `onboarding_responses` table itself is missing — caught
      //      below and treated as "no onboarding required".
      return { completed: row != null };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      // PGRST205 ("table not found") means we're on a project where
      // onboarding_responses was dropped. The signup form captures
      // full_name directly, so there's no onboarding gate — treat as
      // completed so the modal doesn't reappear forever.
      if (msg.includes("onboarding_responses") && msg.includes("PGRST205")) {
        console.warn("[onboarding] getOnboardingStatus: table missing, treating as completed");
        return { completed: true };
      }
      throw err;
    }
  });

export const submitOnboarding = createServerFn({ method: "POST" })
  .validator(answersSchema)
  .handler(async ({ data }): Promise<{ completed: true }> => {
    // Rate-limit: 5 submissions per user per hour. The submit is idempotent
    // (PK is user_id) but a tight loop would still hammer Supabase.
    const rl = consume(`onboarding:${data.userId}`, {
      capacity: 5,
      windowMs: 60 * 60 * 1000,
    });
    if (!rl.ok) {
      throw new Error("Slow down — please wait a minute before resubmitting.");
    }
    if (!isSupabaseConfigured()) {
      throw new Error(
        "The backend isn't reachable right now. Please try again in a moment.",
      );
    }
    await writeOnboardingRow(data.userId, {
      full_name: data.fullName,
      // Age / hear_about are still in the schema but nullable now. We pass
      // nulls so old analytics queries keep working without forcing every
      // signup to provide answers that no longer gate anything.
      age: null,
      hear_about: null,
      reply_lang: data.replyLang,
    });
    return { completed: true };
  });
