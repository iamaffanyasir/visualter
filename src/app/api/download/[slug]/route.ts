import { NextResponse, type NextRequest } from 'next/server';
import { getProduct, productFiles } from '@/data/products';
import { logEvent } from '@/lib/events';
import { signedFileUrl } from '@/lib/files';
import { supabaseEnabled } from '@/lib/supabase/config';
import { currentUser } from '@/lib/supabase/server';

type Ctx = { params: Promise<{ slug: string }> };

/** Every download goes through here so it can be counted. Paid files also need a paid order. */
export async function GET(request: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (product.action.type === 'download') {
    const { user } = supabaseEnabled ? await currentUser().catch(() => ({ user: null })) : { user: null };
    await logEvent(request, { kind: 'download', slug, target: product.action.href.split('/').pop(), userId: user?.id });
    return NextResponse.redirect(new URL(product.action.href, request.url));
  }

  const files = productFiles[slug] ?? [];
  const file = files[Number(request.nextUrl.searchParams.get('file') ?? 0)];
  if (!supabaseEnabled || !file) return NextResponse.json({ error: 'This download is not available.' }, { status: 404 });

  const { supabase, user } = await currentUser();
  if (!user) {
    const login = new URL('/login', request.url);
    login.searchParams.set('next', '/account');
    return NextResponse.redirect(login);
  }

  const { data: paid } = await supabase.from('orders').select('id').eq('product_slug', slug).eq('status', 'paid').limit(1);
  if (!paid?.length) return NextResponse.json({ error: 'You have not bought this product yet.' }, { status: 403 });

  const url = await signedFileUrl(file.path);
  if (!url) return NextResponse.json({ error: 'The file is being prepared. Please try again shortly.' }, { status: 503 });
  await logEvent(request, { kind: 'download', slug, target: file.path.split('/').pop(), paid: true, userId: user.id });
  return NextResponse.redirect(url);
}
