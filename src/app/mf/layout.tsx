import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listen on Muse Flow',
  description: 'A song shared from Muse Flow. Open it in the app or listen on YouTube Music.',
  // Shared-song links are personal; keep them out of search results.
  robots: { index: false, follow: false },
};

export default function MuseFlowLayout({ children }: { children: React.ReactNode }) {
  return children;
}
