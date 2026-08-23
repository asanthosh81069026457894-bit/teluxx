# Telux — Document Intelligence

Telux is a privacy-first document assistant. Drop in a PDF, contract, lab
report or rental agreement and ask questions in plain language. Files stay
in your browser's local storage; only a handful of pre-scored paragraphs
plus your question leave the device to generate an answer.

This README is a working guide for the codebase. If you are setting Telux
up for the first time, jump to **Test mode setup** below.

---

## Test mode setup

Test mode means "running locally with real keys so you can poke at every
feature without spending money". Three keys are needed.

### 1. Groq API key (required — for chat and Talk with Document answers)

Groq is a fast, free-tier inference provider that powers every answer.

1. Open **<https://console.groq.com>** and sign up (GitHub SSO is one click).
2. In the left sidebar, click **API Keys**.
3. Click **Create API Key**, give it any name, copy the value.
   - It will only be shown once. Paste it straight into `.env` (see below).
4. The free tier includes enough tokens for hundreds of questions per day.

`GROQ_API_KEY` is read by the serverFn in `src/lib/chat.ts` and **never**
reaches the browser bundle. The chat panel and Talk with Document will
both fail with a clear "GROQ_API_KEY is not configured" error if the key
is missing.

### 2. Supabase (required for sign-up / log-in / onboarding / trial)

1. Create a free project at **<https://supabase.com>**.
2. Open **Project Settings → API** and copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only)
3. (Optional) Enable Google sign-in under **Authentication → Providers →
   Google**. Add `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
   to your Google OAuth client's "Authorized redirect URIs".
4. Register your app's redirect URL in **Authentication → URL
   Configuration → Redirect URLs**:
   - `http://localhost:3000/auth/callback` (dev)
   - `https://YOUR_VERCEL_DOMAIN.vercel.app/auth/callback` (preview)
   - `https://YOUR_PRODUCTION_DOMAIN/auth/callback` (prod)

### 3. Database migrations (run once in Supabase SQL Editor)

Migrations live in `supabase/sql/`. Run them in order, top-down:

1. `0001_auth_and_rls.sql` — profiles, auth events, storage lockdown.
2. `0002_subscriptions_and_onboarding.sql` — `subscriptions` table, 3-day
   trial, `onboarding_responses`, handles the `onboarding_completed` flag.
3. `0003_paid_billing_cycle.sql` — adds `billing_cycle` / `valid_until` so
   the Razorpay webhook can flip a row to monthly or yearly and the resolver
   recognises the paid window.
4. `0004_onboarding_responses.sql` — `onboarding_responses` table (name /
   age / "how did you hear") that the OnboardingModal writes to. The
   trial is gated on a row existing here.

Each file has a "Verify with" comment at the bottom so you can run a SELECT
to confirm the schema is correct.

### 4. Razorpay (only needed to test paid plans)

See [Deployment → Razorpay](#razorpay) below.

### 5. ElevenLabs (optional — for higher-quality TTS in /talk and chat)

Talk with Document and the chat read-aloud button default to the OS
SpeechSynthesis voices. For natural-sounding voices in Hindi, Telugu,
Tamil, Bengali, etc., wire up an ElevenLabs account.

1. Sign up at **<https://elevenlabs.io>**. The free tier ships with
   ~10k characters/month — plenty for trying Telux out.
2. Profile → **API Key** → copy.
3. Paste it into `.env`:
   ```env
   ELEVENLABS_API_KEY=your_elevenlabs_key
   ```
4. (Optional) Override the default voice:
   ```env
   ELEVENLABS_DEFAULT_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   ```
   The default is "Rachel" (English). Browse the voice library at
   <https://elevenlabs.io/app/voice-library> and replace with any voice id.

When the key is present, the TTS provider picker in the `/talk` header and
the chat panel reveals an **ElevenLabs** option next to **Browser**. The
serverFn in `src/serverFns/tts.ts` rate-limits per user (60 calls/hour)
and falls back to browser TTS on rate-limit / upstream errors so a quota
exhaustion never breaks the voice loop.

### 6. Putting it all together

Copy `.env.example` to `.env` and fill the values in. See
[`.env.example`](.env.example) for the complete reference; the absolute
minimum for a chat-only local dev is:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
GROQ_API_KEY=gsk_xxx_your_real_key_xxx
```

Then start the dev server:

```sh
npm install
npm run dev
```

Sign up, upload a document, and ask a question. If you see answers
streaming in, test mode is working. To test high-quality TTS in /talk,
add `ELEVENLABS_API_KEY` (see section 5 above).

---

## What lives where

- **Documents**: stored in IndexedDB (`telux` database, `documents`
  object store). Cleared from your device, cleared forever.
- **Plan + monthly counter**: `localStorage` under `telux:usage:v1`.
- **Question/answer traffic**: HTTPS to Groq. We do not log requests;
  Groq's own privacy policy applies once the bytes leave the server.

## Scripts

```sh
npm run dev      # Vite dev server (HMR)
npm run build    # Production build (Nitro server bundle in .output/)
npm run preview  # Serve the production build locally
npm run lint     # ESLint
npm run format   # Prettier
```

## Security notes

- `.env` is in `.gitignore` — never commit it.
- All server-only secrets (`SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`,
  `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `ELEVENLABS_API_KEY`)
  are read via `process.env` on the server side. They never appear in the
  browser bundle.
- `VITE_*` env vars are inlined by Vite at build time. Only put values
  in those that are safe to ship to every visitor.
- CSRF protection is on for every serverFn call (`createCsrfMiddleware`
  in `src/start.ts`). The Razorpay webhook is authenticated via HMAC
  signature, not CSRF.
- The `onboarding_responses` table is gated by RLS — users can read and
  write only their own row. The `service_role` grant is a backfill
  escape hatch for migrations, not for runtime reads.

> ⚠️ **If any secret was ever committed to git history, rotate it
> immediately.** Removing a literal from source code does NOT invalidate
> the old value — anyone with read access to the repository (including
> forks, mirrors, and cached clones) still has it. After every rotation:
>
> 1. Generate a fresh key in the upstream dashboard (Supabase → API,
>    Groq → API Keys, Razorpay → API Keys, ElevenLabs → Profile).
> 2. Update `.env` (and Vercel env vars) with the new value.
> 3. Restart the dev server / redeploy so cached env vars reload.
> 4. Revoke the old key in the upstream dashboard to confirm no other
>    client is still using it.
> 5. If the project is public, scrub the old value from git history
>    (`git filter-repo` or BFG) — but treat it as already-compromised
>    regardless. Rotation is the only reliable fix.

---

## Deployment

Telux is a TanStack Start SSR app. Nitro bundles it for the configured
preset — `netlify` by default (`vite.config.ts`), so a fresh deploy
needs nothing more than the env-var set described in **[DEPLOY.md](DEPLOY.md)**.

DEPLOY.md covers:

- Pushing the repo to GitHub (with the `gh` CLI shortcut).
- Importing the repo in Netlify and setting the 4 required env vars
  (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `GROQ_API_KEY`).
- Adding the Supabase redirect URL.
- The end-to-end smoke test (signup → email confirm → upload → chat).
- Troubleshooting the usual failure modes (HSTS, "Invalid API key",
  `VITE_*` env vars, 404s on `/dashboard/*`).

### Vercel

The repo still ships a `vercel.json` with the security headers and a
Vercel-friendly `vercel.json` build config, so a Vercel deploy still
works. To switch back to Vercel as the target, change one line in
`vite.config.ts`:

```ts
tanstackStart: {
  // ...
  nitro: { preset: "vercel" },
}
```

Then connect the GitHub repo in Vercel and set the same env vars. The
Netlify files (`netlify.toml`, `public/_redirects`) are no-ops on
Vercel.

---

## License

This codebase is yours to extend. Push to your own GitHub, deploy to
your own infrastructure, sell to your own users.
