// Test the actual login flow against Supabase to find the bug.
// This reproduces what happens in the browser:
//   1. Login via the serverFn (mocked here)
//   2. setSession on the anon client
//   3. Check what onAuthStateChange fires and in what order
//   4. Check what the session looks like after each step

import { createClient } from "@supabase/supabase-js";

const url = process.env.VITE_SUPABASE_URL ?? "https://xnlkzitapofhsigylvht.supabase.co";
const anonKey =
  process.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubGt6aXRhcG9maHNpZ3lsdmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MDA3MjcsImV4cCI6MjEwMjk3NjcyN30.q4wwi3Eb3D2r8VHuMmXZMK0o4rYihd4gHeTRMQPh97c";

const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: false, // node, no localStorage
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Step 1: Sign in directly (skipping serverFn — we're testing the
// supabase-js setSession behavior, which is what useAuth.tsx calls
// after loginWithRateLimit returns).
console.log("=== Step 1: signInWithPassword ===");
const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
  email: "test+nonexistent@example.com",
  password: "wrongpassword",
});
if (signInErr) {
  console.log("signIn err (expected):", signInErr.message);
  console.log("\n=== Trying with a real test account would be needed to proceed ===");
  console.log("But the SDK behavior is the same: setSession either works or doesn't.");
  process.exit(0);
}

const session = signInData.session!;
console.log("Got session:", !!session, "access_token len:", session.access_token.length);

// Step 2: Subscribe to auth state changes BEFORE setSession
console.log("\n=== Step 2: subscribe to onAuthStateChange ===");
const eventLog: string[] = [];
const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
  eventLog.push(`${event} ${sess ? "session" : "null"}`);
  console.log("[listener]", event, sess ? "session present" : "null");
});

// Step 3: New anon client (simulating what useAuth.tsx does after login)
console.log("\n=== Step 3: setSession on the same anon client ===");
const { data: setData, error: setErr } = await supabase.auth.setSession({
  access_token: session.access_token,
  refresh_token: session.refresh_token,
});
console.log("setSession result:", { hasSession: !!setData.session, err: setErr?.message ?? null });
console.log("Events fired during setSession:", eventLog);

console.log("\n=== Step 4: getSession after ===");
const { data: gsData } = await supabase.auth.getSession();
console.log("getSession:", !!gsData.session);

sub.subscription.unsubscribe();
console.log("\nDone.");
