#!/usr/bin/env node
// Thin wrapper around `vite build` that picks the Nitro preset and forces
// every VITE_* env var from the local `.env` file into the build process
// environment before spawning Vite.
//
// Usage:
//   node scripts/build.mjs                      # preset=netlify, mode=production
//   node scripts/build.mjs --preset vercel      # force a preset
//   node scripts/build.mjs --mode development  # vite pass-through
//
// Why this exists — and why it does TWO things:
//
// 1. Preset selection on Windows. `package.json` scripts can't set env
//    vars portably without `cross-env`. A tiny Node script keeps the
//    `npm run build:*` commands portable with zero new dependencies.
//
// 2. Why we manually read `.env` here: the Lovable vite-tanstack-config
//    plugin uses `loadEnv(mode, process.cwd(), "VITE_")` which reads
//    `.env` / `.env.<mode>` files on disk. When deploying via
//    drag-and-drop or to a platform that doesn't inject build-time env
//    vars (Netlify's manual deploy path does not — only the GitHub
//    integration does, and only for vars marked "Available during
//    build"), the bundle ships with `import.meta.env.VITE_*` undefined.
//    We solve this by parsing `.env` ourselves and merging into
//    `process.env` BEFORE spawning Vite, so the existing `loadEnv`
//    call sees them through its `process.env` fallback path.
//
//    On hosts that DO inject build-time env vars (Netlify GitHub CI,
//    Vercel, Cloudflare), `process.env` already has them and our merge
//    is a no-op for those keys.

import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

// Minimal `.env` parser. Honours `KEY=value` lines, ignores `#` comments
// and blank lines, strips optional single/double quotes around the value.
// Matches what Vite's own parser accepts so behaviour is identical.
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const text = readFileSync(filePath, "utf-8");
  const out = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

// Load order matches Vite's getEnvFilesForMode — later files override earlier.
function loadEnvFiles() {
  const mode = currentMode ?? "production";
  const files = [
    path.join(repoRoot, ".env"),
    path.join(repoRoot, `.env.${mode}`),
    path.join(repoRoot, ".env.local"),
    path.join(repoRoot, `.env.${mode}.local`),
  ];
  const merged = {};
  for (const f of files) {
    Object.assign(merged, parseEnvFile(f));
  }
  return merged;
}

// Parse CLI args.
const args = process.argv.slice(2);
let preset = process.env.NITRO_PRESET?.trim();
let currentMode;
const viteArgs = [];

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--preset") {
    preset = args[++i];
  } else if (a === "--mode") {
    currentMode = args[++i];
    viteArgs.push("--mode", currentMode);
  } else {
    viteArgs.push(a);
  }
}

if (!preset) preset = "netlify";
if (!currentMode && (preset === "netlify" || preset === "vercel")) {
  currentMode = "production";
  viteArgs.push("--mode", currentMode);
}

console.log(`[build] preset=${preset} mode=${currentMode ?? "(vite default)"}`);

// Merge .env files into process.env so Vite's loadEnv sees them via its
// process.env fallback path. Existing process.env values win (CI-injected
// vars take precedence over .env file values).
const envFromFiles = loadEnvFiles();
let injectedCount = 0;
for (const [key, value] of Object.entries(envFromFiles)) {
  if (process.env[key] === undefined) {
    process.env[key] = value;
    injectedCount++;
  }
}
if (injectedCount > 0) {
  console.log(`[build] injected ${injectedCount} env var(s) from .env files`);
}

// Write a build manifest into the public output so we can verify which
// build is live without poking around. The manifest records the build
// timestamp, preset, and the *first 6 chars* of every injected VITE_ var
// so we can confirm the right values are baked in (full values stay
// server-side / out of the public bundle).
function buildManifestJson() {
  const manifest = {
    builtAt: new Date().toISOString(),
    preset,
    mode: currentMode ?? "default",
    viteVarFingerprints: {},
  };
  for (const [key, value] of Object.entries(envFromFiles)) {
    if (key.startsWith("VITE_") && value) {
      manifest.viteVarFingerprints[key] = value.slice(0, 6) + "…" + value.slice(-4);
    }
  }
  return JSON.stringify(manifest, null, 2);
}

function writeManifest() {
  const json = buildManifestJson();
  // Public assets that should make it into `dist/` so the live site can
  // be introspected (Netlify serves everything under `dist/` as-is).
  const manifestPaths = [
    path.join(repoRoot, "public", "build-manifest.json"),
    path.join(repoRoot, "dist", "build-manifest.json"),
    path.join(repoRoot, ".vercel", "output", "static", "build-manifest.json"),
    path.join(repoRoot, ".vercel", "output", "functions", "build-manifest.json"),
    path.join(repoRoot, ".netlify", "functions-internal", "build-manifest.json"),
  ];
  for (const p of manifestPaths) {
    try {
      const dir = path.dirname(p);
      if (existsSync(dir)) {
        writeFileSync(p, json);
      }
    } catch {
      /* ignore — that target wasn't built */
    }
  }
  console.log(`[build] wrote build-manifest.json (builtAt=${JSON.parse(json).builtAt})`);
}

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["vite", "build", ...viteArgs],
  {
    cwd: repoRoot,
    stdio: "inherit",
    env: { ...process.env, NITRO_PRESET: preset },
    shell: process.platform === "win32",
  },
);

child.on("exit", (code) => {
  // Wait briefly for any async FS writes the build was doing to settle,
  // then write the manifest. Some Nitro steps copy `public/` → `dist/`
  // lazily after stdout has stopped printing.
  if (code === 0) {
    setTimeout(() => {
      writeManifest();
      process.exit(0);
    }, 250);
  } else {
    process.exit(code ?? 1);
  }
});
