import { createHash } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { getProduct } from '@/data/products';
import { supabaseEnabled } from '@/lib/supabase/config';
import { currentUser, supabaseAdmin } from '@/lib/supabase/server';

const clean = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

/** Saves a contact form message or product enquiry. Only the admin dashboard can read them. */
export async function POST(request: NextRequest) {
  if (!supabaseEnabled || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Messages are not available right now. Please email us instead.' }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  // Hidden field that people never fill in. Bots usually do: pretend it worked.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 30);
  const subject = clean(body.subject, 200);
  const message = clean(body.message, 5000);
  const product = getProduct(clean(body.about, 60));

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || subject.length < 2 || message.length < 5) {
    return NextResponse.json({ error: 'Please fill in your name, a valid email, a subject and your message.' }, { status: 400 });
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || request.headers.get('x-real-ip') || '';
  const sender = createHash('sha256').update(`${process.env.SUPABASE_SERVICE_ROLE_KEY}|${ip}|${request.headers.get('user-agent')}`).digest('hex').slice(0, 24);
  const db = supabaseAdmin();

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db.from('enquiries').select('id', { count: 'exact', head: true }).eq('sender_hash', sender).gte('created_at', since);
  if ((count ?? 0) >= 5) return NextResponse.json({ error: 'You have sent several messages already. We will reply soon.' }, { status: 429 });

  const { user } = await currentUser().catch(() => ({ user: null }));
  const { error } = await db.from('enquiries').insert({
    name,
    email,
    phone: phone || null,
    subject,
    message,
    product_slug: product?.slug ?? null,
    user_id: user?.id ?? null,
    sender_hash: sender,
  });
  if (error) return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
