-- ============================================================================
-- Telux — Onboarding responses
-- Run this once in: Supabase Dashboard → SQL Editor → New query
--
-- Goal: persist the minimal onboarding answers (full name + reply language)
-- so AuthGate can decide whether to show the OnboardingModal.
--
-- 0002 deliberately DROPPED the previous onboarding_responses table — the
-- trial flow and its age / "how did you hear" questions were friction. The
-- new flow only collects `full_name` and `reply_lang`. `age` and
-- `hear_about` are kept as nullable columns for legacy analytics queries
-- but the modal never writes to them.
-- ============================================================================

create table if not exists public.onboarding_responses (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  -- full_name mirrors what's in public.profiles.full_name; we re-collect it
  -- here because Google OAuth often leaves it blank and the signup form is
  -- the one place the user is most willing to type their name.
  full_name   text not null,
  -- Reply language (BCP-47, e.g. 'en-US', 'hi-IN'). The chat panel + /talk
  -- workspace read this to pick the response language when the user hasn't
  -- picked anything from the language picker yet.
  reply_lang  text not null default 'en-US' check (length(reply_lang) between 2 and 20),
  -- Legacy columns from the trial-era onboarding — kept nullable so older
  -- analytics queries (and any older app builds) still work. The current
  -- OnboardingModal never writes to these.
  age         int  check (age is null or (age between 13 and 120)),
  hear_about  text check (hear_about is null or length(hear_about) between 1 and 200),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.onboarding_responses enable row level security;

-- A user can read their own row (e.g. to pre-fill the form next time) and
-- can insert/update their own row. We deliberately allow UPDATE so the
-- modal can re-submit with corrections — the primary-key constraint still
-- keeps it one row per user.
drop policy if exists "onboarding_select_own" on public.onboarding_responses;
create policy "onboarding_select_own"
  on public.onboarding_responses for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "onboarding_insert_own" on public.onboarding_responses;
create policy "onboarding_insert_own"
  on public.onboarding_responses for insert
  to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "onboarding_update_own" on public.onboarding_responses;
create policy "onboarding_update_own"
  on public.onboarding_responses for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Explicit GRANTs for the service role. The service-role JWT bypasses RLS,
-- but on Supabase Cloud the GRANT still matters for the serverFn's UPSERT
-- path (PostgREST sometimes surfaces "permission denied" if the GRANT is
-- missing even when RLS would otherwise let the row through).
grant insert, select, update on public.onboarding_responses to service_role;

-- Keep updated_at fresh on edits. Same pattern as profiles / subscriptions.
drop trigger if exists onboarding_responses_touch_updated_at on public.onboarding_responses;
create trigger onboarding_responses_touch_updated_at
  before update on public.onboarding_responses
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- After running this:
--   - `public.onboarding_responses` exists with one row per user (PK on
--     user_id, FK to auth.users with cascade delete).
--   - Authenticated users can read / write their own row; everyone else
--     (anon, other users) gets nothing.
--   - The OnboardingModal in src/components/OnboardingModal.tsx writes
--     here via the submitOnboarding serverFn; AuthGate hides the modal
--     when a row exists.
--
-- Verify:
--   select user_id, full_name, reply_lang, created_at
--   from public.onboarding_responses
--   order by created_at desc
--   limit 5;
-- ============================================================================
