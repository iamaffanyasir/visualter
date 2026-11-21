'use client';

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  scale?: boolean;
  style?: CSSProperties;
};

/** Fades and lifts its children into view the first time they scroll on screen. */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0, scale = false, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${scale ? 'reveal--scale' : ''} ${className}`}
      style={{ ...style, ['--d' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
