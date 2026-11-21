'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/data/site';
import { supabaseEnabled } from '@/lib/supabase/config';

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main">
      <div className="container nav__inner">
        <Link href="/" className="nav__brand" aria-label="Visualter home">
          <img src="/brand/mark.svg" alt="Visualter" width={34} height={34} />
        </Link>
        <ul className="nav__links">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-current={pathname.startsWith(item.href) ? 'page' : undefined}>
                {item.label}
              </Link>
            </li>
          ))}
          {supabaseEnabled && (
            <li className="nav__account">
              <Link href="/account" aria-label="Your account" aria-current={pathname.startsWith('/account') ? 'page' : undefined}>
                <svg viewBox="0 0 24 24" aria-hidden>
                  <circle cx="12" cy="8.5" r="3.6" />
                  <path d="M4.8 19.6a7.4 7.4 0 0 1 14.4 0" />
                </svg>
                <span>Account</span>
              </Link>
            </li>
          )}
        </ul>
        <button
          className="nav__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
