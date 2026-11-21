import type { Metadata } from 'next';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply to visualter.com and to Visualter apps and software.',
};

export default function TermsPage() {
  const d = site.developer;
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1 className="headline">Terms of Use</h1>
          <p className="lede">Last updated 21 November 2026</p>
        </div>
      </section>
      <article className="prose">
        <h2>Using this website</h2>
        <p>
          By using visualter.com you agree to these terms. The content, screenshots, logos and code shown here belong to
          Visualter or to the clients whose work is featured, and may not be copied or reused without permission.
        </p>

        <h2>Apps and software</h2>
        <p>
          When you download or buy a Visualter app or program, you receive a personal licence to install and use it on your own
          devices. You may not resell, redistribute, decompile or modify it, or remove any notices from it.
        </p>

        <h2>Purchases and refunds</h2>
        <p>
          Prices are shown in Indian Rupees and include any applicable taxes unless stated otherwise. If a product does not work
          as described on its page, contact us and we will work with you to put it right.
        </p>

        <h2>Client websites</h2>
        <p>
          Websites listed under Work are built for and owned by their respective clients. Their own terms and policies apply when
          you use them.
        </p>

        <h2>No warranty</h2>
        <p>
          Our products are provided as they are. We work hard to keep them reliable, but we cannot promise they will be free of
          errors, and we are not liable for indirect losses arising from their use.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time. The date at the top of this page shows the latest version.</p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${d.email}`}>{d.email}</a> · <a href={d.phoneHref}>{d.phone}</a>
        </p>
      </article>
    </>
  );
}
