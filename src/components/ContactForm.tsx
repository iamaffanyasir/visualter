'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getProduct } from '@/data/products';
import { site } from '@/data/site';

export function ContactForm() {
  const about = getProduct(useSearchParams().get('about') ?? '');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState(about ? `About ${about.name}` : '');
  const [message, setMessage] = useState(about ? `Hi, I would like to know more about ${about.name}.` : '');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n${name}`;
    window.location.href = `mailto:${site.developer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="form" onSubmit={send}>
      <input aria-label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input aria-label="Subject" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      <textarea aria-label="Message" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      <button className="btn btn--primary" type="submit" style={{ justifySelf: 'center', minWidth: 200 }}>
        Send message
      </button>
    </form>
  );
}
