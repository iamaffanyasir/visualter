import type { MarqueeItem } from '@/components/LogoMarquee';
import { actionLabel, productHref, products, work, workKinds } from '@/data/products';

export function marqueeRows(): MarqueeItem[][] {
  const productRow: MarqueeItem[] = products.map((p) => ({
    key: `p-${p.slug}`,
    name: p.name,
    meta: `${p.platform} · ${actionLabel(p.action)}`,
    ownedMeta: p.action.type === 'buy' ? `${p.platform} · Purchased` : undefined,
    slug: p.slug,
    text: p.summary,
    logo: p.logo,
    logoDark: p.logoDark,
    shots: p.shots,
    href: productHref(p),
    visit: p.live ? `/go/${p.slug}?t=live` : p.action.type === 'play' ? `/go/${p.slug}?t=play` : undefined,
    visitLabel: p.live ? 'site' : p.action.type === 'play' ? 'Google Play' : undefined,
  }));

  const workRow: MarqueeItem[] = work
    .filter((w) => w.slug !== 'labos')
    .map((w) => ({
      key: `w-${w.slug}`,
      name: w.name,
      meta: `${workKinds[w.kind].replace(/s$/, '')} · ${w.urlLabel ?? 'Not yet live'}`,
      text: w.summary,
      logo: w.logo ?? '/logos/cmanager.webp',
      logoDark: w.logoDark,
      shots: w.shots,
      href: w.url ? `/go/${w.slug}?t=work` : '/work',
      visit: w.url ? `/go/${w.slug}?t=work` : undefined,
      visitLabel: 'site',
    }));

  return [productRow, workRow];
}
