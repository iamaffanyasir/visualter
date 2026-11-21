'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** A random id kept in this browser so one device counts as one visitor. Not a cookie, nothing personal. */
function deviceId() {
  try {
    let id = localStorage.getItem('vz_device');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('vz_device', id);
    }
    return id;
  } catch {
    return '';
  }
}

/** Sends one anonymous page view per navigation. Respects Do Not Track. */
export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (navigator.doNotTrack === '1' || pathname.startsWith('/admin')) return;
    const body = JSON.stringify({ path: pathname, referrer: document.referrer, device: deviceId() });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    else fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
  }, [pathname]);

  // Add the anonymous device id to download and outbound links so they are counted per device too.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      const href = a?.getAttribute('href') ?? '';
      if (!a || !/^\/(api\/download|go)\//.test(href) || href.includes('d=') || navigator.doNotTrack === '1') return;
      const id = deviceId();
      if (id) a.setAttribute('href', `${href}${href.includes('?') ? '&' : '?'}d=${id}`);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
