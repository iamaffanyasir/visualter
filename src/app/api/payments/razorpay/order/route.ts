import { NextResponse, type NextRequest } from 'next/server';
import { getProduct } from '@/data/products';
import { createRazorpayOrder, razorpayKeyId, razorpayReady } from '@/lib/razorpay';
import { currentUser, supabaseAdmin } from '@/lib/supabase/server';

/** Razorpay prefills the mobile field only with a country code. Ten digit numbers are treated as Indian. */
function withCountryCode(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (phone.trim().startsWith('+')) return `+${digits}`;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  return phone;
}

/** Creates (or reuses) the Razorpay order for one of the customer's pending orders. */
export async function POST(request: NextRequest) {
  if (!razorpayReady) return NextResponse.json({ error: 'Online payment is not available yet.' }, { status: 503 });

  const { user, supabase } = await currentUser();
  if (!user) return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 });

  const { orderId } = (await request.json().catch(() => ({}))) as { orderId?: string };
  const { data: order } = await supabase
    .from('orders')
    .select('id, product_slug, amount_inr, status, buyer_name, buyer_phone, buyer_email, razorpay_order_id')
    .eq('id', String(orderId ?? ''))
    .maybeSingle();

  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  if (order.status !== 'pending') return NextResponse.json({ error: 'This order is already complete.', status: order.status }, { status: 409 });

  let rzpId = order.razorpay_order_id as string | null;
  if (!rzpId) {
    const rzp = await createRazorpayOrder({
      amountInr: order.amount_inr,
      receipt: order.id.slice(0, 40),
      notes: { order_id: order.id, product: order.product_slug },
    });
    rzpId = rzp.id;
    await supabaseAdmin().from('orders').update({ razorpay_order_id: rzpId }).eq('id', order.id);
  }

  return NextResponse.json({
    keyId: razorpayKeyId,
    razorpayOrderId: rzpId,
    amount: order.amount_inr * 100,
    product: getProduct(order.product_slug)?.name ?? order.product_slug,
    prefill: { name: order.buyer_name, email: order.buyer_email, contact: withCountryCode(order.buyer_phone) },
  });
}
