export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
export const APPS_BUCKET = process.env.SUPABASE_APPS_BUCKET ?? 'apps';

/** False until the Supabase environment variables are set. The site falls back to WhatsApp ordering. */
export const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
