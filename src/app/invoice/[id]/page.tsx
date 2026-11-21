import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { InvoiceActions } from '@/components/InvoiceActions';
import { formatPrice, getProduct } from '@/data/products';
import { site } from '@/data/site';
import { isAdminEmail } from '@/lib/admin';
import { invoiceNumber } from '@/lib/invoice';
import { supabaseEnabled } from '@/lib/supabase/config';
import { currentUser, supabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Order = {
  id: string;
  user_id: string;
  product_slug: string;
  amount_inr: number;
  status: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_email: string;
  payment_provider: string | null;
  payment_ref: string | null;
  created_at: string;
  paid_at: string | null;
};

async function loadOrder(id: string) {
  if (!supabaseEnabled || !/^[0-9a-f-]{36}$/i.test(id)) return { order: null, admin: false };
  const { supabase, user } = await currentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/invoice/${id}`)}`);
  const admin = isAdminEmail(user.email);
  const client = admin ? supabaseAdmin() : supabase;
  const { data } = await client.from('orders').select('*').eq('id', id).maybeSingle();
  return { order: (data as Order | null) ?? null, admin };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  // The title becomes the default file name when the invoice is saved as PDF.
  return { title: { absolute: `Visualter Invoice ${id.slice(0, 6).toUpperCase()}` }, robots: { index: false, follow: false } };
}

const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const method = (p: string | null) => (p === 'razorpay' ? 'Razorpay' : p === 'manual' ? 'Bank transfer or UPI' : p ? p : 'Online');

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { order, admin } = await loadOrder(id);
  if (!order || order.status !== 'paid') notFound();

  const product = getProduct(order.product_slug);
  const number = invoiceNumber(order);
  const d = site.developer;

  return (
    <div className="invoice-page">
      <div className="invoice-toolbar container">
        <Link className="link" href={admin ? '/admin' : '/account'}>
          Back to {admin ? 'dashboard' : 'your account'}
        </Link>
        <InvoiceActions />
      </div>

      <article className="invoice" aria-label={`Invoice ${number}`}>
        <header className="invoice__head">
          <div className="invoice__brand">
            <img src="/brand/mark.svg" alt="" width={44} height={44} />
            <div>
              <div className="invoice__brand-name">Visualter</div>
              <div className="invoice__brand-sub">Apps, software and hardware</div>
            </div>
          </div>
          <div className="invoice__title">
            <div className="invoice__label">Invoice</div>
            <div className="invoice__number">{number}</div>
          </div>
        </header>

        <section className="invoice__meta">
          <div>
            <div className="invoice__k">From</div>
            <div className="invoice__v">
              <strong>Visualter</strong>
              <br />
              {d.name}
              <br />
              {d.location}
              <br />
              {d.email}
              <br />
              {d.phone}
            </div>
          </div>
          <div>
            <div className="invoice__k">Billed to</div>
            <div className="invoice__v">
              <strong>{order.buyer_name}</strong>
              <br />
              {order.buyer_email}
              <br />
              {order.buyer_phone}
            </div>
          </div>
          <div>
            <div className="invoice__k">Invoice date</div>
            <div className="invoice__v">{fmtDate(order.paid_at ?? order.created_at)}</div>
            <div className="invoice__k mt-s">Order</div>
            <div className="invoice__v">{order.id.slice(0, 8).toUpperCase()}</div>
          </div>
        </section>

        <table className="invoice__items">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="invoice__item">
                  {product && <img src={product.logo} alt="" width={44} height={44} />}
                  <div>
                    <strong>{product?.name ?? order.product_slug}</strong>
                    <div className="invoice__muted">
                      {product?.platform}
                      {product?.version ? ` · Version ${product.version}` : ''} · Lifetime licence for personal use
                    </div>
                  </div>
                </div>
              </td>
              <td>1</td>
              <td>{formatPrice(order.amount_inr)}</td>
              <td>{formatPrice(order.amount_inr)}</td>
            </tr>
          </tbody>
        </table>

        <section className="invoice__bottom">
          <div className="invoice__pay">
            <div className="invoice__k">Payment</div>
            <div className="invoice__v">
              {method(order.payment_provider)}
              {order.payment_ref ? (
                <>
                  <br />
                  <span className="invoice__muted">Reference {order.payment_ref}</span>
                </>
              ) : null}
              <br />
              <span className="invoice__muted">Paid on {fmtDate(order.paid_at ?? order.created_at)}</span>
            </div>
          </div>
          <div className="invoice__totals">
            <div>
              <span>Subtotal</span>
              <span>{formatPrice(order.amount_inr)}</span>
            </div>
            <div className="invoice__total">
              <span>Total paid</span>
              <span>{formatPrice(order.amount_inr)}</span>
            </div>
            <div className="invoice__stamp">Paid</div>
          </div>
        </section>

        <footer className="invoice__foot">
          <p>
            Thank you for your purchase. Download {product?.name ?? 'your product'} again any time from your account at
            visualter.com/account.
          </p>
          <p className="invoice__muted">
            Questions about this invoice: {d.email} · {d.phone}. This is a computer generated invoice and needs no signature.
          </p>
        </footer>
      </article>
    </div>
  );
}
