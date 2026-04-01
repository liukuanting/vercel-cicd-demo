create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.badminton_sessions (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  location text not null,
  session_date date not null,
  start_time time not null,
  end_time time not null,
  min_players integer not null check (min_players >= 2),
  max_players integer not null check (max_players >= min_players),
  skill_level text not null check (
    skill_level in ('beginner', 'intermediate', 'advanced', 'competitive')
  ),
  fee integer not null check (fee >= 0),
  shuttlecock text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.session_bookings (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.badminton_sessions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (session_id, user_id)
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.badminton_sessions enable row level security;
alter table public.session_bookings enable row level security;

drop policy if exists "profiles selectable by everyone" on public.profiles;
create policy "profiles selectable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "users can update self profile" on public.profiles;
create policy "users can update self profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "sessions visible to everyone" on public.badminton_sessions;
create policy "sessions visible to everyone"
  on public.badminton_sessions for select
  using (true);

drop policy if exists "authenticated users can create sessions" on public.badminton_sessions;
create policy "authenticated users can create sessions"
  on public.badminton_sessions for insert
  with check (auth.uid() = organizer_id);

drop policy if exists "organizer can update own session" on public.badminton_sessions;
create policy "organizer can update own session"
  on public.badminton_sessions for update
  using (auth.uid() = organizer_id);

drop policy if exists "bookings visible to everyone" on public.session_bookings;
create policy "bookings visible to everyone"
  on public.session_bookings for select
  using (true);

drop policy if exists "member can reserve once" on public.session_bookings;
create policy "member can reserve once"
  on public.session_bookings for insert
  with check (auth.uid() = user_id);
