import { NextResponse, type NextRequest } from 'next/server';
import { markPaid, verifyWebhookSignature } from '@/lib/razorpay';

/**
 * Razorpay webhook. Add it in Dashboard > Settings > Webhooks with the events
 * payment.captured and order.paid, and put the same secret in RAZORPAY_WEBHOOK_SECRET.
 * It marks the order paid even if the buyer closed the tab before the browser confirmed.
 */
export async function POST(request: NextRequest) {
  const raw = await request.text();
  const signature = request.headers.get('x-razorpay-signature') ?? '';
  if (!verifyWebhookSignature(raw, signature)) return NextResponse.json({ error: 'bad signature' }, { status: 400 });

  const event = JSON.parse(raw) as {
    event: string;
    payload: { payment?: { entity: { id: string; order_id: string; amount: number; status: string } } };
  };

  if (event.event === 'payment.captured' || event.event === 'order.paid') {
    const pay = event.payload.payment?.entity;
    if (pay?.order_id) await markPaid(pay.order_id, pay.id, pay.amount);
  }
  // Always answer 200 for valid calls so Razorpay does not keep retrying events we do not use.
  return NextResponse.json({ received: true });
}
