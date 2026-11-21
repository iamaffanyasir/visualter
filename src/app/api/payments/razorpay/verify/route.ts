import { NextResponse, type NextRequest } from 'next/server';
import { markPaid, verifyPaymentSignature } from '@/lib/razorpay';
import { currentUser } from '@/lib/supabase/server';

/** Called by the browser right after Razorpay reports success. Trusts only the signature. */
export async function POST(request: NextRequest) {
  const { user } = await currentUser();
  if (!user) return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };
  const { razorpay_order_id: o, razorpay_payment_id: p, razorpay_signature: s } = body;
  if (!o || !p || !s || !verifyPaymentSignature(o, p, s)) {
    return NextResponse.json({ error: 'Payment could not be verified.' }, { status: 400 });
  }

  const result = await markPaid(o, p);
  if (!result.ok) return NextResponse.json({ error: 'Payment received but the order was not found. We will sort it out.' }, { status: 409 });
  return NextResponse.json({ paid: true, orderId: result.orderId });
}
