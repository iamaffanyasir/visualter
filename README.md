# Visualter

The website and store for Visualter: apps, software, hardware and client work by Mohammad Affan Yasir.
Built with Next.js 15 (App Router) and Supabase for customer accounts, orders and private downloads.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the Supabase values
npm run dev                  # http://localhost:3000
```

Without Supabase values the site still works: Buy buttons fall back to ordering on WhatsApp or by email.

## Where things live

| What | Where |
| --- | --- |
| Products, prices, screenshots, client work | `src/data/products.ts` |
| Name, email, phone, social links | `src/data/site.ts` |
| Paid download files per product | `productFiles` in `src/data/products.ts` |
| Logos and screenshots | `public/logos`, `public/shots/<product>` |
| Free APKs | `public/downloads` |
| Database schema | `supabase/migrations` |
| Payment gateway hook | `src/lib/checkout.ts` |

## Supabase setup (once)

1. **Keys.** Supabase dashboard > Project Settings > API. Put the Project URL, the anon key and the
   service role key in `.env.local` (and in Vercel > Settings > Environment Variables when deploying).
   The service role key is secret: never commit it and never prefix it with `NEXT_PUBLIC_`.
2. **Database.** Open SQL Editor, paste `supabase/migrations/0001_accounts_and_orders.sql` and run it.
   It creates `profiles`, `orders` (with row level security) and a private `apps` storage bucket.
3. **Auth URLs.** Authentication > URL Configuration: set Site URL to `https://visualter.com` and add
   `http://localhost:3000/**` and `https://visualter.com/**` to Redirect URLs.
4. **App files (free, GitHub Releases).**
   - Create a **private** repo on GitHub, for example `visualter-apps`, and tick "Add a README" so it has a first commit.
   - GitHub > Settings > Developer settings > Fine grained tokens > Generate: Repository access "Only select
     repositories" (that repo), Permissions > Contents: **Read and write**.
   - Put `GITHUB_RELEASES_REPO=owner/visualter-apps` and the token in `.env.local`.
   - Check the paths in `scripts/apps.local.json`, then run `npm run upload:apps`. Files up to 2 GB each are fine.
   Leaving the GitHub values empty uses the Supabase bucket instead (free plan limit: 50 MB per file).

## How buying works

1. A visitor taps Buy. If they are signed out they sign in or create an account (name, phone, email, password)
   and come straight back to checkout.
2. Checkout confirms their name and phone and creates a `pending` order. The price is always set on the server.
3. Until the payment gateway is connected, payment is completed on WhatsApp. Mark the order paid in
   Table Editor > orders > status = `paid`.
4. The app appears under **Account** with download buttons. Each download is a signed link that expires
   after one minute and only works for the person who owns the product.

When the gateway credentials are ready, follow the steps in `src/lib/checkout.ts`.
