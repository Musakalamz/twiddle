# Twiddle

Twiddle is a microblogging application built on Next.js 16 (App Router) with Clerk authentication, MongoDB/Mongoose for data, and Tailwind CSS v4 for styling. It delivers a modern, serverless-first experience and is production-ready for Vercel.

## Features

- Auth: Clerk-powered sign in, sign up, and webhooks
- Posts: Create, view, reply, retweet, like
- Profiles & Groups: Dedicated pages with tabs (Tweets, Replies/Members)
- Responsive UI: Tailwind v4 with CSS-first tokens and Radix UI Tabs
- Serverless-first: Cached MongoDB connections in API and server actions

## Tech Stack

- Next.js `16.0.3` (App Router, Turbopack)
- React `19`
- Clerk (`@clerk/nextjs`) for auth and webhooks
- MongoDB + Mongoose `^8`
- Tailwind CSS `^4` with `@tailwindcss/postcss`
- Radix UI Tabs (`@radix-ui/react-tabs`)
- Zod, React Hook Form, lucide-react

## Directory Structure

```
app/                        # App Router
  (auth)/                   # Auth flows (login/register/onboarding)
  (root)/                   # Main pages (home, groups, profile, tweet, search, notifications)
  api/webhooks/clerk/       # Clerk webhook route
  globals.css               # Tailwind v4 CSS and component layers

components/                 # UI and shared components
lib/                        # Actions, models, validations, utils, mongoose
proxy.ts                    # Next.js 16 Proxy (replaces middleware.ts)
tailwind.config.ts          # Tailwind configuration
postcss.config.mjs          # PostCSS with @tailwindcss/postcss
```

## Prerequisites

- Node.js 18+ recommended
- MongoDB Atlas cluster (or reachable MongoDB instance)
- Clerk account and application (Frontend + Backend API keys)

## Environment Variables

Create a `.env` file locally and configure the same vars in Vercel:

```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# MongoDB (Atlas SRV recommended)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>.mongodb.net/<database>?retryWrites=true&w=majority
# OR (also supported by code)
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster-host>.mongodb.net/<database>?retryWrites=true&w=majority
```

Important:
- `<cluster-host>` must be a valid Atlas host like `cluster0.xxxxxx.mongodb.net`.
- Ensure Atlas Network Access allows your Vercel deployment (temporarily `0.0.0.0/0` for testing).
- Create a DB user with `readWrite` permissions for the selected database.

## Development

```
npm install
npm run dev
```

- Local: `http://localhost:3000`
- Lint: `npm run lint`

## Styling (Tailwind v4)

Twiddle uses Tailwind v4 with CSS-first tokens and PostCSS processing.

- `app/globals.css` includes:
  - `@import "tailwindcss";`
  - `@theme { ... }` tokens for colors and breakpoints
  - `@layer components` for component classes using `@apply`

Example tokens in `@theme`:

```
@theme {
  --color-dark-2: #121417;
  --color-dark-4: #1f1f22;
  --color-light-1: #ffffff;
  --breakpoint-xs: 400px;
}
```

Notes:
- Use explicit font sizes (e.g., `text-[16px]`) instead of old v3 custom names.
- Colors and breakpoints are available as utilities derived from `@theme`.

## Authentication & Proxy

- The Next.js 16 convention replaces `middleware.ts` with `proxy.ts`.
- Twiddle uses `proxy.ts` with `clerkMiddleware()` and the recommended matcher so protected routes and webhooks behave correctly on Vercel.

## Database (Serverless)

`lib/mongoose.ts` implements a global cached connection:
- Caches connection in `globalThis` to avoid reconnect churn across serverless invocations
- Disables Mongoose `bufferCommands` and awaits connection before queries
- Accepts either `MONGODB_URI` or `MONGODB_URL`

## Deployment (Vercel)

1. Set environment variables in Vercel Project Settings:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
   - `MONGODB_URI` (prefer SRV)
2. Deploy with GitHub integration or `vercel` CLI.
3. Confirm build succeeds (Next 16, Proxy-only, Tailwind v4 CSS).

## Troubleshooting

- `querySrv ENOTFOUND _mongodb._tcp.<...>`
  - The connection string host is invalid; use Atlas’s SRV host (e.g., `cluster0...mongodb.net`).
- `Operation users.findOne() buffering timed out` (10s)
  - Occurs when queries run before connection; Twiddle awaits a cached connection and disables buffering.
- `Both middleware.ts and proxy.ts detected`
  - Remove `middleware.ts`; only `proxy.ts` should exist on Next 16.
- Tailwind unknown utility (e.g., `text-heading2-bold`)
  - Use explicit font sizes (`text-[30px]`) or `@apply` with CSS properties.
- Module not found: `@radix-ui/react-tabs`
  - Ensure dependency is installed and present in `package.json`.

## Scripts

```
npm run dev      # start dev server
npm run build    # production build
npm run start    # run built app
npm run lint     # lint using ESLint
```

## Contributing

- Follow existing patterns and code style.
- Do not commit secrets. Use environment variables.
- Run `npm run lint` before pushing.

## License

MIT
