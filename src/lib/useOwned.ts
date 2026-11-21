'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { supabaseEnabled } from './supabase/config';
import { supabaseBrowser } from './supabase/client';

/**
 * Slugs of products the signed in customer has paid for, shared by every component on the page.
 * null while loading; an empty set for signed out visitors.
 */
let owned: Set<string> | null = supabaseEnabled ? null : new Set();
let loading = false;
let subscribed = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

async function load() {
  if (loading) return;
  loading = true;
  try {
    const supabase = supabaseBrowser();
    const { data } = await supabase.auth.getUser();
    if (!data.user) owned = new Set();
    else {
      const { data: rows } = await supabase.from('orders').select('product_slug').eq('status', 'paid');
      owned = new Set((rows ?? []).map((r: { product_slug: string }) => r.product_slug));
    }
  } catch {
    owned = new Set();
  }
  loading = false;
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Call after a successful payment so buttons switch to Download straight away. */
export function markOwned(slug: string) {
  owned = new Set([...(owned ?? []), slug]);
  emit();
}

export function useOwned(): Set<string> | null {
  const value = useSyncExternalStore(subscribe, () => owned, () => null);
  useEffect(() => {
    if (!supabaseEnabled) return;
    if (owned === null) load();
    if (!subscribed) {
      subscribed = true;
      supabaseBrowser().auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
          owned = null;
          load();
        }
      });
    }
  }, []);
  return value;
}

export function useIsOwned(slug: string) {
  const set = useOwned();
  return set ? set.has(slug) : false;
}
