// Startup environment validation.
//
// Post-payment-removal: the Razorpay block is gone. Only Supabase + Groq
// are required server-side. ElevenLabs remains optional (browser TTS is
// the fallback when the key is missing).
//
// This module runs once per cold start, validates the environment with Zod,
// and emits a single grouped warning when anything is missing. It does NOT
// throw — the serverFns still degrade gracefully when keys are absent,
// but now there's a single line in the deploy logs that tells the operator
// what's wrong.

import { z } from "zod";

const PLACEHOLDER_PATTERNS = [
  /^__.*__$/i,
  /^YOUR[_-].*$/i,
  /^replace[_-]with.*$/i,
  /^change[_-]?me$/i,
  /^placeholder$/i,
];

function isPlaceholder(value: string): boolean {
  return PLACEHOLDER_PATTERNS.some((p) => p.test(value.trim()));
}

const trimmedString = z
  .string()
  .transform((s) => s.trim())
  .pipe(z.string().min(1));

const publicSchema = z.object({
  VITE_SUPABASE_URL: trimmedString,
  VITE_SUPABASE_ANON_KEY: trimmedString,
});

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: trimmedString,
  GROQ_API_KEY: trimmedString,
});

export type EnvReport = {
  public: z.infer<typeof publicSchema>;
  server: z.infer<typeof serverSchema>;
  missing: { public: string[]; server: string[] };
};

let cached: EnvReport | null = null;

export function validateEnv(): EnvReport {
  if (cached) return cached;

  const src =
    typeof process !== "undefined" && process.env
      ? process.env
      : ((import.meta as { env?: Record<string, string | undefined> }).env ?? {});

  function collectMissing(schema: z.ZodTypeAny, keys: string[]): string[] {
    const raw = src as Record<string, string | undefined>;
    const missing: string[] = [];
    for (const key of keys) {
      const value = raw[key];
      if (!value || !value.trim() || isPlaceholder(value)) {
        missing.push(key);
      }
    }
    return missing;
  }

  const publicParsed = publicSchema.safeParse(src);
  const serverParsed = serverSchema.safeParse(src);

  const missing = {
    public: publicParsed.success
      ? []
      : collectMissing(publicSchema, ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"]),
    server: serverParsed.success
      ? []
      : collectMissing(serverSchema, ["SUPABASE_SERVICE_ROLE_KEY", "GROQ_API_KEY"]),
  };

  cached = {
    public: publicParsed.success ? publicParsed.data : ({} as EnvReport["public"]),
    server: serverParsed.success ? serverParsed.data : ({} as EnvReport["server"]),
    missing,
  };

  if (missing.public.length || missing.server.length) {
    console.warn(
      `[env] missing keys — public: [${missing.public.join(", ")}]; ` +
        `server: [${missing.server.join(", ")}]`,
    );
  }

  return cached;
}
