'use client';

import { actionLabel, type Product } from '@/data/products';
import { useIsOwned } from '@/lib/useOwned';

/** The product's price, or "Purchased" once the signed in customer owns it. */
export function PriceLabel({ product, className = '' }: { product: Product; className?: string }) {
  const owned = useIsOwned(product.slug);
  if (owned && product.action.type === 'buy') {
    return <span className={`${className} purchased`}>Purchased</span>;
  }
  return <span className={className}>{actionLabel(product.action)}</span>;
}
