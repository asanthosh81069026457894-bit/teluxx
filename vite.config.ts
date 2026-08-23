// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
//
// IMPORTANT: the Nitro preset must be passed at the TOP level (`nitro:`), not
// inside `tanstackStart:`, because the Lovable plugin reads `options.nitro` to
// configure its bundled `nitro()` build plugin. Putting it under `tanstackStart`
// is silently ignored and the build defaults to `cloudflare-module`.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const NITRO_PRESET =
  // `LOVABLE_SANDBOX` / `DEV_SERVER__PROJECT_PATH` are set inside a Lovable
  // sandbox build — the Lovable plugin forces `cloudflare-module` in that
  // case (it also writes to `dist/` instead of `.output/`). For local /
  // GitHub / drag-and-drop Netlify deploys we want the standard Netlify
  // preset.
  process.env.LOVABLE_SANDBOX === "1" || process.env.DEV_SERVER__PROJECT_PATH
    ? "cloudflare-module"
    : process.env.NITRO_PRESET?.trim() || "netlify";

export default defineConfig({
  // Top-level Nitro preset. The Lovable plugin wires this into its bundled
  // `nitro()` plugin during `vite build`. Defaults to `netlify` so a plain
  // `npm run build` produces `.netlify/v1/functions/` for drag-and-drop
  // upload. Override with the `NITRO_PRESET` env var to swap targets
  // without editing this file.
  nitro: { preset: NITRO_PRESET },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});
