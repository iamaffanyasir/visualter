'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { supabaseEnabled } from '@/lib/supabase/config';

type Mode = 'login' | 'signup';

const safeNext = (n: string | null) => (n && n.startsWith('/') && !n.startsWith('//') ? n : '/account');

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get('next'));
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  if (!supabaseEnabled) {
    return <p className="center muted">Accounts are being set up. Please check back very soon.</p>;
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const supabase = supabaseBrowser();
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      if (error) {
        setError(error.message === 'Invalid login credentials' ? 'That email and password do not match.' : error.message);
        setBusy(false);
        return;
      }
      router.replace(next);
      router.refresh();
      return;
    }
    // Send the confirmation link back to the site the visitor is actually on. A build time
    // NEXT_PUBLIC_SITE_URL of http://localhost:3000 used to leak into production emails.
    const site = window.location.origin;
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name.trim(), phone: form.phone.trim() },
        emailRedirectTo: `${site}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (data.session) {
      router.replace(next);
      router.refresh();
    } else setSent(true);
  };

  if (sent) {
    return (
      <div className="auth-card center">
        <h2 className="title">Check your email.</h2>
        <p className="muted mt-s">
          We sent a confirmation link to <strong>{form.email}</strong>. Open it to finish creating your account.
        </p>
      </div>
    );
  }

  return (
    <form className="auth-card form" onSubmit={submit}>
      {mode === 'signup' && (
        <>
          <input aria-label="Full name" placeholder="Full name" autoComplete="name" value={form.name} onChange={set('name')} required />
          <input
            aria-label="Phone number"
            placeholder="Phone number"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={set('phone')}
            required
            pattern="[0-9 +()]{8,}"
          />
        </>
      )}
      <input aria-label="Email" placeholder="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
      <input
        aria-label="Password"
        placeholder="Password"
        type="password"
        autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
        minLength={8}
        value={form.password}
        onChange={set('password')}
        required
      />
      {error && <p className="form__error">{error}</p>}
      <button className="btn btn--primary" type="submit" disabled={busy}>
        {busy ? 'Please wait' : mode === 'login' ? 'Sign in' : 'Create account'}
      </button>
      <p className="center small muted">
        {mode === 'login' ? (
          <>
            New here? <Link className="link" href={`/signup?next=${encodeURIComponent(next)}`}>Create an account</Link>
          </>
        ) : (
          <>
            Already have an account? <Link className="link" href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
          </>
        )}
      </p>
    </form>
  );
}
