-- Visualter: first party traffic stats for the admin dashboard.
-- No cookies and no IP addresses are stored: "visitor" is a daily rotating one way hash.

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  path text not null,
  referrer text,
  country text,
  device text,
  visitor text not null
);

create index if not exists page_views_created_idx on public.page_views (created_at desc);

-- Row level security on with no policies: only the server (service role) can read or write.
alter table public.page_views enable row level security;

-- One call returns everything the dashboard needs for the last `days` days.
create or replace function public.admin_traffic(days integer default 30)
returns json
language sql
stable
security definer
set search_path = public
as $$
  with v as (
    select * from page_views where created_at >= now() - make_interval(days => days)
  ),
  series as (
    select d::date as day from generate_series((now() - make_interval(days => days - 1))::date, now()::date, interval '1 day') d
  )
  select json_build_object(
    'views', (select count(*) from v),
    'visitors', (select count(distinct visitor) from v),
    'today_views', (select count(*) from v where created_at::date = now()::date),
    'today_visitors', (select count(distinct visitor) from v where created_at::date = now()::date),
    'daily', (
      select coalesce(json_agg(json_build_object('day', s.day, 'views', coalesce(c.views, 0), 'visitors', coalesce(c.visitors, 0)) order by s.day), '[]')
      from series s
      left join (select created_at::date as day, count(*) as views, count(distinct visitor) as visitors from v group by 1) c on c.day = s.day
    ),
    'pages', (select coalesce(json_agg(t), '[]') from (select path as label, count(*) as n from v group by path order by n desc limit 10) t),
    'referrers', (select coalesce(json_agg(t), '[]') from (select coalesce(referrer, 'Direct') as label, count(*) as n from v group by 1 order by n desc limit 8) t),
    'countries', (select coalesce(json_agg(t), '[]') from (select coalesce(country, 'Unknown') as label, count(*) as n from v group by 1 order by n desc limit 8) t),
    'devices', (select coalesce(json_agg(t), '[]') from (select coalesce(device, 'Unknown') as label, count(*) as n from v group by 1 order by n desc) t)
  );
$$;

revoke all on function public.admin_traffic(integer) from public, anon, authenticated;
grant execute on function public.admin_traffic(integer) to service_role;
