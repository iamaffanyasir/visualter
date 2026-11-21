'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AppIcon } from './AppIcon';
import { useOwned } from '@/lib/useOwned';

export type MarqueeItem = {
  key: string;
  name: string;
  meta: string;
  /** Shown instead of meta when the signed in customer owns the product. */
  ownedMeta?: string;
  slug?: string;
  text: string;
  logo: string;
  logoDark?: boolean;
  shots: { src: string; landscape?: boolean }[];
  href: string;
  visit?: string;
  visitLabel?: string;
};

type Active = { item: MarqueeItem; rect: DOMRect };

const PEEK_W = 420;
const PEEK_H = 400;

export function LogoMarquee({ rows }: { rows: MarqueeItem[][] }) {
  const router = useRouter();
  const [active, setActive] = useState<Active | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const touch = useRef(false);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 220);
  }, []);

  useEffect(() => {
    if (!active) return;
    const close = () => setActive(null);
    const outside = (e: PointerEvent) => {
      const t = e.target as Element;
      if (!t.closest('.peek') && !t.closest('.marquee__item')) close();
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', esc);
    };
  }, [active]);

  const open = (item: MarqueeItem, el: HTMLElement) => {
    cancelClose();
    setActive({ item, rect: el.getBoundingClientRect() });
  };

  const go = (item: MarqueeItem) => {
    if (item.href.startsWith('http')) window.open(item.href, '_blank', 'noopener,noreferrer');
    else router.push(item.href);
  };

  return (
    <div className="marquee-wrap" onPointerDown={(e) => (touch.current = e.pointerType !== 'mouse')}>
      {rows.map((row, r) => (
        <div
          key={r}
          className={`marquee ${r % 2 ? 'marquee--reverse' : ''} ${active ? 'marquee--paused' : ''}`}
          style={{ ['--dur' as string]: `${row.length * 4.5}s` }}
        >
          <div className="marquee__track">
            {[...row, ...row].map((item, i) => (
              <button
                key={`${item.key}-${i}`}
                className={`marquee__item ${active?.item.key === item.key ? 'marquee__item--active' : ''}`}
                aria-label={item.name}
                aria-hidden={i >= row.length ? true : undefined}
                tabIndex={i >= row.length ? -1 : 0}
                onMouseEnter={(e) => !touch.current && open(item, e.currentTarget)}
                onMouseLeave={scheduleClose}
                onFocus={(e) => open(item, e.currentTarget)}
                onBlur={scheduleClose}
                onClick={(e) => {
                  if (touch.current && active?.item.key !== item.key) {
                    open(item, e.currentTarget);
                    return;
                  }
                  go(item);
                }}
              >
                <AppIcon src={item.logo} alt="" dark={item.logoDark} />
              </button>
            ))}
          </div>
        </div>
      ))}
      {active && <Peek active={active} onEnter={cancelClose} onLeave={scheduleClose} onClose={() => setActive(null)} />}
    </div>
  );
}

function Peek({ active, onEnter, onLeave, onClose }: { active: Active; onEnter: () => void; onLeave: () => void; onClose: () => void }) {
  const { item, rect } = active;
  const vw = window.innerWidth;
  const w = Math.min(PEEK_W, vw - 32);
  const cx = rect.left + rect.width / 2;
  const left = Math.max(16, Math.min(cx - w / 2, vw - w - 16));
  const above = rect.top > PEEK_H + 24;
  const internal = !item.href.startsWith('http');
  const owned = useOwned();

  return createPortal(
    <div
      className="peek"
      role="dialog"
      aria-label={item.name}
      style={{
        left,
        ...(above ? { bottom: window.innerHeight - rect.top + 12 } : { top: rect.bottom + 12 }),
        width: w,
        ['--ox' as string]: `${cx - left}px`,
        ['--oy' as string]: above ? '100%' : '0%',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="peek__head">
        <AppIcon src={item.logo} alt="" dark={item.logoDark} />
        <div>
          <div className="peek__name">{item.name}</div>
          <div className="peek__meta">{item.slug && item.ownedMeta && owned?.has(item.slug) ? item.ownedMeta : item.meta}</div>
        </div>
      </div>
      {item.shots.length ? (
        <div className="peek__shots">
          {item.shots.slice(0, 4).map((s) => (
            <img key={s.src} src={s.src} alt={`${item.name} screenshot`} />
          ))}
        </div>
      ) : (
        <div className="peek__empty">Screenshots coming soon</div>
      )}
      <p className="peek__text">{item.text}</p>
      <div className="peek__actions">
        {internal && (
          <a className="btn btn--primary btn--sm" href={item.href}>
            Learn more
          </a>
        )}
        {item.visit && (
          <a className={`btn btn--sm ${internal ? 'btn--ghost' : 'btn--primary'}`} href={item.visit} target="_blank" rel="noopener noreferrer">
            Visit {item.visitLabel ?? 'site'}
          </a>
        )}
        <button className="btn btn--sm" style={{ marginLeft: 'auto', background: 'var(--bg-alt)' }} onClick={onClose} aria-label="Close preview">
          Close
        </button>
      </div>
    </div>,
    document.body,
  );
}
