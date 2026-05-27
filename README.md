# CineStream

A movie streaming website built with Next.js and Supabase.

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Copy `env.example` to `.env.local` and add your credentials from **Project Settings → API**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In the Supabase **SQL Editor**, run:
   - `supabase/schema.sql` — creates the `movies` table
   - `supabase/seed.sql` — adds sample movies
4. Restart the dev server.

Without `.env.local`, the app uses built-in local movie data as a fallback.

## TMDB (real movie posters & trailers)

1. Get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).
2. Add to `.env.local`:
   ```
   TMDB_API_KEY=your-key-here
   ```
3. Restart the dev server. Movies load from TMDB with real posters; Play shows the official YouTube trailer.

## Authentication (Email + Google)

The **Account** page (`/account`) supports sign in, sign up, and Google OAuth via Supabase Auth.

### Enable Email auth (default)

Supabase enables email/password by default. In your project go to **Authentication → Providers → Email** and ensure it is enabled.

### Enable Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com/), create OAuth credentials (Web application).
2. Add **Authorized redirect URI**:  
   `https://euqluysfqrakddmyfcqz.supabase.co/auth/v1/callback`
3. In Supabase: **Authentication → Providers → Google** → enable and paste Client ID + Client Secret.
4. In Supabase: **Authentication → URL Configuration**, set:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

5. Run `supabase/auth-setup.sql` in the SQL Editor (profiles + watchlist for My List).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
