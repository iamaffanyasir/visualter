import 'server-only';
import { notFound } from 'next/navigation';
import { currentUser } from './supabase/server';

/** Comma separated list of admin emails, kept in the ADMIN_EMAILS environment variable. */
const admins = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const isAdminEmail = (email?: string | null) => !!email && admins.includes(email.toLowerCase());

/** Returns the signed in admin, or shows a 404 to everyone else so the page does not reveal itself. */
export async function requireAdmin() {
  const { user } = await currentUser();
  if (!user || !isAdminEmail(user.email)) notFound();
  return user;
}
