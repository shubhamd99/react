# Current Feature

## Status

Not Started

## Goals

## Notes

## History

- Project setup and boilerplate cleanup
- Initial Next.js 16 setup with TypeScript, ESLint, Tailwind CSS v4, and React Compiler
- Created mock data file at src/lib/mock-data.ts
- Dashboard UI Phase 1: shadcn/ui init, dark mode, /dashboard route, top bar with search + new item button, sidebar and main placeholders
- Dashboard UI Phase 2: collapsible sidebar with nav links, item types with colored icons and counts, favorite/recent collections, user avatar area, mobile Sheet drawer, Zustand sidebar store
- Dashboard UI Phase 3: main content area with 4 stats cards, collections grid with type icons, pinned items with content preview, and recent items with grid/list toggle
- Prisma 7 + Neon PostgreSQL: schema with all data models (User, Account, Session, VerificationToken, Item, ItemType, Collection, ItemCollection, Tag, TagsOnItems), prisma.config.ts, driver adapter (PrismaPg), initial migration, seed script for 7 system item types, db test script
- Seed data: demo user (demo@devstash.io, bcryptjs hashed password), 7 system item types, 5 collections (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources), 18 items with tags and collection links, updated test-db script to verify all seeded data
- Dashboard Collections: replaced mock data with real Prisma queries (src/lib/db/collections.ts), collection card border color from dominant item type, type icons from DB, updated stats cards with real collection counts, dashboard route set to force-dynamic
- Dashboard Items: replaced mock item data with real Prisma queries (src/lib/db/items.ts), pinned items and recent items fetched from DB, item card icon/border derived from item type, stats cards use real item counts, pinned section hidden when empty
- Stats & Sidebar: replaced mock data in sidebar with real DB queries, item types with icons/counts linking to /items/[typename], sidebar collections split into Favorites and Recent sections with item counts, colored circles for recents based on dominant item type, "View all collections" link, fixed seed script duplicate issue, custom item type sort order
- Pro Badge Sidebar: added shadcn/ui Badge (outline variant) with "PRO" label next to Files and Images item types in the sidebar
- Codebase Audit Quick Wins: N+1 query fix (collections use _count + select), sort order indexOf bug fix, extracted duplicated formatDate to utils, replaced naive pluralize with static lookup map, dev warning for unknown icons, replaced $queryRawUnsafe with $queryRaw, sidebar width via Tailwind classes, added DynamicIcon component for React Compiler compatibility
- Auth Phase 1: NextAuth v5 with GitHub OAuth, split auth config (auth.config.ts edge + auth.ts Prisma adapter), JWT strategy, Next.js 16 proxy route protection for /dashboard/*, Session type extended with user.id
- Auth Phase 2: Email/password Credentials provider (split pattern with edge-safe placeholder), /api/auth/register endpoint with Zod 4 validation, bcrypt password hashing
- Auth Phase 3: Custom sign-in page (/sign-in) with credentials + GitHub OAuth, custom register page (/register) with validation and sonner toast, reusable UserAvatar component (image or initials), sidebar user area connected to real session with popover sign-out, explicit JWT callbacks for user data persistence
- Auth Phase 4: Email verification flow with Resend — verification token generation, email sending via Resend (onboarding@resend.dev), /verify-email page, sign-in blocking for unverified email/password users, resend verification endpoint
- Email Verification Toggle: NEXT_PUBLIC_EMAIL_VERIFICATION env var to enable/disable email verification (default: disabled), auto-verify on registration when disabled, central config.ts feature flag
- Forgot Password: forgot-password and reset-password pages, API endpoints, token generation/validation using VerificationToken with reset: prefix, Resend email, 1h expiry, rate limiting, "Forgot password?" link on sign-in
- Profile Page: /dashboard/profile with user info (avatar, email, join date, auth method), usage stats (total items/collections, per-type breakdown), change password dialog (credentials users only), delete account with DELETE confirmation, fixed all DB queries to filter by userId (dashboard, sidebar, profile), added shadcn/ui card/dialog/alert-dialog
- Auth Security Audit: full audit of all 16 auth files, report written to docs/audit-results/AUTH_SECURITY_REVIEW.md, 20 controls passed, 1 critical + 1 high + 1 medium + 2 low issues found
- Auth Security Fix (CRIT-01): verification and reset tokens now hashed with SHA-256 before DB storage using crypto.randomBytes(32) for 256-bit entropy, raw token sent only in email, lookup by hash — DB breach no longer exposes usable tokens
- Auth Security Fix (HIGH-01): added tokenInvalidBefore field to User model, JWT callback checks token issued-at against this timestamp, password reset and change-password endpoints set tokenInvalidBefore to invalidate all existing sessions — stolen JWTs no longer survive password resets
- Rate Limiting for Auth: Upstash Redis + @upstash/ratelimit with sliding window algorithm, new /api/auth/login rate-limit gate route, rate limiting on register (3/1hr), forgot-password (3/1hr), reset-password (5/15min), resend-verification (3/15min), login (5/15min via gate), fail-open behavior, 429 responses with Retry-After header, SignInForm two-step flow, existing token-based rate limits preserved as secondary defense
- Fix GitHub OAuth Redirect: replaced client-side signIn("github") with server-side Server Action (src/actions/auth.ts) using redirectTo instead of callbackUrl, GitHub button now uses <form action={signInWithGitHub}> for reliable single-click redirect to /dashboard
