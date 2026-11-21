import type { Metadata } from 'next';
import Link from 'next/link';
import { ActionButton } from '@/components/ActionButton';
import { AppIcon } from '@/components/AppIcon';
import { Reveal } from '@/components/Reveal';
import { actionLabel, categories, productHref, products, work, type Category } from '@/data/products';

export const metadata: Metadata = {
  title: 'Downloads',
  description: 'Download every Visualter app and program: Android apps, Windows software and hardware companions.',
};

const order: Category[] = ['apps', 'software', 'hardware'];

export default function DownloadsPage() {
  const free = products.filter((p) => p.action.type === 'download' || p.action.type === 'play');
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Downloads</p>
            <h1 className="display">Everything, in one place.</h1>
            <p className="lede">
              Every app, program and device made at Visualter. Free downloads start right away, paid ones take a moment.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 12 }}>
        <div className="container container--wide">
          <Reveal>
            <h2 className="title mb-l">Free to download.</h2>
          </Reveal>
          <div className="dl-feature">
            {free.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <a
                  className="dl-tile"
                  style={{ ['--accent' as string]: p.accent }}
                  href={p.action.type === 'download' ? p.action.href : p.action.type === 'play' ? p.action.href : '#'}
                  {...(p.action.type === 'download' ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <AppIcon src={p.logo} alt="" dark={p.logoDark} />
                  <div>
                    <div className="dl-tile__name">{p.name}</div>
                    <div className="dl-tile__meta">
                      {p.platform} · {p.action.type === 'download' ? `APK · ${p.action.size}` : 'Google Play'}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {order.map((c) => {
        const list = products.filter((p) => p.category === c);
        return (
          <section key={c} className="section--tight">
            <div className="container">
              <Reveal>
                <h2 className="title mb-l">{categories[c].title}</h2>
              </Reveal>
              <Reveal className="dl-list">
                {list.map((p) => (
                  <div key={p.slug} className="dl-row">
                    <AppIcon src={p.logo} alt="" dark={p.logoDark} />
                    <div>
                      <Link href={productHref(p)} className="dl-row__name">
                        {p.name}
                      </Link>
                      <div className="dl-row__meta">
                        {p.platform}
                        {p.version ? ` · Version ${p.version}` : ''}
                        {p.action.type === 'download' ? ` · ${p.action.size}` : ''}
                      </div>
                      <div className="dl-row__meta">{p.tagline}</div>
                    </div>
                    <div className="dl-row__actions">
                      <span className="price small">{actionLabel(p.action)}</span>
                      <ActionButton product={p} small />
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="section--tight">
        <div className="container">
          <Reveal>
            <h2 className="title mb-l">On the web</h2>
          </Reveal>
          <Reveal className="dl-list">
            {work.map((w) => (
              <div key={w.slug} className="dl-row">
                <AppIcon src={w.logo ?? '/logos/cmanager.webp'} alt="" dark={w.logoDark} />
                <div>
                  <div className="dl-row__name">{w.name}</div>
                  <div className="dl-row__meta">{w.urlLabel ?? 'Launching soon'}</div>
                </div>
                <div className="dl-row__actions">
                  {w.url ? (
                    <a className="btn btn--ghost btn--sm" href={w.url} target="_blank" rel="noopener noreferrer">
                      Visit
                    </a>
                  ) : (
                    <button className="btn btn--sm" disabled>
                      Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container center">
          <p className="muted small">
            Installing an APK? Allow installs from your browser when Android asks. Windows may show a SmartScreen notice for new
            software, choose More info and then Run anyway.
          </p>
        </div>
      </section>
    </>
  );
}
