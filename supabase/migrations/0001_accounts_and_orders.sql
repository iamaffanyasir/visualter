-- Visualter: customer accounts, orders and private app downloads.
-- Run once in the Supabase SQL editor (or with the Supabase CLI: supabase db push).

-- ---------- Profiles: one row per signed up customer ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Customers read their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Customers update their own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- Create the profile automatically from the details given at sign up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'phone')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Orders ----------
do $$ begin
  create type public.order_status as enum ('pending', 'paid', 'cancelled', 'refunded');
exception when duplicate_object then null; end $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_slug text not null,
  amount_inr integer not null check (amount_inr >= 0),
  status public.order_status not null default 'pending',
  buyer_name text not null,
  buyer_phone text not null,
  buyer_email text not null,
  payment_provider text,
  payment_ref text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_user_idx on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

create policy "Customers read their own orders"
  on public.orders for select using (auth.uid() = user_id);

-- Customers can only ever create a pending order for themselves.
-- Marking an order paid happens with the service role (payment webhook) or in the dashboard.
create policy "Customers create pending orders"
  on public.orders for insert
  with check (auth.uid() = user_id and status = 'pending' and paid_at is null and payment_ref is null);

-- ---------- Private bucket for app files ----------
insert into storage.buckets (id, name, public)
values ('apps', 'apps', false)
on conflict (id) do nothing;
-- No storage policies are added on purpose: files are only reachable through
-- short lived signed links created on the server after the purchase is checked.
