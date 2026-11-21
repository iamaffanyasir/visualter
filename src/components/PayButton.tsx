'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CHECKOUT_ENABLED, startCheckout } from '@/lib/checkout';

/** Pay for a pending order from the account page. Falls back to WhatsApp until Razorpay is configured. */
export function PayButton({ orderId, label, whatsapp }: { orderId: string; label: string; whatsapp: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!CHECKOUT_ENABLED) {
    return (
      <a className="btn btn--ghost btn--sm" href={whatsapp} target="_blank" rel="noopener noreferrer">
        Complete payment
      </a>
    );
  }

  return (
    <span style={{ display: 'grid', justifyItems: 'end', gap: 4 }}>
      <button
        className="btn btn--primary btn--sm"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError('');
          try {
            const r = await startCheckout(orderId);
            if (r === 'paid') router.refresh();
            if (r === 'failed') setError('Payment did not go through.');
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Could not start the payment.');
          }
          setBusy(false);
        }}
      >
        {busy ? 'Please wait' : label}
      </button>
      {error && <span className="form__error">{error}</span>}
    </span>
  );
}
