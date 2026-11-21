import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/data/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Visualter · Apps, Software and Hardware by Mohammad Affan Yasir',
    template: '%s · Visualter',
  },
  description: site.description,
  applicationName: 'Visualter',
  authors: [{ name: site.developer.name, url: site.developer.github }],
  creator: site.developer.name,
  keywords: ['Visualter', 'Mohammad Affan Yasir', 'Android apps', 'Windows software', 'LabOS', 'Muse Flow', 'OrbitX', 'Taqwa', 'web development'],
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Visualter',
    url: site.url,
    title: 'Visualter',
    description: site.description,
    images: [{ url: '/brand/logo-light.png', alt: 'Visualter' }],
  },
  twitter: { card: 'summary_large_image', title: 'Visualter', description: site.description, images: ['/brand/logo-light.png'] },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#fbfbfd',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
