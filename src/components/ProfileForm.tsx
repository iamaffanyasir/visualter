'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export function ProfileForm({ userId, name, phone }: { userId: string; name: string; phone: string }) {
  const [form, setForm] = useState({ name, phone });
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('saving');
    const { error } = await supabaseBrowser()
      .from('profiles')
      .update({ full_name: form.name.trim(), phone: form.phone.trim(), updated_at: new Date().toISOString() })
      .eq('id', userId);
    setState(error ? 'error' : 'saved');
  };

  return (
    <form className="form" onSubmit={save} style={{ margin: 0, maxWidth: 520 }}>
      <input aria-label="Full name" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input aria-label="Phone number" placeholder="Phone number" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
      <div className="cta-row">
        <button className="btn btn--dark" type="submit" disabled={state === 'saving'}>
          {state === 'saving' ? 'Saving' : 'Save details'}
        </button>
        {state === 'saved' && <span className="muted small">Saved.</span>}
        {state === 'error' && <span className="form__error">Could not save. Please try again.</span>}
      </div>
    </form>
  );
}
