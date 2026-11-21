import Link from 'next/link';
import { byCategory, categories, productHref, type Category } from '@/data/products';
import { AppIcon } from './AppIcon';
import { ProductCard } from './ProductCard';
import { Reveal } from './Reveal';

export function CategoryPage({ category }: { category: Category }) {
  const c = categories[category];
  const list = byCategory(category);
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{c.title}</p>
            <h1 className="display">{c.headline}</h1>
            <p className="lede">{c.text}</p>
          </Reveal>
          <Reveal delay={120} className="chips mt-l" style={{ gap: 22 }}>
            {list.map((p) => (
              <Link key={p.slug} href={productHref(p)} className="marquee__item" style={{ width: 'auto' }}>
                <AppIcon src={p.logo} alt="" dark={p.logoDark} size={64} />
                <span className="marquee__label" style={{ color: 'var(--ink)' }}>
                  {p.name}
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
      <section className="section--tight">
        <div className="container container--wide">
          <div className="grid">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
