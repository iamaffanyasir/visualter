'use client';

/**
 * Razorpay checkout in the browser. Turns on automatically when NEXT_PUBLIC_RAZORPAY_KEY_ID is set.
 * The amount is fixed on the server (/api/payments/razorpay/order) and every payment is verified on the
 * server (/api/payments/razorpay/verify), with the webhook as a backup.
 */
export const CHECKOUT_ENABLED = Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

export type CheckoutResult = 'paid' | 'dismissed' | 'failed';

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayInstance = { open: () => void; on: (event: string, cb: () => void) => void };
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

function loadScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Could not load Razorpay'));
    document.body.appendChild(s);
  });
}

export async function startCheckout(orderId: string): Promise<CheckoutResult> {
  await loadScript();
  const res = await fetch('/api/payments/razorpay/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  });
  const data = await res.json();
  if (res.status === 409 && data.status === 'paid') return 'paid';
  if (!res.ok) throw new Error(data.error ?? 'Could not start the payment.');

  return new Promise<CheckoutResult>((resolve) => {
    let settled = false;
    const done = (r: CheckoutResult) => {
      if (!settled) {
        settled = true;
        resolve(r);
      }
    };
    const rzp = new window.Razorpay!({
      key: data.keyId,
      order_id: data.razorpayOrderId,
      amount: data.amount,
      currency: 'INR',
      name: 'Visualter',
      description: data.product,
      image: `${window.location.origin}/android-chrome-192x192.png`,
      prefill: data.prefill,
      notes: { order_id: orderId },
      theme: { color: '#0071e3' },
      handler: async (r: RazorpayResponse) => {
        const v = await fetch('/api/payments/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(r),
        });
        done(v.ok ? 'paid' : 'failed');
      },
      modal: { ondismiss: () => done('dismissed') },
    });
    // A failed attempt keeps the Razorpay window open so the buyer can retry; we settle on close.
    rzp.on('payment.failed', () => undefined);
    rzp.open();
  });
}
