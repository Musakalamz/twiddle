# Slide 1 — Project Overview (Cover)

- Title: Twiddle — Microblogging Platform
- Tagline: Fast, secure posting and interaction
- Stack: Next.js 16 (App Router), Clerk, MongoDB/Mongoose, Tailwind v4
- Links: GitHub repository, live demo (if applicable)
- Visual guidance:
  - Background: dark gradient using `--color-dark-2` → `--color-dark-4`
  - Centered logo `public/assets/logo.svg`
  - Accent rings/lines in `--color-primary-500` and `--color-secondary-500`
- Speaker notes: Introduce the problem Twiddle solves, core features (post, reply, retweet, like), and the serverless-first approach.

# Slide 2 — Problem & Goals

- Problem: Users need a lightweight, secure way to share short-form content reliably.
- Goals:
  - Responsive UX with clean, consistent design
  - Production-grade authentication and secure webhooks
  - Reliable persistence and predictable performance in serverless environments
  - Simple developer experience and a deploy-to-Vercel pipeline
- Outcomes: High-performance feed, clear client/server separation, robust error handling.
- Visual guidance: 2×2 infographic tiles with `lucide-react` icons (`message-square`, `shield`, `server`, `rocket`).
- Speaker notes: Emphasize user experience and platform reliability; why Next 16 and Tailwind v4.

# Slide 3 — Architecture & Tech Stack

- Runtime: Next.js 16 (App Router, Turbopack), React 19
- Auth: Clerk (`@clerk/nextjs`) + webhooks
- Data: MongoDB Atlas + Mongoose 8 (global cached connection)
- Styling: Tailwind v4 + `@tailwindcss/postcss`; Radix UI Tabs
- Validation: Zod + React Hook Form
- Structure:
  - Client and Server Components with server actions
  - API routes (`app/api/webhooks/clerk/route.ts`)
  - Edge Proxy (`proxy.ts`) replacing legacy middleware
- Visual guidance: Architecture diagram (User → Proxy → Server Components/API → MongoDB; return path). Use brand colors for arrows and nodes.
- Code references: `proxy.ts:1–10`, `app/(root)/page.tsx:9–13, 26–29, 61–64`, `lib/mongoose.ts:24–33`.
- Speaker notes: Proxy clarifies request orchestration; serverless considerations for performance.

# Slide 4 — Authentication & Security

- Clerk integration:
  - Sign up, SSO callback, onboarding flow
  - Protected routes via Edge Proxy and Clerk sessions
  - Webhook route for user/group lifecycle events
- Security practices:
  - Secrets via env vars (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
  - Input validation using Zod
  - Strict typing and normalized error handling (`unknown` in catches)
- Visual guidance: Sequence diagram (User → Clerk → Edge Proxy → Protected Route → Response).
- Code references: `app/(auth)/onboarding/[[...onboarding]]/page.tsx:9–13, 41–43`, `app/api/webhooks/clerk/route.ts`.
- Speaker notes: How sessions secure resources; webhooks sync user data.

# Slide 5 — Data Model & Persistence

- Entities:
  - User: profile, tweets, replies, retweets, liked tweets
  - Tweet: text, author, group, `retweetOf`, `children` (threaded replies), `likes`
  - Group: name, image, createdBy, members, tweets
- Serverless DB strategy:
  - Global cached connection; `bufferCommands=false`
  - Awaited connection; `serverSelectionTimeoutMS=5000`
  - Accepts `MONGODB_URI` or `MONGODB_URL`
- Visual guidance: ER Diagram (User ↔ Tweet ↔ Group) with edges for `retweetOf` and threaded `children`.
- Code references: `lib/models/tweet.model.ts:5–41`, `lib/mongoose.ts:24–33`.
- Speaker notes: Why cached connections and fast failure reduce timeouts; relationships in UI.

# Slide 6 — Features & UX

- Features:
  - Create tweets, reply, retweet, like, delete
  - Profile/Group pages with tabs (Tweets, Replies/Members)
  - Pagination on feed
- UI/UX:
  - Tailwind v4 tokens in `@theme`; `@import "tailwindcss"`
  - Explicit font sizes to avoid unknown utilities
  - Radix UI Tabs integration
- Visual guidance: 3 screenshots — Home feed, Create Tweet, Profile/Group Tabs (placeholders pointing to app pages).
- Code references: `app/(root)/create-tweet/page.tsx:13–15`, `components/forms/PostTweet.tsx:40–50, 78–80`, `app/(root)/groups/[id]/page.tsx:28–55`.
- Speaker notes: Client/server boundaries, lightweight client interactions, explicit styling.

# Slide 7 — Deployment & Operations

- Platform: Vercel (optimized for Next.js 16)
- Environment variables:
  - Clerk: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
  - MongoDB: `MONGODB_URI` SRV format (e.g., `mongodb+srv://…/twiddle?retryWrites=true&w=majority`)
- Scripts:
  - `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- Observability: Vercel run logs (proxy/edge, server actions, API routes)
- Visual guidance: CI/CD pipeline graphic (GitHub → Vercel → Proxy → App/API → MongoDB), use brand colors.
- Troubleshooting highlights:
  - DNS SRV invalid host → fix Atlas SRV
  - Tailwind v4 unknown utilities → use explicit sizes
  - Missing modules → ensure dependencies
- Speaker notes: Deployment pitfalls and mitigations; importance of correct Atlas SRV and network access.

# Slide 8 — Demo & Roadmap

- Demo flow:
  - Sign up via Clerk → Onboarding → Complete profile
  - Home feed: view tweets, like, reply, retweet; pagination
  - Create Tweet: posts content; group-aware if applicable
  - Profile/Group: tabbed views with counts
- Roadmap:
  - Real-time updates (websocket/SSE)
  - Media uploads, moderation tools
  - Notifications/activity streams
  - Test coverage (unit/integration, e2e)
  - Analytics & performance dashboards
- Visual guidance: Milestone timeline with icons (`bell`, `camera`, `activity`, `bar-chart`).
- Speaker notes: Step-by-step demo highlights; upcoming features and scaling considerations.

---

## Slide Design Cheatsheet

- Colors (from `@theme`):
  - Backgrounds: `--color-dark-2` (#121417), `--color-dark-4` (#1f1f22)
  - Accents: `--color-primary-500` (#877eff), `--color-secondary-500` (#ffb620)
  - Text: `--color-light-1` (#ffffff), muted `--color-light-3` (#7878a3)
- Typography:
  - Headings: 30px / 140% / bold
  - Body: 16px / 140% / normal; small: 14px / 140% / medium
- Imagery:
  - Use icons from `public/assets` (tweet.svg, profile.svg, groups.svg, retweet.svg, heart.svg)
- Layout:
  - Consistent margins, grid-based sections, clear hierarchy
- Tips:
  - Prefer diagrams (architecture, ER, sequence) for clarity
  - Keep slides uncluttered; use speaker notes for details
