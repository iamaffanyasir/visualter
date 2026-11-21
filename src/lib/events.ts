import 'server-only';
import { createHash } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { supabaseEnabled } from './supabase/config';
import { supabaseAdmin } from './supabase/server';

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|monitor|curl|wget|python|axios|facebookexternalhit|whatsapp/i;
const SALT = process.env.TRACKING_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || 'visualter';

export const isBot = (request: NextRequest) => {
  const ua = request.headers.get('user-agent') ?? '';
  return !ua || BOT.test(ua);
};

/** One way visitor hash: the browser's random device id when present, otherwise a daily hash. No IP is stored. */
export function visitorHash(request: NextRequest, deviceId?: string | null) {
  const ua = request.headers.get('user-agent') ?? '';
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || request.headers.get('x-real-ip') || '';
  const day = new Date().toISOString().slice(0, 10);
  const key = deviceId && /^[0-9a-f-]{36}$/i.test(deviceId) ? `device|${deviceId}` : `day|${day}|${ip}|${ua}`;
  return createHash('sha256').update(`${SALT}|${key}`).digest('hex').slice(0, 20);
}

export function deviceType(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';
  return /ipad|tablet/i.test(ua) ? 'Tablet' : /mobi|android|iphone/i.test(ua) ? 'Mobile' : 'Desktop';
}

/** Records a download or outbound click. Never throws, so it can never block the visitor. */
export async function logEvent(
  request: NextRequest,
  e: { kind: 'download' | 'click'; slug: string; target?: string; paid?: boolean; userId?: string | null },
) {
  if (!supabaseEnabled || !process.env.SUPABASE_SERVICE_ROLE_KEY || isBot(request)) return;
  try {
    await supabaseAdmin()
      .from('events')
      .insert({
        kind: e.kind,
        product_slug: e.slug,
        target: e.target ?? null,
        paid: !!e.paid,
        user_id: e.userId ?? null,
        visitor: visitorHash(request, request.nextUrl.searchParams.get('d')),
        device: deviceType(request),
        country: request.headers.get('x-vercel-ip-country'),
      });
  } catch {
    // Analytics must never break a download.
  }
}
