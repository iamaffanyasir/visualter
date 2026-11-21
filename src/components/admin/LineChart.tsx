'use client';

import { useId, useState } from 'react';

export type Series = { key: string; label: string; color: string };
export type Point = { day: string } & Record<string, number | string>;

const W = 760;
const H = 240;
const PAD = { top: 14, right: 14, bottom: 28, left: 44 };

const fmtDay = (d: string) => new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

function niceTop(max: number) {
  if (max <= 4) return 4;
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / step;
  return (n <= 2 ? 2 : n <= 5 ? 5 : 10) * step;
}

/** Smooth path through the points (monotone style Catmull Rom, clamped to stay above the baseline). */
function smooth(pts: [number, number][], base: number) {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]},${pts[0][1]}` : '';
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1y = Math.min(base, p1[1] + (p2[1] - p0[1]) / 6);
    const c2y = Math.min(base, p2[1] - (p3[1] - p1[1]) / 6);
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${c1y} ${p2[0] - (p3[0] - p1[0]) / 6},${c2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * Line and area chart for daily metrics. First series is filled, the rest are lines.
 * Crosshair tooltip on hover, a legend for two or more series, and a table view.
 */
export function LineChart({
  data,
  series,
  title,
  unit = 'number',
}: {
  data: Point[];
  series: Series[];
  title: string;
  unit?: 'number' | 'rupees';
}) {
  const format = (v: number) =>
    unit === 'rupees' ? (v >= 1000 ? `₹${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k` : `₹${Math.round(v)}`) : String(Math.round(v * 10) / 10);
  const id = useId().replace(/:/g, '');
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(0, ...data.flatMap((d) => series.map((s) => Number(d[s.key]) || 0)));
  const top = niceTop(max);
  const iw = W - PAD.left - PAD.right;
  const ih = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (data.length <= 1 ? iw / 2 : (i / (data.length - 1)) * iw);
  const y = (v: number) => PAD.top + ih - (v / top) * ih;
  const base = y(0);
  const ticks = [0, top / 2, top];
  const labelEvery = Math.max(1, Math.ceil(data.length / 6));
  const lines = series.map((s) => {
    const pts = data.map((d, i) => [x(i), y(Number(d[s.key]) || 0)] as [number, number]);
    return { ...s, pts, path: smooth(pts, base) };
  });
  const first = lines[0];
  const area = first && first.pts.length ? `${first.path} L${x(data.length - 1)},${base} L${x(0)},${base} Z` : '';
  const h = hover !== null ? data[hover] : null;

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - r.left) / r.width;
    setHover(Math.max(0, Math.min(data.length - 1, Math.round(rel * (data.length - 1)))));
  };

  return (
    <div className="chart">
      {series.length > 1 && (
        <div className="chart__legend">
          {series.map((s) => (
            <span key={s.key}>
              <i style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
      <div className="chart__plot" onMouseLeave={() => setHover(null)}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title}, last ${data.length} days`}>
          <defs>
            <linearGradient id={`fill${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={first?.color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={first?.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="chart__grid" />
              <text x={PAD.left - 10} y={y(t) + 4} className="chart__tick" textAnchor="end">
                {format(t)}
              </text>
            </g>
          ))}
          {data.map((d, i) =>
            i % labelEvery === 0 || i === data.length - 1 ? (
              <text key={d.day} x={x(i)} y={H - 8} className="chart__tick" textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}>
                {fmtDay(d.day)}
              </text>
            ) : null,
          )}
          {area && <path d={area} fill={`url(#fill${id})`} />}
          {lines.map((l) => (
            <path key={l.key} d={l.path} fill="none" stroke={l.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          ))}
          {hover !== null && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={base} className="chart__cross" />
              {lines.map((l) => (
                <circle key={l.key} cx={l.pts[hover][0]} cy={l.pts[hover][1]} r={4.5} fill={l.color} stroke="#fff" strokeWidth={2} />
              ))}
            </g>
          )}
          <line x1={PAD.left} x2={W - PAD.right} y1={base} y2={base} className="chart__axis" />
          <rect x={PAD.left} y={PAD.top} width={iw} height={ih} fill="transparent" onPointerMove={onMove} onPointerDown={onMove} />
        </svg>
        {h && hover !== null && (
          <div className="chart__tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
            <strong>{fmtDay(h.day)}</strong>
            {series.map((s) => (
              <span key={s.key} className="chart__tip-row">
                <i style={{ background: s.color }} />
                {format(Number(h[s.key]) || 0)} {s.label.toLowerCase()}
              </span>
            ))}
          </div>
        )}
      </div>
      <details className="chart__table">
        <summary>Show as table</summary>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              {series.map((s) => (
                <th key={s.key}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...data].reverse().map((d) => (
              <tr key={d.day}>
                <td>{fmtDay(d.day)}</td>
                {series.map((s) => (
                  <td key={s.key}>{format(Number(d[s.key]) || 0)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
