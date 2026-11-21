'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatPrice, type Product } from '@/data/products';
import { site } from '@/data/site';
import { CHECKOUT_ENABLED, startCheckout } from '@/lib/checkout';
import { supabaseEnabled } from '@/lib/supabase/config';
import { supabaseBrowser } from '@/lib/supabase/client';
import { AppIcon } from './AppIcon';

type Props = { product: Product; small?: boolean; autoOpen?: boolean };

export function ActionButton({ product, small, autoOpen }: Props) {
  const [sheet, setSheet] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const a = product.action;
  const size = small ? 'btn--sm' : '';

  const buy = async () => {
    if (!supabaseEnabled) return setSheet(true);
    const { data } = await supabaseBrowser().auth.getUser();
    if (!data.user) {
      router.push(`/login?next=${encodeURIComponent(`${pathname}?buy=${product.slug}`)}`);
      return;
    }
    setSheet(true);
  };

  // Coming back from sign in with ?buy=slug opens checkout straight away.
  useEffect(() => {
    if (!autoOpen || a.type !== 'buy') return;
    if (new URLSearchParams(window.location.search).get('buy') === product.slug) {
      window.history.replaceState(null, '', window.location.pathname);
      buy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (a.type) {
    case 'download':
      return (
        <a className={`btn btn--primary ${size}`} href={a.href} download>
          Download
        </a>
      );
    case 'play':
      return (
        <a className={`btn btn--primary ${size}`} href={a.href} target="_blank" rel="noopener noreferrer">
          {small ? 'Get' : 'Get it on Google Play'}
        </a>
      );
    case 'soon':
      return (
        <button className={`btn ${size}`} disabled>
          Coming soon
        </button>
      );
    case 'enquire':
      return (
        <Link className={`btn btn--primary ${size}`} href={`/contact?about=${product.slug}`}>
          {small ? 'Enquire' : `Request ${product.name}`}
        </Link>
      );
    case 'subscribe':
      return (
        <a className={`btn btn--primary ${size}`} href={a.href} target="_blank" rel="noopener noreferrer">
          Subscribe
        </a>
      );
    case 'bundled':
      return (
        <button className={`btn ${size}`} disabled>
          Included
        </button>
      );
    case 'buy':
      return (
        <>
          <button className={`btn btn--primary ${size}`} onClick={buy}>
            Buy {formatPrice(a.price)}
          </button>
          {sheet &&
            (supabaseEnabled ? (
              <CheckoutSheet product={product} price={a.price} onClose={() => setSheet(false)} />
            ) : (
              <MessageSheet product={product} price={a.price} onClose={() => setSheet(false)} />
            ))}
        </>
      );
  }
}

function useSheet(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
}

function Sheet({ product, onClose, children }: { product: Product; onClose: () => void; children: React.ReactNode }) {
  useSheet(onClose);
  return createPortal(
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={(e) => e.stopPropagation()}>
        <AppIcon src={product.logo} alt="" />
        {children}
        <button className="sheet__close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}

/** Used until Supabase is connected: order by WhatsApp or email. */
function MessageSheet({ product, price, onClose }: { product: Product; price: number; onClose: () => void }) {
  const d = site.developer;
  const message = encodeURIComponent(`Hi, I would like to buy ${product.name} for ${formatPrice(price)}.`);
  return (
    <Sheet product={product} onClose={onClose}>
      <h2 id="sheet-title">{product.name}</h2>
      <div className="sheet__price">{formatPrice(price)}</div>
      <p>Online checkout opens very soon. You can buy {product.name} today by sending a quick message.</p>
      <div className="sheet__actions">
        <a className="btn btn--primary" href={`${d.whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer">
          Buy on WhatsApp
        </a>
        <a className="btn btn--ghost" href={`mailto:${d.email}?subject=${encodeURIComponent(`Buy ${product.name}`)}&body=${message}`}>
          Buy by email
        </a>
      </div>
    </Sheet>
  );
}

type Result = { orderId?: string; owned?: boolean; error?: string; paid?: boolean; payError?: string };

/** Signed in checkout: confirm buyer details, create the order, then pay. */
function CheckoutSheet({ product, price, onClose }: { product: Product; price: number; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    (async () => {
      const supabase = supabaseBrowser();
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      const { data: p } = await supabase.from('profiles').select('full_name, phone').eq('id', data.user.id).maybeSingle();
      setForm({ name: p?.full_name ?? '', phone: p?.phone ?? '' });
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: product.slug, ...form }),
    });
    const data = (await res.json().catch(() => ({ error: 'Something went wrong.' }))) as Result;
    if (data.orderId && CHECKOUT_ENABLED) await pay(data);
    else setResult(data);
    setBusy(false);
  };

  const pay = async (data: Result) => {
    setBusy(true);
    try {
      const outcome = await startCheckout(data.orderId as string);
      setResult({ ...data, paid: outcome === 'paid', payError: outcome === 'failed' ? 'The payment did not go through. Please try again.' : undefined });
    } catch (err) {
      setResult({ ...data, payError: err instanceof Error ? err.message : 'Could not start the payment.' });
    }
    setBusy(false);
  };

  if (result?.paid) {
    return (
      <Sheet product={product} onClose={onClose}>
        <h2 id="sheet-title">Payment received.</h2>
        <div className="sheet__price">{product.name} is yours.</div>
        <p>It is now in your account, ready to download on any device, any time.</p>
        <div className="sheet__actions">
          <Link className="btn btn--primary" href="/account">
            Download now
          </Link>
        </div>
      </Sheet>
    );
  }

  if (result?.owned) {
    return (
      <Sheet product={product} onClose={onClose}>
        <h2 id="sheet-title">You already own {product.name}.</h2>
        <p className="mt-s">Download it any time from your account.</p>
        <div className="sheet__actions">
          <Link className="btn btn--primary" href="/account">
            Go to your account
          </Link>
        </div>
      </Sheet>
    );
  }

  if (result?.orderId) {
    const ref = result.orderId.slice(0, 8).toUpperCase();
    const msg = encodeURIComponent(`Hi, I would like to complete my order ${ref} for ${product.name} (${formatPrice(price)}).`);
    return (
      <Sheet product={product} onClose={onClose}>
        <h2 id="sheet-title">Order placed.</h2>
        <div className="sheet__price">
          {product.name} · {formatPrice(price)}
        </div>
        {CHECKOUT_ENABLED ? (
          <p>
            Your order number is <strong>{ref}</strong>. The payment was not completed. You can pay now, or later from your
            account.
          </p>
        ) : (
          <p>
            Your order number is <strong>{ref}</strong>. Complete the payment on WhatsApp and your download unlocks in your
            account as soon as it is confirmed.
          </p>
        )}
        {result.payError && <p className="form__error mt-s">{result.payError}</p>}
        <div className="sheet__actions">
          {CHECKOUT_ENABLED ? (
            <button className="btn btn--primary" onClick={() => pay(result)} disabled={busy}>
              {busy ? 'Please wait' : `Pay ${formatPrice(price)}`}
            </button>
          ) : (
            <a className="btn btn--primary" href={`${site.developer.whatsapp}?text=${msg}`} target="_blank" rel="noopener noreferrer">
              Complete payment
            </a>
          )}
          <Link className="btn btn--ghost" href="/account">
            Go to your account
          </Link>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet product={product} onClose={onClose}>
      <h2 id="sheet-title">{product.name}</h2>
      <div className="sheet__price">{formatPrice(price)}</div>
      <form className="form" onSubmit={submit} style={{ textAlign: 'left', marginTop: 8 }}>
        <input aria-label="Full name" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input aria-label="Phone number" placeholder="Phone number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        {result?.error && <p className="form__error">{result.error}</p>}
        <button className="btn btn--primary" type="submit" disabled={busy}>
          {busy ? 'Please wait' : `Continue · ${formatPrice(price)}`}
        </button>
      </form>
      <p className="small mt-s">Once paid, {product.name} stays in your account to download again on any device.</p>
    </Sheet>
  );
}
