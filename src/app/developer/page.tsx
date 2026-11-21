import type { Metadata } from 'next';
import Link from 'next/link';
import { AppIcon } from '@/components/AppIcon';
import { Reveal } from '@/components/Reveal';
import { productHref, products, work } from '@/data/products';
import { site } from '@/data/site';

const d = site.developer;

export const metadata: Metadata = {
  title: d.name,
  description: `${d.name}, founder and developer of Visualter. Android, Windows, hardware and web, from New Delhi.`,
};

const GitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="#0a66c2" aria-hidden>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.3 18.5V10H5.5v8.5h2.8ZM6.9 8.8a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Zm11.6 9.7v-4.7c0-2.5-1.3-3.9-3.4-3.9-1.5 0-2.3.8-2.7 1.5V10H9.7v8.5h2.8v-4.6c0-1.2.5-2 1.6-2s1.6.8 1.6 2v4.6h2.8Z" />
  </svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

const skills = [
  { title: 'Android', text: 'Kotlin, Jetpack Compose, Glance widgets, Media3, ML Kit, Room and React Native.' },
  { title: 'Desktop', text: 'Electron, Node.js, Fastify, SQLite and Python with PySide6, packaged for Windows.' },
  { title: 'Web', text: 'Next.js, React, TypeScript, Vite, Tailwind, Supabase, MongoDB and MySQL.' },
  { title: 'Hardware and AI', text: 'ESP32, Arduino, LVGL displays, Whisper speech models and Gemini.' },
];

export default function DeveloperPage() {
  const links = [
    { href: d.github, label: 'GitHub', value: `@${d.githubHandle}`, icon: <GitHub />, external: true },
    { href: d.linkedin, label: 'LinkedIn', value: d.name, icon: <LinkedIn />, external: true },
    { href: `mailto:${d.email}`, label: 'Email', value: d.email, icon: <Mail /> },
    { href: d.phoneHref, label: 'Phone', value: d.phone, icon: <Phone /> },
  ];
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="dev">
            <Reveal scale>
              <img className="dev__photo" src="/brand/affan.webp" alt={d.name} width={300} height={300} />
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow">
                {d.role} · {d.location}
              </p>
              <h1 className="headline">{d.name}</h1>
              <p className="lede mt-s">
                I design and build software end to end. Android apps, Windows programs, hardware and the websites around them,
                every pixel and every line of code. Visualter is where all of it lives.
              </p>
            </Reveal>
          </div>
          <div className="dev__links">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={i * 70}>
                <a className="dev__link" href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {l.icon}
                  <div>
                    <small>{l.label}</small>
                    <span>{l.value}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="stats">
            {[
              [products.filter((p) => p.category === 'apps').length, 'Android apps'],
              [products.filter((p) => p.category !== 'apps').length, 'Programs and devices'],
              [work.length, 'Client projects'],
              ['69', 'Public repositories'],
            ].map(([n, label], i) => (
              <Reveal key={label as string} delay={i * 80}>
                <div className="stat__num">{n}</div>
                <div className="stat__label">{label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="headline">What I work with.</h2>
          </Reveal>
          <div className="features">
            {skills.map((s, i) => (
              <Reveal key={s.title} className="feature" delay={(i % 2) * 90} style={{ ['--accent' as string]: '#0071e3' }}>
                <div className="feature__dot" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--tight section--alt">
        <div className="container center">
          <Reveal>
            <h2 className="title">Things I have made.</h2>
          </Reveal>
          <Reveal className="chips mt-m" style={{ gap: 26 }}>
            {products.map((p) => (
              <Link key={p.slug} href={productHref(p)} className="marquee__item" style={{ width: 'auto' }}>
                <AppIcon src={p.logo} alt="" dark={p.logoDark} size={64} />
                <span className="marquee__label" style={{ color: 'var(--ink)' }}>
                  {p.name}
                </span>
              </Link>
            ))}
          </Reveal>
          <div className="cta-row mt-l">
            <Link className="btn btn--primary" href="/contact">
              Work with me
            </Link>
            <Link className="link" href="/work">
              See client work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
