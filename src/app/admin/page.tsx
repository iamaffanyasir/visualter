import type { Metadata } from 'next';
import Link from 'next/link';
import { AppIcon } from '@/components/AppIcon';
import { LineChart } from '@/components/admin/LineChart';
import { BarList } from '@/components/admin/TrafficChart';
import { formatPrice, getProduct, work } from '@/data/products';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase/server';
import { setEnquiryStatus, setOrderStatus } from './actions';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

/* ---------- Types ---------- */
type Order = {
  id: string;
  user_id: string;
  product_slug: string;
  amount_inr: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded';
  buyer_name: string;
  buyer_phone: string;
  buyer_email: string;
  payment_provider: string | null;
  payment_ref: string | null;
  created_at: string;
  paid_at: string | null;
};
type Enquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  product_slug: string | null;
  status: 'new' | 'handled';
};
type Ranked = { label: string; n: number }[];
type Traffic = {
  views: number;
  visitors: number;
  today_views: number;
  today_visitors: number;
  daily: { day: string; views: number; visitors: number }[];
  pages: Ranked;
  referrers: Ranked;
  countries: Ranked;
  devices: Ranked;
};
type EventRow = { product_slug: string; downloads: number; paid: number; free: number; android: number; windows: number; clicks: number; devices: number };
type Events = {
  downloads: number;
  clicks: number;
  devices: number;
  daily: { day: string; downloads: number; clicks: number }[];
  products: EventRow[];
  recent: {
    created_at: string;
    kind: 'download' | 'click';
    product_slug: string;
    target: string | null;
    paid: boolean;
    user_id: string | null;
    device: string | null;
    country: string | null;
  }[];
};

/* ---------- Helpers ---------- */
const BLUE = '#2a78d6';
const ORANGE = '#eb6834';
const date = (s?: string | null) => (s ? new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const time = (s: string) => new Date(s).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

function eventItem(slug: string) {
  if (slug.startsWith('work:')) {
    const w = work.find((x) => x.slug === slug.slice(5));
    return { name: w ? `${w.name} website` : slug, logo: w?.logo };
  }
  const p = getProduct(slug);
  return { name: p?.name ?? slug, logo: p?.logo };
}

const VIEWS = ['overview', 'traffic', 'downloads', 'orders', 'enquiries', 'customers', 'sales'] as const;
type View = (typeof VIEWS)[number];

const ICONS: Record<View, React.ReactNode> = {
  overview: <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" />,
  traffic: <path d="M3 17l5-5 4 4 8-8M15 8h5v5" />,
  downloads: <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" />,
  orders: <path d="M6 6h15l-1.5 9h-12L6 6Zm0 0L5 3H2m6 17a1 1 0 1 0 0 .01M18 20a1 1 0 1 0 0 .01" />,
  enquiries: <path d="M4 5h16v11H8l-4 4V5Z" />,
  customers: <path d="M16 19v-1a4 4 0 0 0-8 0v1m4-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 8v-1a3 3 0 0 0-2-2.8M17 5.2a3 3 0 0 1 0 5.6" />,
  sales: <path d="M4 19V5m0 14h16M8 15l3-4 3 2 4-6" />,
};
const LABELS: Record<View, string> = {
  overview: 'Overview',
  traffic: 'Traffic',
  downloads: 'Downloads',
  orders: 'Orders',
  enquiries: 'Enquiries',
  customers: 'Customers',
  sales: 'Sales',
};

/* ---------- Page ---------- */
export default async function AdminPage({ searchParams }: { searchParams: Promise<{ days?: string; view?: string }> }) {
  const admin = await requireAdmin();
  const sp = await searchParams;
  const days = [7, 30, 90].includes(Number(sp.days)) ? Number(sp.days) : 30;
  const view: View = (VIEWS as readonly string[]).includes(sp.view ?? '') ? (sp.view as View) : 'overview';
  const db = supabaseAdmin();

  const [{ data: usersData }, { data: profiles }, { data: ordersData }, { data: trafficData }, { data: enquiryData }, { data: eventsData }] = await Promise.all([
    db.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    db.from('profiles').select('id, full_name, phone').range(0, 4999),
    db.from('orders').select('*').order('created_at', { ascending: false }).range(0, 4999),
    db.rpc('admin_traffic', { days }),
    db.from('enquiries').select('*').order('created_at', { ascending: false }).range(0, 199),
    db.rpc('admin_events', { days }),
  ]);

  const users = usersData?.users ?? [];
  const orders = (ordersData ?? []) as Order[];
  const enquiries = (enquiryData ?? []) as Enquiry[];
  const traffic = (trafficData ?? null) as Traffic | null;
  const events = (eventsData ?? null) as Events | null;
  const profileOf = new Map((profiles ?? []).map((p) => [p.id, p]));
  const paid = orders.filter((o) => o.status === 'paid');
  const pending = orders.filter((o) => o.status === 'pending');
  const newEnquiries = enquiries.filter((e) => e.status === 'new');
  const since = new Date(Date.now() - days * 864e5);
  const paidInRange = paid.filter((o) => new Date(o.paid_at ?? o.created_at) >= since);
  const revenue = paid.reduce((s, o) => s + o.amount_inr, 0);
  const revenueRange = paidInRange.reduce((s, o) => s + o.amount_inr, 0);
  const newUsers = users.filter((u) => new Date(u.created_at) >= since).length;
  const regions = new Intl.DisplayNames(['en'], { type: 'region' });

  // Revenue per day for the chosen range
  const revenueDaily = (traffic?.daily ?? []).map((d) => ({ day: d.day, revenue: 0, orders: 0 }));
  const dayIndex = new Map(revenueDaily.map((d, i) => [d.day, i]));
  paidInRange.forEach((o) => {
    const i = dayIndex.get((o.paid_at ?? o.created_at).slice(0, 10));
    if (i !== undefined) {
      revenueDaily[i].revenue += o.amount_inr;
      revenueDaily[i].orders += 1;
    }
  });

  const boughtBy = new Map<string, number>();
  paid.forEach((o) => boughtBy.set(o.user_id, (boughtBy.get(o.user_id) ?? 0) + 1));
  const bySlug = new Map<string, { count: number; revenue: number; pending: number }>();
  orders.forEach((o) => {
    const e = bySlug.get(o.product_slug) ?? { count: 0, revenue: 0, pending: 0 };
    if (o.status === 'paid') {
      e.count++;
      e.revenue += o.amount_inr;
    }
    if (o.status === 'pending') e.pending++;
    bySlug.set(o.product_slug, e);
  });
  const sales = [...bySlug.entries()].sort((a, b) => b[1].revenue - a[1].revenue);
  const orderRows = [...pending, ...orders.filter((o) => o.status !== 'pending')];

  const badge: Partial<Record<View, number>> = { orders: pending.length, enquiries: newEnquiries.length };
  const href = (v: View, d = days) => `/admin?view=${v}${d !== 30 ? `&days=${d}` : ''}`;
  const showRange = view === 'overview' || view === 'traffic' || view === 'downloads';

  /* ---------- Reusable blocks ---------- */
  const OrdersTable = ({ rows }: { rows: Order[] }) =>
    rows.length ? (
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th className="num">Amount</th>
              <th>Status</th>
              <th>Placed</th>
              <th>Payment</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => {
              const p = getProduct(o.product_slug);
              return (
                <tr key={o.id}>
                  <td>
                    <span className="cell-product">
                      {p && <AppIcon src={p.logo} alt="" size={28} />}
                      {p?.name ?? o.product_slug}
                    </span>
                  </td>
                  <td>
                    <div>{o.buyer_name}</div>
                    <div className="muted small">
                      {o.buyer_email} · {o.buyer_phone}
                    </div>
                  </td>
                  <td className="num">{formatPrice(o.amount_inr)}</td>
                  <td>
                    <span className={`badge badge--${o.status}`}>{o.status}</span>
                  </td>
                  <td className="muted small nowrap">{time(o.created_at)}</td>
                  <td className="muted small">
                    {o.payment_provider ?? ''}
                    {o.payment_ref ? <div>{o.payment_ref}</div> : null}
                  </td>
                  <td className="cell-actions">
                    {o.status === 'paid' && (
                      <div className="row-actions">
                        <Link className="btn btn--ghost btn--sm" href={`/invoice/${o.id}`}>
                          Invoice
                        </Link>
                        <a className="btn btn--sm btn--soft" href={`/invoice/${o.id}?download=1`} target="_blank" rel="noopener">
                          Download
                        </a>
                      </div>
                    )}
                    {o.status === 'pending' && (
                      <div className="row-actions">
                        <form action={setOrderStatus}>
                          <input type="hidden" name="id" value={o.id} />
                          <input type="hidden" name="status" value="paid" />
                          <button className="btn btn--primary btn--sm">Mark paid</button>
                        </form>
                        <form action={setOrderStatus}>
                          <input type="hidden" name="id" value={o.id} />
                          <input type="hidden" name="status" value="cancelled" />
                          <button className="btn btn--sm btn--ghost">Cancel</button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="muted">No orders yet.</p>
    );

  const EnquiryList = ({ rows }: { rows: Enquiry[] }) =>
    rows.length ? (
      <ul className="enquiries">
        {rows.map((e) => {
          const p = e.product_slug ? getProduct(e.product_slug) : undefined;
          return (
            <li key={e.id} className={`enquiry ${e.status === 'handled' ? 'enquiry--done' : ''}`}>
              <div className="enquiry__top">
                <div>
                  <strong>{e.subject}</strong>
                  <div className="muted small">
                    {e.name} · {e.email}
                    {e.phone ? ` · ${e.phone}` : ''} · {time(e.created_at)}
                  </div>
                </div>
                <div className="enquiry__tags">
                  {p && (
                    <span className="cell-product small">
                      <AppIcon src={p.logo} alt="" size={22} />
                      {p.name}
                    </span>
                  )}
                  <span className={`badge badge--${e.status === 'new' ? 'pending' : 'cancelled'}`}>{e.status}</span>
                </div>
              </div>
              <p className="enquiry__msg">{e.message}</p>
              <div className="row-actions">
                <a className="btn btn--primary btn--sm" href={`mailto:${e.email}?subject=${encodeURIComponent(`Re: ${e.subject}`)}`}>
                  Reply by email
                </a>
                {e.phone && (
                  <a className="btn btn--ghost btn--sm" href={`https://wa.me/${e.phone.replace(/\D/g, '').replace(/^(\d{10})$/, '91$1')}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                )}
                <form action={setEnquiryStatus}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="status" value={e.status === 'new' ? 'handled' : 'new'} />
                  <button className="btn btn--sm btn--soft">{e.status === 'new' ? 'Mark handled' : 'Mark as new'}</button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="muted">No messages yet. Contact form messages and product enquiries will appear here.</p>
    );

  const Kpi = ({ label, value, sub, to }: { label: string; value: React.ReactNode; sub: string; to?: string }) => {
    const body = (
      <>
        <div className="stat-tile__label">{label}</div>
        <div className="stat-tile__value">{value}</div>
        <div className="stat-tile__sub">{sub}</div>
      </>
    );
    return to ? (
      <Link href={to} className="stat-tile stat-tile--link">
        {body}
      </Link>
    ) : (
      <div className="stat-tile">{body}</div>
    );
  };

  const trafficChart = traffic ? (
    <LineChart
      title="Page views and unique devices"
      data={traffic.daily}
      series={[
        { key: 'views', label: 'Page views', color: BLUE },
        { key: 'visitors', label: 'Unique devices', color: ORANGE },
      ]}
    />
  ) : (
    <p className="muted">Traffic data is not available yet.</p>
  );

  return (
    <div className="admin-shell">
      <aside className="admin-side" aria-label="Admin sections">
        <div className="admin-side__head">
          <img src="/brand/mark.svg" alt="" width={30} height={30} />
          <div>
            <strong>Visualter</strong>
            <span>Admin</span>
          </div>
        </div>
        <nav>
          {VIEWS.map((v) => (
            <Link key={v} href={href(v)} className={`admin-side__link ${v === view ? 'admin-side__link--on' : ''}`} aria-current={v === view ? 'page' : undefined}>
              <svg viewBox="0 0 24 24" aria-hidden>
                {ICONS[v]}
              </svg>
              <span>{LABELS[v]}</span>
              {badge[v] ? <em>{badge[v]}</em> : null}
            </Link>
          ))}
        </nav>
        <div className="admin-side__foot">
          <span className="muted small">{admin.email}</span>
          <Link className="link small" href="/account">
            Your account
          </Link>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-main__head">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="title">{LABELS[view]}</h1>
          </div>
          {showRange && (
            <div className="chips">
              {[7, 30, 90].map((d) => (
                <Link key={d} href={href(view, d)} className={`chip ${d === days ? 'chip--on' : ''}`}>
                  {d} days
                </Link>
              ))}
            </div>
          )}
        </header>

        {view === 'overview' && (
          <>
            <div className="tiles-stats">
              <Kpi label={`Revenue, ${days} days`} value={formatPrice(revenueRange)} sub={`${formatPrice(revenue)} all time`} to={href('sales')} />
              <Kpi label="Waiting for payment" value={pending.length} sub={`${paid.length} paid orders in total`} to={href('orders')} />
              <Kpi label="New enquiries" value={newEnquiries.length} sub={`${enquiries.length} received in total`} to={href('enquiries')} />
              <Kpi label={`Unique devices, ${days} days`} value={traffic?.visitors ?? 0} sub={`${traffic?.views ?? 0} page views`} to={href('traffic')} />
              <Kpi label={`Downloads, ${days} days`} value={events?.downloads ?? 0} sub={`${events?.clicks ?? 0} outbound clicks`} to={href('downloads')} />
              <Kpi label="Customers" value={users.length} sub={`${newUsers} joined in ${days} days`} to={href('customers')} />
            </div>

            <div className="admin-grid2">
              <section className="admin__card">
                <div className="admin__card-head">
                  <h2>Revenue</h2>
                  <span className="muted small">{formatPrice(revenueRange)}</span>
                </div>
                <LineChart title="Revenue per day" data={revenueDaily} series={[{ key: 'revenue', label: 'Revenue', color: BLUE }]} unit="rupees" />
              </section>
              <section className="admin__card">
                <div className="admin__card-head">
                  <h2>Traffic</h2>
                  <Link className="link small" href={href('traffic')}>
                    Details
                  </Link>
                </div>
                {trafficChart}
              </section>
            </div>

            <section className="admin__card">
              <div className="admin__card-head">
                <h2>Latest orders</h2>
                <Link className="link small" href={href('orders')}>
                  All orders
                </Link>
              </div>
              <OrdersTable rows={orderRows.slice(0, 5)} />
            </section>
            <section className="admin__card">
              <div className="admin__card-head">
                <h2>New enquiries</h2>
                <Link className="link small" href={href('enquiries')}>
                  Inbox
                </Link>
              </div>
              <EnquiryList rows={newEnquiries.slice(0, 3)} />
            </section>
          </>
        )}

        {view === 'traffic' && (
          <>
            <div className="tiles-stats">
              <Kpi label="Page views" value={traffic?.views ?? 0} sub={`${traffic?.today_views ?? 0} today`} />
              <Kpi label="Unique devices" value={traffic?.visitors ?? 0} sub={`${traffic?.today_visitors ?? 0} today`} />
              <Kpi
                label="Views per device"
                value={traffic && traffic.visitors ? (traffic.views / traffic.visitors).toFixed(1) : '0'}
                sub="average pages each device opened"
              />
            </div>
            <section className="admin__card">
              <div className="admin__card-head">
                <h2>Page views and unique devices</h2>
              </div>
              {trafficChart}
            </section>
            <div className="admin-grid2">
              <section className="admin__card">
                <h2 className="admin__h">Top pages</h2>
                <BarList items={traffic?.pages ?? []} />
              </section>
              <section className="admin__card">
                <h2 className="admin__h">Sources</h2>
                <BarList items={traffic?.referrers ?? []} />
              </section>
              <section className="admin__card">
                <h2 className="admin__h">Countries</h2>
                <BarList
                  items={(traffic?.countries ?? []).map((c) => ({ ...c, label: c.label.length === 2 ? regions.of(c.label) ?? c.label : c.label }))}
                  empty="Shown once the site is live on Vercel"
                />
              </section>
              <section className="admin__card">
                <h2 className="admin__h">Devices</h2>
                <BarList items={traffic?.devices ?? []} />
              </section>
            </div>
          </>
        )}

        {view === 'downloads' && (
          <>
            <div className="tiles-stats">
              <Kpi label="Downloads" value={events?.downloads ?? 0} sub="free and paid apps and software" />
              <Kpi label="Devices that downloaded" value={events?.devices ?? 0} sub="each device counted once" />
              <Kpi label="Outbound clicks" value={events?.clicks ?? 0} sub="Play Store, Subscribe and client sites" />
            </div>
            <section className="admin__card">
              <div className="admin__card-head">
                <h2>Downloads and clicks</h2>
              </div>
              {events ? (
                <LineChart
                  title="Downloads and outbound clicks"
                  data={events.daily}
                  series={[
                    { key: 'downloads', label: 'Downloads', color: BLUE },
                    { key: 'clicks', label: 'Outbound clicks', color: ORANGE },
                  ]}
                />
              ) : (
                <p className="muted">Download data is not available yet.</p>
              )}
            </section>
            <section className="admin__card">
              <h2 className="admin__h">By product</h2>
              {events?.products.length ? (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="num">Downloads</th>
                        <th className="num">Free</th>
                        <th className="num">Paid</th>
                        <th className="num">Android</th>
                        <th className="num">Windows</th>
                        <th className="num">Devices</th>
                        <th className="num">Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.products.map((r) => {
                        const it = eventItem(r.product_slug);
                        return (
                          <tr key={r.product_slug}>
                            <td>
                              <span className="cell-product">
                                {it.logo && <AppIcon src={it.logo} alt="" size={28} />}
                                {it.name}
                              </span>
                            </td>
                            <td className="num">{r.downloads}</td>
                            <td className="num">{r.free}</td>
                            <td className="num">{r.paid}</td>
                            <td className="num">{r.android}</td>
                            <td className="num">{r.windows}</td>
                            <td className="num">{r.devices}</td>
                            <td className="num">{r.clicks}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="muted">No downloads or clicks yet.</p>
              )}
            </section>
            <section className="admin__card">
              <h2 className="admin__h">Recent activity</h2>
              {events?.recent.length ? (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>When</th>
                        <th>What</th>
                        <th>Item</th>
                        <th>Who</th>
                        <th>Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.recent.map((r, i) => {
                        const it = eventItem(r.product_slug);
                        const who = r.user_id ? profileOf.get(r.user_id)?.full_name || 'Signed in customer' : 'Guest';
                        return (
                          <tr key={i}>
                            <td className="muted small nowrap">{time(r.created_at)}</td>
                            <td>
                              <span className={`badge ${r.kind === 'download' ? (r.paid ? 'badge--paid' : 'badge--pending') : ''}`}>
                                {r.kind === 'download' ? (r.paid ? 'Paid download' : 'Free download') : 'Click'}
                              </span>
                            </td>
                            <td>
                              <div>{it.name}</div>
                              <div className="muted small">{r.target}</div>
                            </td>
                            <td className="small">{who}</td>
                            <td className="muted small">
                              {r.device ?? ''}
                              {r.country ? ` · ${regions.of(r.country) ?? r.country}` : ''}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="muted">Nothing yet.</p>
              )}
            </section>
          </>
        )}

        {view === 'orders' && (
          <section className="admin__card">
            <div className="admin__card-head">
              <h2>All orders</h2>
              <span className="muted small">
                {pending.length} waiting · {paid.length} paid · {orders.length} total
              </span>
            </div>
            <OrdersTable rows={orderRows.slice(0, 200)} />
          </section>
        )}

        {view === 'enquiries' && (
          <section className="admin__card">
            <div className="admin__card-head">
              <h2>Enquiries and messages</h2>
              <span className="muted small">
                {newEnquiries.length} new · {enquiries.length} total
              </span>
            </div>
            <EnquiryList rows={[...newEnquiries, ...enquiries.filter((e) => e.status !== 'new')]} />
          </section>
        )}

        {view === 'customers' && (
          <section className="admin__card">
            <div className="admin__card-head">
              <h2>Customers</h2>
              <span className="muted small">{users.length} total</span>
            </div>
            {users.length ? (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Joined</th>
                      <th>Last sign in</th>
                      <th className="num">Bought</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...users]
                      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
                      .map((u) => {
                        const p = profileOf.get(u.id);
                        return (
                          <tr key={u.id}>
                            <td>
                              <div>{p?.full_name || 'No name'}</div>
                              <div className="muted small">
                                {u.email}
                                {!u.email_confirmed_at && ' · not confirmed'}
                              </div>
                            </td>
                            <td className="small nowrap">{p?.phone ?? ''}</td>
                            <td className="muted small nowrap">{date(u.created_at)}</td>
                            <td className="muted small nowrap">{date(u.last_sign_in_at)}</td>
                            <td className="num">{boughtBy.get(u.id) ?? 0}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="muted">No customers yet.</p>
            )}
          </section>
        )}

        {view === 'sales' && (
          <>
            <div className="tiles-stats">
              <Kpi label="Revenue, all time" value={formatPrice(revenue)} sub={`${paid.length} paid orders`} />
              <Kpi label="Average order" value={formatPrice(paid.length ? Math.round(revenue / paid.length) : 0)} sub="per paid order" />
              <Kpi label="Waiting for payment" value={formatPrice(pending.reduce((s, o) => s + o.amount_inr, 0))} sub={`${pending.length} pending orders`} />
            </div>
            <section className="admin__card">
              <h2 className="admin__h">Sales by product</h2>
              {sales.length ? (
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th className="num">Sold</th>
                        <th className="num">Pending</th>
                        <th className="num">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.map(([slug, s]) => {
                        const p = getProduct(slug);
                        return (
                          <tr key={slug}>
                            <td>
                              <span className="cell-product">
                                {p && <AppIcon src={p.logo} alt="" size={28} />}
                                {p?.name ?? slug}
                              </span>
                            </td>
                            <td className="num">{s.count}</td>
                            <td className="num">{s.pending}</td>
                            <td className="num">{formatPrice(s.revenue)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="muted">No sales yet.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
