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
    document.title = `${title}${artist ? ` — ${artist}` : ''} · Muse Flow`;
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
        <i className="fa-solid fa-play" /> Open in Muse Flow
      </a>
      <a className="mf__btn mf__btn--secondary" href={ytMusic} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-youtube" /> Listen on YouTube Music
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
