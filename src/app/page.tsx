import Link from 'next/link';
import { Reveal } from '@/components/Reveal';
import { AppIcon } from '@/components/AppIcon';
import { ActionButton } from '@/components/ActionButton';
import { LogoMarquee } from '@/components/LogoMarquee';
import { getProduct, productHref, products, work, type Product } from '@/data/products';
import { marqueeRows } from '@/lib/marquee';
import { site } from '@/data/site';

export const metadata = { alternates: { canonical: '/' } };

function Tile({ slug, dark, white }: { slug: string; dark?: boolean; white?: boolean }) {
  const p = getProduct(slug) as Product;
  const shots = p.shots[0]?.landscape ? p.shots.slice(0, 1) : p.shots.slice(0, 3);
  return (
    <Reveal className={`tile ${dark ? 'tile--dark' : ''} ${white ? 'tile--white' : ''}`}>
      <AppIcon src={p.logo} alt="" dark={p.logoDark} />
      <h2 className="tile__name">{p.name}</h2>
      <p className="tile__tag">{p.tagline}</p>
      <div className="cta-row" style={{ justifyContent: 'center' }}>
        <ActionButton product={p} />
        <Link className="link" href={productHref(p)}>
          Learn more
        </Link>
      </div>
      <div className="tile__media">
        {shots.map((s) => (
          <img key={s.src} src={s.src} alt={`${p.name} screenshot`} loading="lazy" decoding="async" className={s.landscape ? 'wide' : 'phone'} />
        ))}
      </div>
    </Reveal>
  );
}

export default function Home() {
  const live = work.filter((w) => w.kind === 'website' && w.url && w.shots.length).slice(0, 4);
  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden />
        <div className="container">
          <Reveal>
            <img className="hero__mark" src="/brand/mark.svg" alt="" width={104} height={104} />
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display">
              Software,
              <br />
              <span className="gradient-text">crafted with care.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede">
              Apps, desktop software, hardware and websites. Every one of them designed and built by hand by{' '}
              {site.developer.name}.
            </p>
          </Reveal>
          <Reveal delay={240} className="cta-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn--primary" href="/store">
              Visit the Store
            </Link>
            <Link className="link" href="/work">
              See the work
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section--tight" aria-label="Everything built at Visualter">
        <Reveal className="container center">
          <p className="eyebrow">{products.length + work.length - 1} projects and counting</p>
          <p className="muted small">Hover over or tap any logo to take a look.</p>
        </Reveal>
        <LogoMarquee rows={marqueeRows()} />
      </section>

      <div className="tiles">
        <Tile slug="labos" dark />
        <Tile slug="museflow" />
        <div className="tiles tiles--two" style={{ padding: 0 }}>
          <Tile slug="orbitx" dark />
          <Tile slug="taqwa" white />
        </div>
        <div className="tiles tiles--two" style={{ padding: 0 }}>
          <Tile slug="calvio" white />
          <Tile slug="inkio" />
        </div>
        <div className="tiles tiles--two" style={{ padding: 0 }}>
          <Tile slug="prepvyu" />
          <Tile slug="rideos" dark />
        </div>
      </div>

      <section className="section">
        <div className="container center">
          <Reveal>
            <p className="eyebrow">Software for Windows</p>
            <h2 className="headline">Tools that stay on your machine.</h2>
            <p className="lede mt-s">Private, fast and yours. No subscriptions, no cloud you have to trust.</p>
          </Reveal>
          <div className="grid mt-l" style={{ textAlign: 'left' }}>
            {['nexora', 'visivault', 'verstack'].map((slug, i) => {
              const p = getProduct(slug) as Product;
              return (
                <Reveal key={slug} delay={i * 90} className="feature" style={{ ['--accent' as string]: p.accent }}>
                  <AppIcon src={p.logo} alt="" dark={p.logoDark} size={64} />
                  <h3 className="mt-m">{p.name}</h3>
                  <p>{p.tagline}</p>
                  <div className="cta-row mt-m">
                    <ActionButton product={p} small />
                    <Link className="link small" href={productHref(p)}>
                      Learn more
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container center">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2 className="headline">Websites people actually use.</h2>
            <p className="lede mt-s">Storefronts, clinics, congresses and robotics companies, live today.</p>
          </Reveal>
        </div>
        <div className="container container--wide">
          <div className="work-grid mt-l">
            {live.map((w, i) => (
              <Reveal key={w.slug} delay={i * 80} className="work-card">
                <div className="work-card__shot">
                  <img src={w.shots[0].src} alt={`${w.name} website`} loading="lazy" decoding="async" />
                </div>
                <div className="work-card__body" style={{ color: 'var(--ink)' }}>
                  <div className="work-card__top">
                    <AppIcon src={w.logo ?? '/logos/cmanager.webp'} alt="" dark={w.logoDark} />
                    <h3 className="card__name">{w.name}</h3>
                  </div>
                  <p className="card__text">{w.summary}</p>
                  <a className="link mt-s stretched" href={w.url} target="_blank" rel="noopener noreferrer">
                    {w.urlLabel}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center mt-l">
            <Link className="btn btn--light" href="/work">
              View all work
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dev">
            <Reveal scale>
              <img className="dev__photo" src="/brand/affan.webp" alt={site.developer.name} width={300} height={300} loading="lazy" />
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow">The developer</p>
              <h2 className="headline">{site.developer.name}</h2>
              <p className="lede mt-s">
                One person, every layer. From circuit boards and Android apps to desktop software and the websites that sell
                them.
              </p>
              <div className="cta-row mt-m">
                <Link className="btn btn--dark" href="/developer">
                  Meet the developer
                </Link>
                <a className="link" href={site.developer.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a className="link" href={site.developer.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
