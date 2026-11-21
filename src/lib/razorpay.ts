import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { supabaseAdmin } from './supabase/server';

const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? '';
const keySecret = process.env.RAZORPAY_KEY_SECRET ?? '';
const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET ?? '';

export const razorpayReady = Boolean(keyId && keySecret);
export const razorpayKeyId = keyId;

const auth = () => 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');

export async function createRazorpayOrder(input: { amountInr: number; receipt: string; notes: Record<string, string> }) {
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { Authorization: auth(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: input.amountInr * 100, currency: 'INR', receipt: input.receipt, notes: input.notes }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Razorpay order failed: ${res.status} ${await res.text()}`);
  return (await res.json()) as { id: string; amount: number; currency: string };
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Signature sent to the browser after a successful payment. */
export function verifyPaymentSignature(razorpayOrderId: string, paymentId: string, signature: string) {
  const expected = createHmac('sha256', keySecret).update(`${razorpayOrderId}|${paymentId}`).digest('hex');
  return safeEqual(expected, signature);
}

/** Signature on webhook calls, computed over the raw request body. */
export function verifyWebhookSignature(rawBody: string, signature: string) {
  if (!webhookSecret) return false;
  const expected = createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
  return safeEqual(expected, signature);
}

/** Marks the order linked to a Razorpay order as paid. Safe to call more than once. */
export async function markPaid(razorpayOrderId: string, paymentId: string, amountPaise?: number) {
  const db = supabaseAdmin();
  const { data: order } = await db
    .from('orders')
    .select('id, amount_inr, status')
    .eq('razorpay_order_id', razorpayOrderId)
    .maybeSingle();
  if (!order) return { ok: false as const, reason: 'unknown order' };
  if (order.status === 'paid') return { ok: true as const, orderId: order.id };
  if (amountPaise !== undefined && amountPaise !== order.amount_inr * 100) return { ok: false as const, reason: 'amount mismatch' };

  await db
    .from('orders')
    .update({ status: 'paid', paid_at: new Date().toISOString(), payment_provider: 'razorpay', payment_ref: paymentId })
    .eq('id', order.id)
    .eq('status', 'pending');
  return { ok: true as const, orderId: order.id };
}
