import { createHash } from 'node:crypto';
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseEnabled } from '@/lib/supabase/config';
import { supabaseAdmin } from '@/lib/supabase/server';

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor|curl|wget|python|axios/i;
const SALT = process.env.TRACKING_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || 'visualter';

/** Records one page view. Stores no IP and sets no cookie: the visitor id is a hash that changes daily. */
export async function POST(request: NextRequest) {
  if (!supabaseEnabled || !process.env.SUPABASE_SERVICE_ROLE_KEY) return new NextResponse(null, { status: 204 });

  const ua = request.headers.get('user-agent') ?? '';
  if (!ua || BOT.test(ua)) return new NextResponse(null, { status: 204 });

  const body = (await request.json().catch(() => ({}))) as { path?: string; referrer?: string };
  const path = String(body.path ?? '/').split('?')[0].slice(0, 200);
  if (!path.startsWith('/') || /^\/(admin|api|auth)/.test(path)) return new NextResponse(null, { status: 204 });

  let referrer: string | null = null;
  try {
    const host = new URL(String(body.referrer ?? '')).hostname.replace(/^www\./, '');
    const own = request.nextUrl.hostname.replace(/^www\./, '');
    if (host && host !== own) referrer = host;
  } catch {}

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || request.headers.get('x-real-ip') || '';
  const day = new Date().toISOString().slice(0, 10);
  const visitor = createHash('sha256').update(`${SALT}|${day}|${ip}|${ua}`).digest('hex').slice(0, 20);
  const device = /ipad|tablet/i.test(ua) ? 'Tablet' : /mobi|android|iphone/i.test(ua) ? 'Mobile' : 'Desktop';
  const country = request.headers.get('x-vercel-ip-country');

  await supabaseAdmin().from('page_views').insert({ path, referrer, country, device, visitor });
  return new NextResponse(null, { status: 204 });
}
