import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.developer.name} about an app, a purchase or a new project.`,
};

export default function ContactPage() {
  const d = site.developer;
  const cards = [
    {
      title: 'Email',
      text: d.email,
      href: `mailto:${d.email}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
    {
      title: 'Phone',
      text: d.phone,
      href: d.phoneHref,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      ),
    },
    {
      title: 'WhatsApp',
      text: 'Usually replies within the hour',
      href: d.whatsapp,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display">Say hello.</h1>
            <p className="lede">A question about an app, a purchase, or something new you want built. I read every message.</p>
          </Reveal>
        </div>
      </section>
      <section className="section--tight" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="contact-grid">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <a className="contact-card" href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ display: 'block' }}>
                  {c.icon}
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Reveal className="center mb-l">
            <h2 className="title">Or write a message.</h2>
            <p className="muted mt-s">It opens in your email app, ready to send.</p>
          </Reveal>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
