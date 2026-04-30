# Webbyleen

This project includes a public portfolio feed, a contact inquiry flow, and an admin dashboard for publishing real project links to the site.

## Run locally

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev:api
```

The backend now reads environment variables from the root `.env.local` file through the `dev:api` script.
On Vercel, the same Express app is served from the repo's `/api` directory as serverless functions, so the deployed frontend can call `/api/...` on the same domain.

## Required environment variables

Add these to `.env.local`:

```env
VITE_SUPABASE_URL=https://ugedvhmgjbxmrinjwyep.supabase.co
VITE_SUPABASE_ANON_KEY=your_publishable_key
SUPABASE_URL=https://ugedvhmgjbxmrinjwyep.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ADMIN_TOKEN_SECRET=change-this-in-production
```

This is a Vite app, so use `VITE_...` names for frontend values instead of `NEXT_PUBLIC_...`.

## SQL setup

Create the Supabase tables and the `portfolio-previews` storage bucket before using the app. The codebase is now wired to expect those resources.

## Portfolio flow

1. Visit `/admin`
2. Create the first admin account
3. Paste a live project URL
4. The backend visits the URL, captures preview screenshots and metadata, and stores them in Supabase
5. The homepage and `/portfolio` page render that saved project content for all users

## Contact flow

1. Users submit the contact form
2. The backend stores the inquiry in Supabase
3. Admins review those saved inquiries inside the `/admin` dashboard
