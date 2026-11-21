'use client';

import { useState } from 'react';
import { products, type Category } from '@/data/products';
import { ProductCard } from './ProductCard';

const filters: { key: 'all' | Category | 'free' | 'paid'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'apps', label: 'Apps' },
  { key: 'software', label: 'Software' },
  { key: 'hardware', label: 'Hardware' },
  { key: 'free', label: 'Free' },
  { key: 'paid', label: 'Paid' },
];

export function StoreGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]['key']>('all');

  const list = products.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'free') return p.action.type === 'download' || p.action.type === 'play';
    if (filter === 'paid') return p.action.type === 'buy';
    return p.category === filter || p.alsoIn === filter;
  });

  return (
    <>
      <div className="chips" role="tablist" aria-label="Filter products">
        {filters.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`chip ${filter === f.key ? 'chip--on' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
