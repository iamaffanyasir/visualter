-- Visualter: contact form messages and product enquiries, visible only in the admin dashboard.
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  product_slug text,
  user_id uuid references auth.users (id) on delete set null,
  status text not null default 'new' check (status in ('new', 'handled')),
  sender_hash text
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);

-- Row level security on with no policies: only the server (service role) can read or write.
alter table public.enquiries enable row level security;
