---
name: DevStash project context
description: Key architectural facts about DevStash relevant to code review and audit work
type: project
---

DevStash is a developer knowledge hub built with Next.js App Router, React 19, Tailwind CSS v4, Prisma 7 on Neon PostgreSQL, Zustand 5, and shadcn/ui.

**Why:** Personal project by Shubham targeting SDE-3 skill development. Currently in early development (dashboard phase only).

**How to apply:** When auditing or contributing code, understand that:
- Authentication is not yet implemented — all DB queries are unscoped (no userId filter in dashboard queries)
- Mock data file (`src/lib/mock-data.ts`) is still active and used by `SidebarUserArea`
- All Prisma queries run without user scoping — this is a known pre-auth state, not a reportable issue per se, but becomes critical once auth lands
- The `src/generated/prisma/` directory is gitignored (Prisma 7 generates to src/)
- Tailwind CSS v4 uses CSS-based config in `globals.css` — no `tailwind.config.ts` exists by design
