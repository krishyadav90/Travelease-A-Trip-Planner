
-- 1. Create a storage bucket for avatars (publicly accessible)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 2. Add admin user (if not exists) and create admin role structure
-- 2a: Create app_role enum (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
  END IF;
END$$;

-- 2b: Create user_roles table (if not exists)
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  unique (user_id, role)
);

-- 2c: Grant admin role to specific email (will require you to sign up or invite manually once)
-- The codebase will check this email and assign "admin" if not present.

-- 3. Add persistent profile photo field to your profiles table
alter table public.profiles
  add column if not exists avatar_url text;

-- 4. Add a settings JSON column for user profile settings
alter table public.profiles
  add column if not exists settings jsonb;

-- 5. (Optional) You can add more settings features later inside the new "settings" column

-- 6. Enable row level security and allow users access to their own user_roles
alter table public.user_roles enable row level security;

-- 7. Admin security definer function for checking admin
create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = 'admin'
  )
$$;
