import type { Metadata } from 'next';
import Link from 'next/link';
import { AppIcon } from '@/components/AppIcon';
import { BarList, TrafficChart, type Day } from '@/components/admin/TrafficChart';
import { formatPrice, getProduct } from '@/data/products';
import { requireAdmin } from '@/lib/admin';
import { supabaseAdmin } from '@/lib/supabase/server';
import { setEnquiryStatus, setOrderStatus } from './actions';

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

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

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
type Ranked = { label: string; n: number }[];
type Traffic = {
  views: number;
  visitors: number;
  today_views: number;
  today_visitors: number;
  daily: Day[];
  pages: Ranked;
  referrers: Ranked;
  countries: Ranked;
  devices: Ranked;
};

const date = (s?: string | null) => (s ? new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const time = (s: string) => new Date(s).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const admin = await requireAdmin();
  const days = [7, 30, 90].includes(Number((await searchParams).days)) ? Number((await searchParams).days) : 30;
  const db = supabaseAdmin();

  const [{ data: usersData }, { data: profiles }, { data: ordersData }, { data: trafficData, error: trafficError }, { data: enquiryData }] =
    await Promise.all([
      db.auth.admin.listUsers({ page: 1, perPage: 1000 }),
      db.from('profiles').select('id, full_name, phone').range(0, 4999),
      db.from('orders').select('*').order('created_at', { ascending: false }).range(0, 4999),
      db.rpc('admin_traffic', { days }),
      db.from('enquiries').select('*').order('created_at', { ascending: false }).range(0, 199),
    ]);
  const enquiries = (enquiryData ?? []) as Enquiry[];
  const newEnquiries = enquiries.filter((e) => e.status === 'new');

  const users = usersData?.users ?? [];
  const orders = (ordersData ?? []) as Order[];
  const traffic = (trafficData ?? null) as Traffic | null;
  const profileOf = new Map((profiles ?? []).map((p) => [p.id, p]));
  const paid = orders.filter((o) => o.status === 'paid');
  const pending = orders.filter((o) => o.status === 'pending');
  const revenue = paid.reduce((s, o) => s + o.amount_inr, 0);
  const month = new Date(Date.now() - 30 * 864e5);
  const revenue30 = paid.filter((o) => new Date(o.paid_at ?? o.created_at) >= month).reduce((s, o) => s + o.amount_inr, 0);
  const newUsers30 = users.filter((u) => new Date(u.created_at) >= month).length;
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

  const regions = new Intl.DisplayNames(['en'], { type: 'region' });
  const countries = (traffic?.countries ?? []).map((c) => ({ ...c, label: c.label.length === 2 ? regions.of(c.label) ?? c.label : c.label }));

  const tiles = [
    { label: 'Revenue', value: formatPrice(revenue), sub: `${formatPrice(revenue30)} in the last 30 days` },
    { label: 'Paid orders', value: paid.length, sub: `${pending.length} waiting for payment` },
    { label: 'Customers', value: users.length, sub: `${newUsers30} joined in the last 30 days` },
    { label: 'New enquiries', value: newEnquiries.length, sub: `${enquiries.length} received in total` },
    { label: `Visitors, ${days} days`, value: traffic?.visitors ?? 0, sub: `${traffic?.today_visitors ?? 0} today` },
    { label: `Page views, ${days} days`, value: traffic?.views ?? 0, sub: `${traffic?.today_views ?? 0} today` },
  ];

  const orderRows = [...pending, ...orders.filter((o) => o.status !== 'pending')].slice(0, 60);

  return (
    <div className="admin">
      <section className="admin__head">
        <div className="container container--wide">
          <p className="eyebrow">Admin</p>
          <h1 className="headline">Dashboard</h1>
          <p className="muted mt-s">Signed in as {admin.email}</p>
        </div>
      </section>

      <div className="container container--wide">
        <div className="tiles-stats">
          {tiles.map((t) => (
            <div key={t.label} className="stat-tile">
              <div className="stat-tile__label">{t.label}</div>
              <div className="stat-tile__value">{t.value}</div>
              <div className="stat-tile__sub">{t.sub}</div>
            </div>
          ))}
        </div>

        <section className="admin__card" id="enquiries">
          <div className="admin__card-head">
            <h2>Enquiries and messages</h2>
            <span className="muted small">
              {newEnquiries.length} new · {enquiries.length} total
            </span>
          </div>
          {enquiries.length ? (
            <ul className="enquiries">
              {[...newEnquiries, ...enquiries.filter((e) => e.status !== 'new')].slice(0, 60).map((e) => {
                const p = e.product_slug ? getProduct(e.product_slug) : undefined;
                const reply = `mailto:${e.email}?subject=${encodeURIComponent(`Re: ${e.subject}`)}`;
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
                      <a className="btn btn--primary btn--sm" href={reply}>
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
                        <button className="btn btn--sm" style={{ background: 'var(--bg-alt)' }}>
                          {e.status === 'new' ? 'Mark handled' : 'Mark as new'}
                        </button>
                      </form>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="muted">No messages yet. Contact form messages and product enquiries will appear here.</p>
          )}
        </section>

        <section className="admin__card">
          <div className="admin__card-head">
            <h2>Traffic</h2>
            <div className="chips" style={{ margin: 0 }}>
              {[7, 30, 90].map((d) => (
                <Link key={d} href={`/admin?days=${d}`} className={`chip ${d === days ? 'chip--on' : ''}`}>
                  {d} days
                </Link>
              ))}
            </div>
          </div>
          {trafficError || !traffic ? (
            <p className="muted">Traffic data is not available yet.</p>
          ) : (
            <>
              <p className="muted small">Page views per day</p>
              <TrafficChart data={traffic.daily} />
              <div className="admin__grid4">
                <div>
                  <h3>Top pages</h3>
                  <BarList items={traffic.pages} />
                </div>
                <div>
                  <h3>Sources</h3>
                  <BarList items={traffic.referrers} />
                </div>
                <div>
                  <h3>Countries</h3>
                  <BarList items={countries} empty="Shown once the site is live on Vercel" />
                </div>
                <div>
                  <h3>Devices</h3>
                  <BarList items={traffic.devices} />
                </div>
              </div>
            </>
          )}
        </section>

        <section className="admin__card">
          <div className="admin__card-head">
            <h2>Orders</h2>
            <span className="muted small">{orders.length} total</span>
          </div>
          {orderRows.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Placed</th>
                    <th>Payment</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {orderRows.map((o) => {
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
                        <td>{formatPrice(o.amount_inr)}</td>
                        <td>
                          <span className={`badge badge--${o.status}`}>{o.status}</span>
                        </td>
                        <td className="muted small">{time(o.created_at)}</td>
                        <td className="muted small">
                          {o.payment_provider ?? ''}
                          {o.payment_ref ? <div>{o.payment_ref}</div> : null}
                        </td>
                        <td>
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
          )}
        </section>

        <div className="admin__grid2">
          <section className="admin__card">
            <div className="admin__card-head">
              <h2>Sales by product</h2>
            </div>
            {sales.length ? (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Sold</th>
                      <th>Pending</th>
                      <th>Revenue</th>
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
                          <td>{s.count}</td>
                          <td>{s.pending}</td>
                          <td>{formatPrice(s.revenue)}</td>
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
                      <th>Bought</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...users]
                      .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
                      .slice(0, 100)
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
                            <td className="small">{p?.phone ?? ''}</td>
                            <td className="muted small">{date(u.created_at)}</td>
                            <td>{boughtBy.get(u.id) ?? 0}</td>
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
        </div>
      </div>
    </div>
  );
}
