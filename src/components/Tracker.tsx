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

  return null;
}
