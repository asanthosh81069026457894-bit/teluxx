-- ============================================================================
-- 0001_auth_and_rls.sql — minimal auth, no app-side dependencies.
--
-- Goal: get password auth + JWT-issuing sessions working without any of the
-- Telux app tables. The app is designed to function fully without
-- profiles / subscriptions / onboarding_responses; those are conveniences
-- for analytics + the trial flow. If the migrations after this one
-- (0002, 0004) haven't run yet, sign-in and sign-up still work, and the
-- dashboard treats every user as "free / onboarding not done".
--
-- Run this once in: Supabase Dashboard → SQL Editor → New query.
-- ============================================================================

-- 1) Touch helper — generic updated_at trigger.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2) Optional profile table. Created on first signup if missing. The
--    trigger below is defensive: it checks for table existence before
--    each INSERT, so re-running this migration on a fresh project (where
--    no Telux tables exist yet) does not break sign-up with a 500 from
--    the auth server.
do $$
begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'profiles'
  ) then
    create table public.profiles (
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
      using (id = auth.uid())
      with check (id = auth.uid());
    drop policy if exists "profiles_service_role_all" on public.profiles;
    create policy "profiles_service_role_all"
      on public.profiles for all to service_role
      using (true) with check (true);
  end if;
end $$;

-- 3) handle_new_user() trigger — defensive version.
--    Wraps each INSERT in an EXISTS check against information_schema so a
--    missing table does NOT take down the auth server with a 500. The
--    downside is that an unfinished migration no longer errors loudly —
--    we accept that trade because the previous behaviour was "auth
--    completely broken until you run 0002", which made local development
--    impossible without a working DB. With this version, the dashboard
--    runs end-to-end even on an empty Supabase project; the missing
--    tables just degrade gracefully to "free plan / onboarding required".
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Optional: write a profiles row if the table exists.
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'profiles'
  ) then
    insert into public.profiles (id, email, full_name)
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data->>'full_name', '')
    )
    on conflict (id) do update
      set email = excluded.email,
          full_name = coalesce(excluded.full_name, public.profiles.full_name),
          updated_at = now();
  end if;

  -- Optional: write a subscriptions row if the table exists.
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'subscriptions'
  ) then
    insert into public.subscriptions (user_id, plan)
    values (new.id, 'free')
    on conflict (user_id) do nothing;
  end if;

  -- Optional: write an auth_events row if the table exists.
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'auth_events'
  ) then
    insert into public.auth_events (user_id, event) values (new.id, 'signup');
  end if;

  return new;
end;
$$;

-- 4) Attach the trigger so every signup runs handle_new_user().
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Done. After this migration, sign-in + sign-up work, and the dashboard
-- degrades gracefully if profiles / subscriptions / auth_events are
-- missing. Run 0002 to opt in to the analytics + trial-state features.
-- ============================================================================
