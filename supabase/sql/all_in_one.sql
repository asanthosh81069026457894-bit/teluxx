-- ============================================================================
-- Telux — Combined migration (paste + run once in Supabase SQL Editor)
--
-- Run at: https://supabase.com/dashboard/project/xnlkzitapofhsigylvht/sql/new
--
-- This file is the union of the 0001–0004 migrations collapsed into one
-- idempotent block. Why one file: pasting 4 separate queries is where
-- things go wrong (a CREATE TRIGGER silently no-ops when the table the
-- trigger references doesn't exist yet, leaving the project in a half-
-- migrated state that's hard to recover from).
--
-- All statements are CREATE IF NOT EXISTS / DROP IF EXISTS so re-running
-- this on a fresh project or an existing one is safe.
-- ============================================================================

-- 1) public.profiles — one row per auth.users row.
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select to authenticated
  using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "profiles_service_role_all" on public.profiles;
create policy "profiles_service_role_all"
  on public.profiles for all to service_role
  using (true) with check (true);

-- 2) public.subscriptions — one row per user, defaults to plan='free'.
create table if not exists public.subscriptions (
  user_id              uuid primary key references auth.users(id) on delete cascade,
  plan                 text not null default 'free' check (plan in ('free', 'personal', 'pro')),
  trial_started_at     timestamptz,
  trial_ends_at        timestamptz,
  razorpay_payment_id  text,
  razorpay_order_id    text,
  billing_cycle        text check (billing_cycle in ('monthly', 'yearly')),
  valid_until          timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists subscriptions_valid_until_idx
  on public.subscriptions (valid_until) where valid_until is not null;

alter table public.subscriptions enable row level security;

drop policy if exists "subs_select_own" on public.subscriptions;
create policy "subs_select_own"
  on public.subscriptions for select to authenticated
  using (user_id = (select auth.uid()));

grant insert, update, delete, select on public.subscriptions to service_role;

-- 3) public.onboarding_responses — minimal: full_name + reply_lang. The
--    trial-era age / hear_about columns are kept nullable for legacy reads.
create table if not exists public.onboarding_responses (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null,
  reply_lang  text not null default 'en-US' check (length(reply_lang) between 2 and 20),
  age         int  check (age is null or (age between 13 and 120)),
  hear_about  text check (hear_about is null or length(hear_about) between 1 and 200),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.onboarding_responses enable row level security;

drop policy if exists "onboarding_select_own" on public.onboarding_responses;
create policy "onboarding_select_own"
  on public.onboarding_responses for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "onboarding_insert_own" on public.onboarding_responses;
create policy "onboarding_insert_own"
  on public.onboarding_responses for insert to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "onboarding_update_own" on public.onboarding_responses;
create policy "onboarding_update_own"
  on public.onboarding_responses for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

grant insert, select, update on public.onboarding_responses to service_role;

-- 4) Verify: confirm tables exist. This block is just for the SQL Editor's
--    "Results" panel — it returns one row per table so you can see success.
select 'profiles'              as table_name, count(*) as rows from public.profiles
union all
select 'subscriptions'         as table_name, count(*) as rows from public.subscriptions
union all
select 'onboarding_responses' as table_name, count(*) as rows from public.onboarding_responses;
