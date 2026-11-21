'use client';

import { useState } from 'react';

export type Day = { day: string; views: number; visitors: number };

const W = 720;
const H = 220;
const PAD = { top: 12, right: 8, bottom: 26, left: 36 };

const fmtDay = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

/** Daily page views as thin bars, with a hover tooltip and a table fallback. */
type Labels = { main: string; extra: string; title: string };
const DEFAULT_LABELS: Labels = { main: 'page views', extra: 'unique devices', title: 'Page views per day' };

export function TrafficChart({ data, labels = DEFAULT_LABELS }: { data: Day[]; labels?: Labels }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(4, ...data.map((d) => d.views));
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  const top = Math.ceil(max / step) * step;
  const ticks = [0, top / 2, top];
  const iw = W - PAD.left - PAD.right;
  const ih = H - PAD.top - PAD.bottom;
  const slot = iw / data.length;
  const bw = Math.max(3, Math.min(18, slot - 2));
  const y = (v: number) => PAD.top + ih - (v / top) * ih;
  const labelEvery = Math.ceil(data.length / 6);
  const h = hover !== null ? data[hover] : null;

  return (
    <div className="chart">
      <div className="chart__plot" onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${labels.title} for the last ${data.length} days`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="chart__grid" />
              <text x={PAD.left - 8} y={y(t) + 4} className="chart__tick" textAnchor="end">
                {t}
              </text>
            </g>
          ))}
          {data.map((d, i) => {
            const x = PAD.left + i * slot + (slot - bw) / 2;
            const bh = Math.max(d.views ? 2 : 0, y(0) - y(d.views));
            const r = Math.min(4, bw / 2, bh);
            const yt = y(0) - bh;
            return (
              <g key={d.day}>
                {bh > 0 && (
                  <path
                    className={`chart__bar ${hover === i ? 'chart__bar--on' : ''}`}
                    d={`M${x},${y(0)} V${yt + r} Q${x},${yt} ${x + r},${yt} H${x + bw - r} Q${x + bw},${yt} ${x + bw},${yt + r} V${y(0)} Z`}
                  />
                )}
                {i % labelEvery === 0 && (
                  <text x={x + bw / 2} y={H - 8} className="chart__tick" textAnchor="middle">
                    {fmtDay(d.day)}
                  </text>
                )}
                <rect
                  x={PAD.left + i * slot}
                  y={PAD.top}
                  width={slot}
                  height={ih}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  tabIndex={0}
                  aria-label={`${fmtDay(d.day)}: ${d.views} ${labels.main}, ${d.visitors} ${labels.extra}`}
                />
              </g>
            );
          })}
          <line x1={PAD.left} x2={W - PAD.right} y1={y(0)} y2={y(0)} className="chart__axis" />
        </svg>
        {h && hover !== null && (
          <div className="chart__tip" style={{ left: `${((PAD.left + hover * slot + slot / 2) / W) * 100}%` }}>
            <strong>{fmtDay(h.day)}</strong>
            <span>
              {h.views} {labels.main}
            </span>
            <span>
              {h.visitors} {labels.extra}
            </span>
          </div>
        )}
      </div>
      <details className="chart__table">
        <summary>Show as table</summary>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th style={{ textTransform: 'capitalize' }}>{labels.main}</th>
              <th style={{ textTransform: 'capitalize' }}>{labels.extra}</th>
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((d) => (
              <tr key={d.day}>
                <td>{fmtDay(d.day)}</td>
                <td>{d.views}</td>
                <td>{d.visitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

/** Ranked list with proportional bars. Values stay in ink, the bar carries the magnitude. */
export function BarList({ items, empty = 'No data yet' }: { items: { label: string; n: number }[]; empty?: string }) {
  if (!items.length) return <p className="muted small">{empty}</p>;
  const max = Math.max(...items.map((i) => i.n));
  return (
    <ul className="barlist">
      {items.map((i) => (
        <li key={i.label} title={`${i.label}: ${i.n}`}>
          <span className="barlist__bar" style={{ width: `${(i.n / max) * 100}%` }} />
          <span className="barlist__label">{i.label}</span>
          <span className="barlist__n">{i.n}</span>
        </li>
      ))}
    </ul>
  );
}
