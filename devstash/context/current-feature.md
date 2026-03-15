# Current Feature: Auth Phase 2 — Email/Password Credentials

## Status

In Progress

## Goals

- Add Credentials provider for email/password authentication
- Create registration API route at `/api/auth/register` (name, email, password, confirmPassword)
- Validate passwords match, check for existing user, hash with bcryptjs
- Update `auth.config.ts` with Credentials provider placeholder (`authorize: () => null`)
- Update `auth.ts` to override Credentials with actual bcrypt validation
- Ensure GitHub OAuth continues to work alongside credentials

## Notes

- bcryptjs already installed
- Password field (`hashedPassword`) already exists on User model
- Split auth pattern: `auth.config.ts` (edge-safe placeholder) + `auth.ts` (full Prisma+bcrypt logic)
- Registration endpoint: `POST /api/auth/register` — returns success/error response
- Test via curl, then `/api/auth/signin` form, verify redirect to `/dashboard`
- Reference: https://authjs.dev/getting-started/authentication/credentials

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
