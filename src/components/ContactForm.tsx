'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getProduct } from '@/data/products';

export function ContactForm() {
  const about = getProduct(useSearchParams().get('about') ?? '');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: about ? `About ${about.name}` : '',
    message: about ? `Hi, I would like to know more about ${about.name}.` : '',
    website: '',
  });
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    setError('');
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, about: about?.slug }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) setState('sent');
    else {
      setError(data.error ?? 'Could not send your message. Please try again.');
      setState('idle');
    }
  };

  if (state === 'sent') {
    return (
      <div className="feature center" style={{ maxWidth: 640, margin: '0 auto' }}>
        <h3 className="title">Thank you, {form.name.split(' ')[0]}.</h3>
        <p className="muted mt-s">Your message has been received. You will hear back at {form.email}, usually within a day.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={send}>
      <input aria-label="Your name" placeholder="Your name" autoComplete="name" value={form.name} onChange={set('name')} required />
      <div className="form__row">
        <input aria-label="Email" placeholder="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
        <input aria-label="Phone (optional)" placeholder="Phone (optional)" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
      </div>
      <input aria-label="Subject" placeholder="Subject" value={form.subject} onChange={set('subject')} required />
      <textarea aria-label="Message" placeholder="Your message" value={form.message} onChange={set('message')} required />
      <input
        className="form__trap"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        name="website"
        value={form.website}
        onChange={set('website')}
      />
      {error && <p className="form__error">{error}</p>}
      <button className="btn btn--primary" type="submit" disabled={state === 'sending'} style={{ justifySelf: 'center', minWidth: 200 }}>
        {state === 'sending' ? 'Sending' : 'Send message'}
      </button>
    </form>
  );
}
