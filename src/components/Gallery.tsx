'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Shot } from '@/data/products';

/** Horizontal screenshot rail with arrow buttons, mouse drag and keyboard support. */
export function Gallery({ shots, name }: { shots: Shot[]; name: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = rail.current;
    if (!el) return;
    // Images give the rail its width only once they load, so measure again as each one arrives.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.querySelectorAll('img').forEach((img) => ro.observe(img));
    window.addEventListener('load', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('img');
    const amount = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <div className="gallery-wrap">
      <div
        ref={rail}
        className="gallery"
        tabIndex={0}
        aria-label={`${name} screenshots`}
        onScroll={update}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse' || !rail.current) return;
          drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false };
          rail.current.classList.add('gallery--drag');
        }}
        onPointerMove={(e) => {
          if (!drag.current || !rail.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 4) drag.current.moved = true;
          rail.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          drag.current = null;
          rail.current?.classList.remove('gallery--drag');
        }}
        onPointerLeave={() => {
          drag.current = null;
          rail.current?.classList.remove('gallery--drag');
        }}
      >
        {shots.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={`${name} screenshot ${i + 1}`}
            decoding="async"
            draggable={false}
            onLoad={update}
            className={s.landscape ? 'wide' : ''}
          />
        ))}
      </div>
      <div className="gallery__controls container">
        <button className="gallery__btn" aria-label="Previous screenshot" disabled={edges.start} onClick={() => step(-1)}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button className="gallery__btn" aria-label="Next screenshot" disabled={edges.end} onClick={() => step(1)}>
          <svg viewBox="0 0 24 24" aria-hidden>
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
