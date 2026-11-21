import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { actionLabel, byCategory, categories, getProduct, productHref, products, type Category } from '@/data/products';
import { site } from '@/data/site';
import { ActionButton } from './ActionButton';
import { AppIcon } from './AppIcon';
import { Gallery } from './Gallery';
import { Reveal } from './Reveal';

export const productParams = (category: Category) =>
  products.filter((p) => p.category === category).map((p) => ({ slug: p.slug }));

export function productMetadata(category: Category, slug: string): Metadata {
  const p = getProduct(slug);
  if (!p || p.category !== category) return {};
  return {
    title: `${p.name}: ${p.tagline.replace(/\.$/, '')}`,
    description: p.summary,
    openGraph: { title: p.name, description: p.summary, images: [{ url: p.shots[0]?.src ?? p.logo }] },
  };
}

export function ProductPage({ category, slug }: { category: Category; slug: string }) {
  const p = getProduct(slug);
  if (!p || p.category !== category) notFound();

  const heroShots = p.shots[0]?.landscape ? p.shots.slice(0, 1) : p.shots.slice(0, 3);
  const more = byCategory(category).filter((x) => x.slug !== p.slug).slice(0, 4);
  const style = { ['--accent' as string]: p.accent } as React.CSSProperties;

  return (
    <div style={style}>
      <section className="product-hero">
        <div className="container">
          <Reveal scale>
            <AppIcon src={p.logo} alt={`${p.name} icon`} dark={p.logoDark} />
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">{p.name}</p>
            <h1 className="headline">{p.tagline}</h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="lede">{p.summary}</p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <ActionButton product={p} autoOpen />
              {p.live && (
                <a className="link" href={p.live.href} target="_blank" rel="noopener noreferrer">
                  {p.live.label}
                </a>
              )}
            </div>
            <p className="product-hero__meta">
              {p.platform}
              {p.version ? ` · Version ${p.version}` : ''} · {actionLabel(p.action)}
            </p>
          </Reveal>
        </div>
        {heroShots.length ? (
          <Reveal className="showcase" delay={220}>
            {heroShots.map((s) => (
              <img key={s.src} src={s.src} alt={`${p.name} screenshot`} className={s.landscape ? 'wide' : 'phone'} />
            ))}
          </Reveal>
        ) : (
          <Reveal className="no-shots container" delay={220}>
            <AppIcon src={p.logo} alt="" dark={p.logoDark} />
            <p>Screenshots are on their way.</p>
          </Reveal>
        )}
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="lede" style={{ color: 'var(--ink)', fontWeight: 600, maxWidth: 820 }}>
              {p.intro}
            </p>
          </Reveal>
          <div className="features">
            {p.features.map((f, i) => (
              <Reveal key={f.title} className="feature" delay={(i % 2) * 90}>
                <div className="feature__dot" />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
          {p.slug === 'orbitx' && (
            <Reveal className="feature mt-l" style={{ background: 'var(--dark)', color: 'var(--dark-ink)' }}>
              <span id="companion" />
              <p className="eyebrow">Included</p>
              <h3 className="title">OrbitX Companion for Windows.</h3>
              <p style={{ color: 'var(--dark-muted)', marginTop: 10 }}>
                The companion runs in your tray, pairs with the app over your WiFi and carries out every action on your PC.
                It comes free with every OrbitX purchase.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {p.shots.length > 1 && (
        <section className="section--tight section--alt" aria-label="Screenshots">
          <div className="container">
            <Reveal>
              <h2 className="title">Take a closer look.</h2>
            </Reveal>
          </div>
          <div className="mt-m">
            <Gallery shots={p.shots} name={p.name} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container center">
          <Reveal>
            <AppIcon src={p.logo} alt="" dark={p.logoDark} size={84} className="mb-l icon--center" />
            <h2 className="headline" style={{ marginTop: -20 }}>
              Get {p.name}.
            </h2>
            <dl className="specs" style={{ textAlign: 'left' }}>
              <div>
                <dt>Platform</dt>
                <dd>{p.platform}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{actionLabel(p.action)}</dd>
              </div>
              {p.version && (
                <div>
                  <dt>Version</dt>
                  <dd>{p.version}</dd>
                </div>
              )}
              {p.action.type === 'download' && (
                <div>
                  <dt>Size</dt>
                  <dd>{p.action.size}</dd>
                </div>
              )}
              <div>
                <dt>Developer</dt>
                <dd>{site.developer.name}</dd>
              </div>
            </dl>
            <div className="cta-row mt-m">
              <ActionButton product={p} />
              <Link className="link" href="/contact">
                Ask a question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section--tight section--alt">
          <div className="container">
            <h2 className="title">More {categories[category].title.toLowerCase()}.</h2>
            <div className="chips mt-m" style={{ justifyContent: 'flex-start', gap: 26 }}>
              {more.map((m) => (
                <Link key={m.slug} href={productHref(m)} className="marquee__item" style={{ width: 'auto' }}>
                  <AppIcon src={m.logo} alt="" dark={m.logoDark} size={72} />
                  <span className="marquee__label" style={{ color: 'var(--ink)' }}>
                    {m.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
