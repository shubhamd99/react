# Current Feature

## Status

Completed

## Goals

Code quality quick wins from codebase audit (low risk, no auth dependency):

1. **Fix N+1 query in `getCollectionsWithTypes`** — loads full item rows just to compute dominant color and type list. Use `_count` and distinct types subquery instead.
2. **Fix `SORT_ORDER.indexOf` fallback bug** (`src/lib/db/items.ts:102`) — `?? 99` never fires because `indexOf` returns `-1`, not `null`. Unknown item types sort to front instead of end.
3. **Extract duplicated `formatDate`** — identical function in `PinnedItems.tsx` and `RecentItems.tsx`. Move to `src/lib/utils.ts`.
4. **Replace naive `pluralize` with lookup map** (`SidebarItemTypes.tsx:12`) — current impl breaks for names ending in "s" or irregular plurals. Use a static display name map.
5. **Add dev warning for unknown icon names** (`src/lib/icon-map.ts:22`) — silent fallback to `File` icon makes typos hard to debug.
6. **Replace `$queryRawUnsafe` in test script** (`scripts/test-db.ts:15`) — use safe `$queryRaw` tagged template instead.
7. **Sidebar width: replace inline style with Tailwind classes** (`Sidebar.tsx:86`) — remove magic number `240`, use `w-60`/`w-0` classes.

## Notes

- No auth-related changes (auth not implemented yet)
- All fixes are isolated, low-risk refactors or bug fixes
- N+1 fix is the highest priority item — use Prisma ORM only (no raw SQL)
- Do not touch mock data file (src/lib/mock-data.ts)

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
