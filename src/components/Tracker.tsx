'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Sends one anonymous page view per navigation. Respects Do Not Track. */
export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (navigator.doNotTrack === '1' || pathname.startsWith('/admin')) return;
    const body = JSON.stringify({ path: pathname, referrer: document.referrer });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    else fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
  }, [pathname]);

  return null;
}
