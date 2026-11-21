import { NextResponse, type NextRequest } from 'next/server';
import { getProduct } from '@/data/products';
import { supabaseEnabled } from '@/lib/supabase/config';
import { currentUser } from '@/lib/supabase/server';

/** Creates a pending order for the signed in customer. The price always comes from the server. */
export async function POST(request: NextRequest) {
  if (!supabaseEnabled) return NextResponse.json({ error: 'Accounts are not set up yet.' }, { status: 503 });

  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { slug?: string; name?: string; phone?: string };
  const product = getProduct(String(body.slug ?? ''));
  if (!product || product.action.type !== 'buy') return NextResponse.json({ error: 'This product cannot be bought online.' }, { status: 400 });

  const name = String(body.name ?? '').trim().slice(0, 120);
  const phone = String(body.phone ?? '').trim().slice(0, 30);
  if (name.length < 2 || phone.replace(/\D/g, '').length < 8) {
    return NextResponse.json({ error: 'Please enter your full name and a valid phone number.' }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from('orders')
    .select('id, status')
    .eq('product_slug', product.slug)
    .in('status', ['paid', 'pending'])
    .order('created_at', { ascending: false });

  if (existing?.some((o) => o.status === 'paid')) return NextResponse.json({ owned: true });
  const pending = existing?.find((o) => o.status === 'pending');
  if (pending) return NextResponse.json({ orderId: pending.id, status: 'pending' });

  await supabase.from('profiles').update({ full_name: name, phone, updated_at: new Date().toISOString() }).eq('id', user.id);

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      product_slug: product.slug,
      amount_inr: product.action.price,
      buyer_name: name,
      buyer_phone: phone,
      buyer_email: user.email ?? '',
    })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: 'Could not place the order. Please try again.' }, { status: 500 });
  return NextResponse.json({ orderId: data.id, status: 'pending' });
}
