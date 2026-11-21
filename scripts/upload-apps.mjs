// Uploads the paid app files to the file store used by the site.
// Usage: npm run upload:apps            (all files)
//        npm run upload:apps orbitx     (only paths starting with "orbitx")
// Reads keys from .env.local and file locations from scripts/apps.local.json (both ignored by git).
//
// With GITHUB_RELEASES_REPO and GITHUB_RELEASES_TOKEN set, files go to a release in that private repo
// (free, up to 2 GB per file). Otherwise they go to the private Supabase Storage bucket.
import { readFileSync, statSync, existsSync } from 'node:fs';
import { basename } from 'node:path';

function loadEnv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && m[2] && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
loadEnv('.env.local');

const manifest = JSON.parse(readFileSync('scripts/apps.local.json', 'utf8'));
const only = process.argv.slice(2);
const entries = Object.entries(manifest).filter(([p]) => !only.length || only.some((o) => p.startsWith(o)));
const typeOf = (p) => (p.endsWith('.apk') ? 'application/vnd.android.package-archive' : 'application/octet-stream');

const repo = process.env.GITHUB_RELEASES_REPO;
const token = process.env.GITHUB_RELEASES_TOKEN;
const tag = process.env.GITHUB_RELEASES_TAG || 'apps';

if (repo && token) {
  const headers = { Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', Accept: 'application/vnd.github+json' };
  const api = (path, init = {}) => fetch(`https://api.github.com${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } });

  let res = await api(`/repos/${repo}/releases/tags/${tag}`);
  if (res.status === 404) {
    console.log(`creating release "${tag}" in ${repo}`);
    res = await api(`/repos/${repo}/releases`, {
      method: 'POST',
      body: JSON.stringify({ tag_name: tag, name: 'App downloads', body: 'Files delivered to Visualter customers.', draft: false }),
    });
  }
  if (!res.ok) {
    console.error(`GitHub said ${res.status}: ${await res.text()}`);
    console.error('Check that the repo exists, has at least one commit, and the token has Contents: Read and write.');
    process.exit(1);
  }
  const release = await res.json();

  for (const [path, local] of entries) {
    const name = basename(path);
    if (!existsSync(local)) {
      console.log(`skip   ${name}  (missing: ${local})`);
      continue;
    }
    const old = release.assets.find((a) => a.name === name);
    if (old) await api(`/repos/${repo}/releases/assets/${old.id}`, { method: 'DELETE' });
    const mb = (statSync(local).size / 1048576).toFixed(1);
    process.stdout.write(`upload ${name}  ${mb} MB ... `);
    const up = await fetch(`https://uploads.github.com/repos/${repo}/releases/${release.id}/assets?name=${encodeURIComponent(name)}`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': typeOf(path) },
      body: readFileSync(local),
    });
    console.log(up.ok ? 'done' : `failed: ${up.status} ${await up.text()}`);
  }
} else {
  const { createClient } = await import('@supabase/supabase-js');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_APPS_BUCKET || 'apps';
  if (!url || !key) {
    console.error('Set GITHUB_RELEASES_REPO and GITHUB_RELEASES_TOKEN (or the Supabase keys) in .env.local first.');
    process.exit(1);
  }
  const supabase = createClient(url, key, { auth: { persistSession: false } });
  for (const [path, local] of entries) {
    if (!existsSync(local)) {
      console.log(`skip   ${path}  (missing: ${local})`);
      continue;
    }
    const mb = (statSync(local).size / 1048576).toFixed(1);
    process.stdout.write(`upload ${path}  ${mb} MB ... `);
    const { error } = await supabase.storage.from(bucket).upload(path, readFileSync(local), { upsert: true, contentType: typeOf(path) });
    console.log(error ? `failed: ${error.message}` : 'done');
  }
}
