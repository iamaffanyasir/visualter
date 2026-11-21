import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AppIcon } from '@/components/AppIcon';
import { PayButton } from '@/components/PayButton';
import { isAdminEmail } from '@/lib/admin';
import { ProfileForm } from '@/components/ProfileForm';
import { formatPrice, getProduct, productFiles, productHref, products } from '@/data/products';
import { site } from '@/data/site';
import { supabaseEnabled } from '@/lib/supabase/config';
import { currentUser } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'Your account', robots: { index: false } };
export const dynamic = 'force-dynamic';

type Order = { id: string; product_slug: string; amount_inr: number; status: string; created_at: string };

export default async function AccountPage() {
  if (!supabaseEnabled) redirect('/login');
  const { supabase, user } = await currentUser();
  if (!user) redirect('/login?next=/account');

  const [{ data: profile }, { data: orders }] = await Promise.all([
    supabase.from('profiles').select('full_name, phone').eq('id', user.id).maybeSingle(),
    supabase.from('orders').select('id, product_slug, amount_inr, status, created_at').order('created_at', { ascending: false }),
  ]);

  const list = (orders ?? []) as Order[];
  const ownedSlugs = [...new Set(list.filter((o) => o.status === 'paid').map((o) => o.product_slug))];
  const owned = ownedSlugs.map((s) => getProduct(s)).filter((p) => !!p);
  const pending = list.filter((o) => o.status === 'pending');
  const free = products.filter((p) => p.action.type === 'download');
  const first = (profile?.full_name ?? '').split(' ')[0];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Your account</p>
          <h1 className="headline">{first ? `Hello, ${first}.` : 'Hello.'}</h1>
          <p className="lede">{user.email}</p>
          {isAdminEmail(user.email) && (
            <Link className="btn btn--dark mt-m" href="/admin">
              Open admin dashboard
            </Link>
          )}
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="title mb-l">Your apps</h2>
          {owned.length ? (
            <div className="dl-list">
              {owned.map((p) => (
                <div key={p.slug} className="dl-row">
                  <AppIcon src={p.logo} alt="" />
                  <div>
                    <Link href={productHref(p)} className="dl-row__name">
                      {p.name}
                    </Link>
                    <div className="dl-row__meta">
                      {p.platform}
                      {p.version ? ` · Version ${p.version}` : ''}
                    </div>
                  </div>
                  <div className="dl-row__actions" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {(productFiles[p.slug] ?? []).map((f, i) => (
                      <a key={f.path} className="btn btn--primary btn--sm" href={`/api/download/${p.slug}?file=${i}`}>
                        {f.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="feature center">
              <p className="muted">Apps you buy will appear here, ready to download again on any device.</p>
              <Link className="btn btn--primary mt-m" href="/store">
                Visit the Store
              </Link>
            </div>
          )}
        </div>
      </section>

      {pending.length > 0 && (
        <section className="section--tight">
          <div className="container">
            <h2 className="title mb-l">Waiting for payment</h2>
            <div className="dl-list">
              {pending.map((o) => {
                const p = getProduct(o.product_slug);
                const msg = encodeURIComponent(`Hi, I would like to complete my order ${o.id.slice(0, 8)} for ${p?.name}.`);
                return (
                  <div key={o.id} className="dl-row">
                    {p ? <AppIcon src={p.logo} alt="" /> : <span />}
                    <div>
                      <div className="dl-row__name">{p?.name ?? o.product_slug}</div>
                      <div className="dl-row__meta">
                        Order {o.id.slice(0, 8).toUpperCase()} · {formatPrice(o.amount_inr)} · {new Date(o.created_at).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                    <div className="dl-row__actions">
                      <PayButton orderId={o.id} label={`Pay ${formatPrice(o.amount_inr)}`} whatsapp={`${site.developer.whatsapp}?text=${msg}`} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="muted small mt-s">Your download unlocks here the moment the payment is confirmed.</p>
          </div>
        </section>
      )}

      <section className="section--tight">
        <div className="container">
          <h2 className="title mb-l">Free downloads</h2>
          <div className="dl-list">
            {free.map((p) => (
              <div key={p.slug} className="dl-row">
                <AppIcon src={p.logo} alt="" />
                <div>
                  <Link href={productHref(p)} className="dl-row__name">
                    {p.name}
                  </Link>
                  <div className="dl-row__meta">{p.platform}</div>
                </div>
                <div className="dl-row__actions">
                  <a className="btn btn--ghost btn--sm" href={`/api/download/${p.slug}`}>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="title mb-l">Your details</h2>
          <ProfileForm userId={user.id} name={profile?.full_name ?? ''} phone={profile?.phone ?? ''} />
          <form action="/auth/signout" method="post" className="center mt-l">
            <button className="btn btn--ghost" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
