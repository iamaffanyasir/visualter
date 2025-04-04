import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://visualter.vercel.app'),
  title: {
    default: 'Visualter - Digital Solutions Provider',
    template: '%s | Visualter'
  },
  description: 'Transforming ideas into exceptional digital experiences. We craft innovative solutions for web, mobile, and software development.',
  keywords: ['web development', 'software development', 'mobile apps', 'UI/UX design', 'digital solutions'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://visualter.com',
    siteName: 'Visualter',
    title: 'Visualter - Digital Solutions Provider',
    description: 'Transforming ideas into exceptional digital experiences',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Visualter'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visualter - Digital Solutions Provider',
    description: 'Transforming ideas into exceptional digital experiences',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://visualter.vercel.app'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://visualter.vercel.app" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
