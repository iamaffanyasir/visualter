'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import './mf.css';

const PACKAGE = 'com.muse.flow';

function SharedSong() {
  const params = useSearchParams();
  const videoId = (params.get('v') || '').replace(/[^A-Za-z0-9_-]/g, '');
  const title = params.get('t') || 'Shared song';
  const artist = params.get('a') || '';
  const ytMusic = `https://music.youtube.com/watch?v=${videoId}`;

  // The intent:// link only works on Android, so decide after mount to avoid a hydration mismatch.
  const [openHref, setOpenHref] = useState(ytMusic);
  useEffect(() => {
    if (/android/i.test(navigator.userAgent)) {
      const query = `v=${encodeURIComponent(videoId)}&t=${encodeURIComponent(title)}&a=${encodeURIComponent(artist)}`;
      setOpenHref(
        `intent://play?${query}#Intent;scheme=museflow;package=${PACKAGE};` +
          `S.browser_fallback_url=${encodeURIComponent(ytMusic)};end`,
      );
    }
    document.title = `${title}${artist ? ` by ${artist}` : ''} · Muse Flow`;
  }, [videoId, title, artist, ytMusic]);

  if (!videoId) {
    return (
      <div className="mf__card">
        <h1 className="mf__title">Muse Flow</h1>
        <p className="mf__artist">This link doesn&apos;t point to a song.</p>
      </div>
    );
  }

  return (
    <div className="mf__card">
      <img className="mf__cover" src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt={title} />
      <p className="mf__label">Shared from Muse Flow</p>
      <h1 className="mf__title">{title}</h1>
      {artist && <p className="mf__artist">{artist}</p>}
      <a className="mf__btn mf__btn--primary" href={openHref}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
        </svg>{' '}
        Open in Muse Flow
      </a>
      <a className="mf__btn mf__btn--secondary" href={ytMusic} target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.4 3.1-5.4 3.1Z" />
        </svg>{' '}
        Listen on YouTube Music
      </a>
      <p className="mf__note">Have Muse Flow installed? Links like this open straight in the app.</p>
    </div>
  );
}

export default function MuseFlowSharePage() {
  return (
    <section className="mf">
      <Suspense fallback={<div className="mf__card mf__card--loading" />}>
        <SharedSong />
      </Suspense>
    </section>
  );
}
