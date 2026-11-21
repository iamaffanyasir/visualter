-- Visualter: download history (free and paid) and outbound clicks for the admin dashboard.
-- Same privacy approach as page_views: no cookies, no IP addresses; "visitor" is a one way hash.

create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('download', 'click')),
  product_slug text not null,
  target text,
  paid boolean not null default false,
  user_id uuid references auth.users (id) on delete set null,
  visitor text,
  device text,
  country text
);

create index if not exists events_created_idx on public.events (created_at desc);
create index if not exists events_product_idx on public.events (product_slug, kind);

-- Row level security on with no policies: only the server (service role) can read or write.
alter table public.events enable row level security;

create or replace function public.admin_events(days integer default 30)
returns json
language sql
stable
security definer
set search_path = public
as $$
  with e as (
    select * from events where created_at >= now() - make_interval(days => days)
  ),
  series as (
    select d::date as day from generate_series((now() - make_interval(days => days - 1))::date, now()::date, interval '1 day') d
  )
  select json_build_object(
    'downloads', (select count(*) from e where kind = 'download'),
    'clicks', (select count(*) from e where kind = 'click'),
    'devices', (select count(distinct visitor) from e where kind = 'download'),
    'daily', (
      select coalesce(json_agg(json_build_object('day', s.day, 'downloads', coalesce(c.downloads, 0), 'clicks', coalesce(c.clicks, 0)) order by s.day), '[]')
      from series s
      left join (
        select created_at::date as day,
               count(*) filter (where kind = 'download') as downloads,
               count(*) filter (where kind = 'click') as clicks
        from e group by 1
      ) c on c.day = s.day
    ),
    'products', (
      select coalesce(json_agg(t order by t.downloads desc, t.clicks desc), '[]') from (
        select product_slug,
               count(*) filter (where kind = 'download') as downloads,
               count(*) filter (where kind = 'download' and paid) as paid,
               count(*) filter (where kind = 'download' and not paid) as free,
               count(*) filter (where kind = 'download' and target ilike '%.apk') as android,
               count(*) filter (where kind = 'download' and target ilike '%.exe') as windows,
               count(*) filter (where kind = 'click') as clicks,
               count(distinct visitor) filter (where kind = 'download') as devices
        from e group by product_slug
      ) t
    ),
    'recent', (
      select coalesce(json_agg(t), '[]') from (
        select created_at, kind, product_slug, target, paid, user_id, device, country
        from e order by created_at desc limit 40
      ) t
    )
  );
$$;

revoke all on function public.admin_events(integer) from public, anon, authenticated;
grant execute on function public.admin_events(integer) to service_role;
