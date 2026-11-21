import 'server-only';
import { APPS_BUCKET } from './supabase/config';
import { supabaseAdmin } from './supabase/server';

/**
 * Where paid app files are stored.
 * "github"   (default when GITHUB_RELEASES_REPO is set): assets of a release in a private GitHub repo. Free, 2 GB per file.
 * "supabase": the private Supabase Storage bucket (free plan limits files to 50 MB).
 */
const repo = process.env.GITHUB_RELEASES_REPO ?? ''; // "owner/repo"
const tag = process.env.GITHUB_RELEASES_TAG ?? 'apps';
const token = process.env.GITHUB_RELEASES_TOKEN ?? '';
export const fileStore: 'github' | 'supabase' = repo && token ? 'github' : 'supabase';

const gh = (path: string, init?: RequestInit) =>
  fetch(`https://api.github.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', ...(init?.headers ?? {}) },
    cache: 'no-store',
  });

/** Returns a short lived URL for the file, or null if it is missing. */
export async function signedFileUrl(path: string): Promise<string | null> {
  const name = path.split('/').pop() as string;

  if (fileStore === 'github') {
    const rel = await gh(`/repos/${repo}/releases/tags/${encodeURIComponent(tag)}`);
    if (!rel.ok) return null;
    const { assets } = (await rel.json()) as { assets: { id: number; name: string }[] };
    // Asset names are flat, so "orbitx/OrbitX.apk" is stored as "OrbitX.apk".
    const asset = assets.find((a) => a.name === name);
    if (!asset) return null;
    // GitHub answers with a redirect to a signed link that expires within minutes.
    const res = await gh(`/repos/${repo}/releases/assets/${asset.id}`, {
      headers: { Accept: 'application/octet-stream' },
      redirect: 'manual',
    });
    return res.headers.get('location');
  }

  const { data, error } = await supabaseAdmin().storage.from(APPS_BUCKET).createSignedUrl(path, 60, { download: name });
  return error || !data ? null : data.signedUrl;
}
