import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { StoreGrid } from '@/components/StoreGrid';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Apps for Android, software for Windows and hardware, designed and built by Mohammad Affan Yasir.',
};

export default function StorePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal>
            <h1 className="display">Store.</h1>
            <p className="lede">The best way to get everything made at Visualter. Simple prices, no subscriptions.</p>
          </Reveal>
        </div>
      </section>
      <section className="section--tight" style={{ paddingTop: 20 }}>
        <div className="container container--wide">
          <StoreGrid />
        </div>
      </section>
    </>
  );
}
