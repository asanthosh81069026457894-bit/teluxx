# Deploying Telux to Netlify

This guide walks you from a fresh clone to a live Netlify site, with two
options:

- **Drag-and-drop** (recommended for the very first deploy): build the
  app locally, then drag the output folder onto Netlify's deploy page.
- **GitHub integration**: push to GitHub, connect the repo in Netlify,
  and let every push redeploy automatically.

The drag-and-drop path is fast — under two minutes from `npm run build`
to a live URL — and there's no GitHub or CLI tooling required.

> If you haven't set up Supabase + Groq yet, follow **README.md → Test
> mode setup** first. You'll need the env-var values from there before
> continuing.

---

## 1. Build the production bundle

From the project root:

```bash
npm install
npm run build
```

This runs `vite build`, which Nitro routes into the **netlify** preset
(set in `vite.config.ts` → `nitro: { preset: "netlify" }`). The build
writes:

- `dist/` — static client assets (the "publish" folder).
- `.netlify/functions-internal/server/` — the SSR Function (Functions v2).

The previous build output (`.output/`, `.netlify/`, `dist/`) is overwritten
on each run, so you can re-run `npm run build` any time.

> **If the build hangs on the Nitro step or says `preset: cloudflare-module`**,
> confirm `vite.config.ts` has `nitro: { preset: "netlify" }` at the
> top level (not under `tanstackStart`). The Lovable plugin silently
> moves the preset override to its bundled Cloudflare target if it lives
> under `tanstackStart`.

---

## 2. Drag-and-drop deploy

1. Sign in to <https://app.netlify.com>.
2. Go to **Sites → Add new site → Deploy manually**.
3. Open the project folder in your file manager. Drag **the entire
   folder** (not just `dist/`) onto the deploy area. Netlify will
   inspect `.netlify/functions-internal/`, find the SSR function, and
   use `dist/` for static assets.

   If you'd rather upload a zip, zip the project root (so both `dist/`
   and `.netlify/` are at the top level) and drag the zip.
4. The first deploy **will succeed at building** but the live site will
   throw errors until you set the env vars (next step). That's expected.

### 2.1 Set the environment variables

In **Site settings → Environment variables → Add a variable**, set
each of these. Netlify distinguishes between **build** and **runtime**
scopes:

- **Build scope**: variables available while `npm run build` runs.
  Required for `VITE_*` values because Vite inlines them into the
  client bundle at build time.
- **Runtime scope**: variables available to the SSR Function when it
  runs on a request. Required for server-only secrets.

| Variable | Scope | Required? | Where to get it |
| --- | --- | --- | --- |
| `VITE_SUPABASE_URL` | Build + runtime | Yes | Supabase → Project Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Build + runtime | Yes | Supabase → Project Settings → API → `anon public` row |
| `SUPABASE_SERVICE_ROLE_KEY` | Runtime only | Yes | Supabase → Project Settings → API → `service_role` row. **Never** prefix with `VITE_`. |
| `GROQ_API_KEY` | Runtime only | Yes | <https://console.groq.com/keys> |
| `GROQ_MODEL` | Runtime only | No | Defaults to `openai/gpt-oss-20b` |
| `ELEVENLABS_API_KEY` | Runtime only | No | <https://elevenlabs.io>. Unset = browser SpeechSynthesis fallback. |
| `ELEVENLABS_DEFAULT_VOICE_ID` | Runtime only | No | Defaults to `"21m00Tcm4TlvDq8ikWAM"` (Rachel) |

After saving, go back to **Deploys** and click **Trigger deploy →
Deploy site** (or **Clear cache and deploy** if you want a fresh build).
The new deploy will read the new env vars and pick up the chat /
auth features.

### 2.2 Add the Supabase redirect URL

In **Supabase Dashboard → Authentication → URL Configuration →
Redirect URLs**, add:

```
https://YOUR-SITE.netlify.app/auth/callback
```

Without this, the email-confirmation link Supabase sends after signup
won't redirect users back to the app.

---

## 3. GitHub integration (alternative to drag-and-drop)

If you'd rather have every `git push` redeploy the site automatically,
set this up once and you're done.

### 3.1 Push to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Initial commit"

# Using the `gh` CLI (sign in with `gh auth login` first):
gh repo create telux-chat-companions --private --source=. --remote=origin --push
```

Or, if you already have a GitHub repo:

```bash
git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin main
```

### 3.2 Connect the repo in Netlify

1. **Add new site → Import an existing project → GitHub** and pick the
   repo.
2. Netlify reads `netlify.toml` and fills in build settings automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: (left blank — Netlify auto-discovers
     `.netlify/functions-internal/`)
3. Add the env vars from §2.1.
4. **Deploy site**. The first build takes 1–2 minutes; subsequent
   builds are faster.

> **Verify nothing sensitive is committed.** The `.gitignore` already
> excludes `.env`, `.env.*`, `.output`, `node_modules`, and
> `.netlify/`. Run `git status` before the first commit and confirm
> none of those paths appear.

---

## 4. Smoke test (end-to-end)

Once the deploy is live, walk through these steps in order. If any
step fails, the **Troubleshooting** section below covers the usual
causes.

1. **Landing** — open `https://YOUR-SITE.netlify.app/`. The hero
   renders, the pricing section shows the Free tier (Pro and Team are
   on the roadmap but not yet available to buy).
2. **Sign up** — click **Start free — no card**, fill the form, submit.
   Supabase sends a confirmation email. The signup form's
   `emailRedirectTo` points at `/auth/callback`, which now resolves to
   your Netlify domain.
3. **Confirm** — open the email, click the link. The browser lands on
   `/auth/callback`, then redirects to `/dashboard` once the session
   is established.
4. **Upload + chat** — drop a PDF in the drop zone, wait for "Reading
   documents…", then ask a question in the chat. You should see an
   answer within a couple of seconds and an "Answered from: …" caption
   under the reply.
5. **Multi-doc** — drop a second PDF, ask a question that spans both
   ("summarise the differences"), confirm the "Answered from:" caption
   names both files.
6. **Voice** — click the listen button under an assistant message. The
   browser speaks the reply in the chosen language.

---

## 5. Troubleshooting

### "Invalid API key" on signup or chat

Supabase's `service_role` key is the most common culprit. The server
sanitises trailing whitespace and `\r` characters in
`src/lib/supabaseServer.ts`, so this usually means the key is **wrong**
— make sure you copied the `service_role` row from **Project Settings →
API**, not the `anon` row (they look identical).

### GROQ errors in the deploy log

- `GROQ_API_KEY is not configured` — env var isn't set, or it's in the
  wrong scope (build vs runtime). Must be runtime only.
- `Groq request failed (401)` — the key was rotated upstream; paste the
  new one and redeploy.
- `Groq request failed (429)` — the free tier is rate-limiting you.
  Either wait a minute, or pin a less-popular model with the
  `GROQ_MODEL` env var (`openai/gpt-oss-20b` is a safe default).

### `VITE_SUPABASE_URL` is undefined at runtime

If the browser SDK throws `AuthRetryableFetchError` and the deploy
log shows the URL is empty, the env var was set as **runtime only**.
The `VITE_*` values are inlined into the bundle at build time, so they
need to be in the **build** scope (or both). Edit the variable in
Netlify and tick **Available during build**.

### 404s on `/dashboard/*` after deploy

The redirect in `netlify.toml` (and the duplicate in `public/_redirects`)
should catch this. If it doesn't:

- Confirm the redirect still exists in `netlify.toml` (`to =
  "/.netlify/functions-internal/server"`) and in `public/_redirects`.
- Check that the publish directory in your Netlify settings is `dist`
  (matches `netlify.toml`). If it's been changed, restore it.
- Hit **Clear cache and deploy** from the **Deploys** tab.

### Build fails with "Cannot find module 'X'"

Run `npm install` locally and commit the regenerated
`package-lock.json`. Netlify's build runs `npm install` against the
lockfile in the repo, so a missing dependency only fails if it isn't
in `package.json` either.

### The chat panel says "the chat is busy right now (rate limit reached on the model)"

You hit Groq's per-minute token cap. Wait ~60 seconds, or set
`GROQ_MODEL` to a less-busy model (`openai/gpt-oss-20b` is a safe
default; `groq/compound-mini` is also quieter than the full
`groq/compound` router).

---

## 6. Optional: Vercel instead

If you'd rather deploy on Vercel, change one line in `vite.config.ts`:

```ts
nitro: { preset: "vercel" },
```

The `netlify.toml` is harmless on Vercel (it's only read by Netlify),
and the existing `vercel.json` already covers the security headers and
Vercel build settings. Then connect the GitHub repo in Vercel and set
the same env vars under **Project Settings → Environment Variables**.
