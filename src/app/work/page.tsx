import type { Metadata } from 'next';
import { AppIcon } from '@/components/AppIcon';
import { Reveal } from '@/components/Reveal';
import { work, workKinds, type Work } from '@/data/products';

export const metadata: Metadata = {
  title: 'Work',
  description: 'CRMs, websites and 3D designs built by Mohammad Affan Yasir for clients across India and Oman.',
};

function WorkCard({ w, i }: { w: Work; i: number }) {
  return (
    <Reveal className="work-card" delay={(i % 2) * 90}>
      {w.shots.length ? (
        <div className="work-card__shot">
          <img src={w.shots[0].src} alt={`${w.name} screenshot`} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="work-card__shot work-card__shot--logo">
          <img src={w.logo} alt={`${w.name} logo`} loading="lazy" />
        </div>
      )}
      <div className="work-card__body">
        <div className="work-card__top">
          <AppIcon src={w.logo ?? '/logos/cmanager.webp'} alt="" dark={w.logoDark} />
          <h3 className="card__name">{w.name}</h3>
        </div>
        <p className="card__text">{w.summary}</p>
        <div className="tags">
          {w.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        {w.url ? (
          <a className="link stretched" href={`/go/${w.slug}?t=work`} target="_blank" rel="noopener noreferrer">
            Visit {w.urlLabel}
          </a>
        ) : (
          <span className="muted small">Launching soon</span>
        )}
      </div>
    </Reveal>
  );
}

export default function WorkPage() {
  const crms = work.filter((w) => w.kind === 'crm');
  const sites = work.filter((w) => w.kind === 'website');
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Work</p>
            <h1 className="display">Built for real businesses.</h1>
            <p className="lede">CRMs that run labs and studios, and websites for brands from Delhi to Muscat.</p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight">
        <div className="container container--wide">
          <Reveal>
            <h2 className="title mb-l">{workKinds.crm}</h2>
          </Reveal>
          <div className="work-grid">
            {crms.map((w, i) => (
              <WorkCard key={w.slug} w={w} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight">
        <div className="container container--wide">
          <Reveal>
            <h2 className="title mb-l">{workKinds.website}</h2>
          </Reveal>
          <div className="work-grid">
            {sites.map((w, i) => (
              <WorkCard key={w.slug} w={w} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container center">
          <Reveal className="no-shots" style={{ ['--accent' as string]: '#6b4bff', maxWidth: 760 }}>
            <p className="eyebrow">{workKinds.design}</p>
            <h2 className="headline">Something new is taking shape.</h2>
            <p className="lede mt-s">Product renders, enclosures and printed parts. Arriving here soon.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
