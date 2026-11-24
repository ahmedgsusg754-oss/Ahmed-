-- ==========================================
-- OZAMAA PLATFORM
-- Database foundation
-- ==========================================

begin;

-- 1. Profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  username text not null,
  display_name text not null default '',

  role text not null default 'MEMBER'
    check (role in ('OWNER', 'BACKUP_OWNER', 'MEMBER')),

  avatar_url text,
  bio text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Unique usernames
create unique index if not exists profiles_username_lower_unique
on public.profiles (lower(username));

-- 3. Updated timestamp
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at
on public.profiles;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- 4. Assign OWNER and BACKUP_OWNER safely
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_role text;
  new_username text;
  new_display_name text;
  existing_count integer;
begin
  -- Serialize registrations to prevent duplicate owner assignment.
  perform pg_advisory_xact_lock(827364921);

  select count(*)
  into existing_count
  from public.profiles;

  if existing_count = 0 then
    new_role := 'OWNER';
  elsif existing_count = 1 then
    new_role := 'BACKUP_OWNER';
  else
    new_role := 'MEMBER';
  end if;

  new_username := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'username'), ''),
    'user_' || replace(new.id::text, '-', '')
  );

  new_display_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    new_username
  );

  insert into public.profiles (
    id,
    username,
    display_name,
    role
  )
  values (
    new.id,
    new_username,
    new_display_name,
    new_role
  );

  return new;
end;
$$;

-- 5. Trigger for new accounts
drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- 6. Enable Row Level Security
alter table public.profiles enable row level security;

-- 7. Remove old policies
drop policy if exists "Profiles visible to authenticated users"
on public.profiles;

drop policy if exists "Users update own profile"
on public.profiles;

-- 8. Authenticated users can view profiles
create policy "Profiles visible to authenticated users"
on public.profiles
for select
to authenticated
using (true);

-- 9. Users can update their own profile
create policy "Users update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- 10. Restrict profile editing columns
revoke all on public.profiles from anon;

revoke insert, update, delete
on public.profiles
from anon, authenticated;

grant select
on public.profiles
to authenticated;

grant update (
  username,
  display_name,
  avatar_url,
  bio
)
on public.profiles
to authenticated;

commit;
