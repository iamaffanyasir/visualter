import { NextResponse, type NextRequest } from 'next/server';
import { getProduct, work } from '@/data/products';
import { logEvent } from '@/lib/events';
import { supabaseEnabled } from '@/lib/supabase/config';
import { currentUser } from '@/lib/supabase/server';

type Ctx = { params: Promise<{ slug: string }> };

/**
 * Counts an outbound click, then sends the visitor on.
 * /go/<slug>?t=play | subscribe | live   for products
 * /go/<slug>?t=work                      for client websites
 * Only addresses already listed in src/data/products.ts are allowed, so this cannot be used as an open redirect.
 */
export async function GET(request: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const t = request.nextUrl.searchParams.get('t') ?? '';
  let to: string | undefined;

  if (t === 'work') to = work.find((w) => w.slug === slug)?.url;
  else {
    const p = getProduct(slug);
    if (p && t === 'live') to = p.live?.href;
    if (p && (t === 'play' || t === 'subscribe') && (p.action.type === 'play' || p.action.type === 'subscribe')) to = p.action.href;
  }
  if (!to) return NextResponse.redirect(new URL('/', request.url));

  const { user } = supabaseEnabled ? await currentUser().catch(() => ({ user: null })) : { user: null };
  await logEvent(request, { kind: 'click', slug: t === 'work' ? `work:${slug}` : slug, target: `${t} ${new URL(to).hostname}`, userId: user?.id });
  return NextResponse.redirect(to);
}
