# DevStash — Project Overview

> A fast, searchable, AI-enhanced hub for all developer knowledge and resources.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Target Users](#target-users)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Data Models (Prisma)](#data-models-prisma)
- [Item Types Reference](#item-types-reference)
- [Features](#features)
- [Monetization (Freemium)](#monetization-freemium)
- [UI/UX Guidelines](#uiux-guidelines)
- [API Routes (Planned)](#api-routes-planned)
- [Project Links & Resources](#project-links--resources)

---

## Problem Statement

Developers keep their essentials scattered across too many surfaces:

| What          | Where it ends up              |
| ------------- | ----------------------------- |
| Code snippets | VS Code, Notion, Gists        |
| AI prompts    | Chat histories                |
| Context files | Buried in project directories |
| Useful links  | Browser bookmarks             |
| Docs & notes  | Random folders                |
| Commands      | `.txt` files, bash history    |
| Templates     | GitHub Gists                  |

This creates **context switching**, **lost knowledge**, and **inconsistent workflows**. DevStash solves this by providing one unified, fast, searchable, AI-enhanced hub for all developer knowledge and resources.

---

## Target Users

| Persona                        | Core Need                                                        |
| ------------------------------ | ---------------------------------------------------------------- |
| **Everyday Developer**         | Quick access to snippets, prompts, commands, and links           |
| **AI-first Developer**         | Store and organize prompts, contexts, system messages, workflows |
| **Content Creator / Educator** | Manage code blocks, explanations, course notes                   |
| **Full-stack Builder**         | Collect patterns, boilerplates, API examples                     |

---

## Tech Stack

| Layer              | Technology                  | Notes                                                          |
| ------------------ | --------------------------- | -------------------------------------------------------------- |
| **Framework**      | Next.js 16 / React 19       | SSR pages + API routes, single repo                            |
| **Language**       | TypeScript                  | Full type safety across client and server                      |
| **Database**       | Neon PostgreSQL             | Serverless Postgres in the cloud                               |
| **ORM**            | Prisma 7 (latest)           | Schema-first, migrations only (never `db push`)                |
| **Caching**        | Redis (planned)             | Optional layer for search and session caching                  |
| **File Storage**   | Cloudflare R2               | S3-compatible object storage for file/image uploads            |
| **Authentication** | NextAuth v5                 | Email/password + GitHub OAuth                                  |
| **AI**             | OpenAI `gpt-5-nano`         | Auto-tagging, summaries, code explanation, prompt optimization |
| **CSS**            | Tailwind CSS v4 + shadcn/ui | Utility-first styling with accessible component primitives     |

### Key Technical Decisions

- **Migrations only**: Never use `db push` or directly modify database structure. All schema changes go through Prisma migrations, run first in dev, then in prod.
- **Single codebase**: Frontend, API routes, and server logic all live in one Next.js repo to minimize overhead.
- **SSR with dynamic components**: Pages are server-rendered where possible, with client components for interactive features (drawers, editors, search).

---

## Architecture Overview

```
Client (Next.js SSR + React 19)
    |
    v
API Routes (Next.js Route Handlers)
    |
    +---> Prisma ORM ---> Neon PostgreSQL
    |
    +---> Cloudflare R2 (file/image uploads)
    |
    +---> OpenAI gpt-5-nano (AI features)
    |
    +---> NextAuth v5 (auth sessions)
    |
    +---> Redis (caching, optional)
```

### Page Structure

```
/                       -> Dashboard (collections grid + recent items)
/items/snippets         -> All snippet items
/items/prompts          -> All prompt items
/items/commands         -> All command items
/items/notes            -> All note items
/items/files            -> All file items (Pro)
/items/images           -> All image items (Pro)
/items/links            -> All link items
/collections            -> All collections
/collections/[id]       -> Single collection view
/settings               -> User settings, subscription
/auth/signin            -> Sign in page
/auth/signup            -> Sign up page
```

---

## Data Models (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ──────────────────────────────────────────
// User (extends NextAuth default User model)
// ──────────────────────────────────────────

model User {
  id                   String    @id @default(cuid())
  name                 String?
  email                String    @unique
  emailVerified        DateTime?
  image                String?
  hashedPassword       String?

  // Subscription
  isPro                Boolean   @default(false)
  stripeCustomerId     String?   @unique
  stripeSubscriptionId String?   @unique

  // Relations
  items                Item[]
  itemTypes            ItemType[]
  collections          Collection[]
  accounts             Account[]
  sessions             Session[]

  createdAt            DateTime  @default(now())
  updatedAt            DateTime  @updatedAt
}

// NextAuth required models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ──────────────────────────────────────────
// Item
// ──────────────────────────────────────────

model Item {
  id          String   @id @default(cuid())
  title       String
  description String?

  // Content: text-based items store content directly,
  // file-based items store a URL to Cloudflare R2
  contentType ContentType @default(TEXT)
  content     String?     // Markdown text content (null if file)
  fileUrl     String?     // Cloudflare R2 URL (null if text)
  fileName    String?     // Original filename (null if text)
  fileSize    Int?        // File size in bytes (null if text)
  url         String?     // For link-type items

  // Metadata
  language    String?     // Programming language (optional, for code)
  isFavorite  Boolean     @default(false)
  isPinned    Boolean     @default(false)

  // Relations
  userId      String
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemTypeId  String
  itemType    ItemType    @relation(fields: [itemTypeId], references: [id])
  tags        TagsOnItems[]
  collections ItemCollection[]

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([userId])
  @@index([itemTypeId])
  @@index([isFavorite])
  @@index([isPinned])
}

enum ContentType {
  TEXT
  FILE
}

// ──────────────────────────────────────────
// ItemType
// ──────────────────────────────────────────

model ItemType {
  id       String  @id @default(cuid())
  name     String  // e.g. "snippet", "prompt", "note"
  icon     String  // Lucide icon name: "Code", "Sparkles", etc.
  color    String  // Hex color: "#3b82f6"
  isSystem Boolean @default(false) // System types cannot be modified

  // Relations
  userId   String? // null for system types
  user     User?   @relation(fields: [userId], references: [id], onDelete: Cascade)
  items    Item[]

  @@unique([name, userId]) // Unique type name per user (system types have null userId)
}

// ──────────────────────────────────────────
// Collection
// ──────────────────────────────────────────

model Collection {
  id            String  @id @default(cuid())
  name          String  // e.g. "React Hooks", "Prototype Prompts"
  description   String?
  isFavorite    Boolean @default(false)
  defaultTypeId String? // Default item type when creating items in this collection

  // Relations
  userId        String
  user          User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  items         ItemCollection[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([userId])
  @@index([isFavorite])
}

// ──────────────────────────────────────────
// ItemCollection (many-to-many join table)
// ──────────────────────────────────────────

model ItemCollection {
  itemId       String
  collectionId String

  item         Item       @relation(fields: [itemId], references: [id], onDelete: Cascade)
  collection   Collection @relation(fields: [collectionId], references: [id], onDelete: Cascade)

  addedAt      DateTime   @default(now())

  @@id([itemId, collectionId])
}

// ──────────────────────────────────────────
// Tag
// ──────────────────────────────────────────

model Tag {
  id    String        @id @default(cuid())
  name  String        @unique
  items TagsOnItems[]
}

model TagsOnItems {
  itemId String
  tagId  String

  item   Item @relation(fields: [itemId], references: [id], onDelete: Cascade)
  tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([itemId, tagId])
}
```

### Entity Relationships Summary

```
User 1---* Item           (a user owns many items)
User 1---* Collection     (a user owns many collections)
User 1---* ItemType       (a user can create custom types)
Item *---1 ItemType        (each item has one type)
Item *---* Collection      (via ItemCollection join table)
Item *---* Tag             (via TagsOnItems join table)
```

---

## Item Types Reference

DevStash ships with 7 system-defined item types. Users cannot modify or delete these. Custom types (Pro feature, planned for later) will follow the same schema.

| Type        | Content Model | Color               | Icon (Lucide) | URL Pattern       |
| ----------- | ------------- | ------------------- | ------------- | ----------------- |
| **Snippet** | `TEXT`        | `#3b82f6` (Blue)    | `Code`        | `/items/snippets` |
| **Prompt**  | `TEXT`        | `#8b5cf6` (Purple)  | `Sparkles`    | `/items/prompts`  |
| **Command** | `TEXT`        | `#f97316` (Orange)  | `Terminal`    | `/items/commands` |
| **Note**    | `TEXT`        | `#fde047` (Yellow)  | `StickyNote`  | `/items/notes`    |
| **File**    | `FILE` (Pro)  | `#6b7280` (Gray)    | `File`        | `/items/files`    |
| **Image**   | `FILE` (Pro)  | `#ec4899` (Pink)    | `Image`       | `/items/images`   |
| **Link**    | `TEXT` (URL)  | `#10b981` (Emerald) | `Link`        | `/items/links`    |

### Content Model Rules

- **TEXT types** (snippet, prompt, command, note): Content is stored directly in the `content` field as Markdown.
- **FILE types** (file, image): Files are uploaded to Cloudflare R2. The `fileUrl`, `fileName`, and `fileSize` fields are populated. `content` is null.
- **Link type**: The `url` field stores the link URL. The `content` field can optionally hold notes about the link.

---

## Features

### A. Items & Item Types

- Items are the core unit of DevStash. Each item has a type (snippet, prompt, note, command, file, image, link).
- Items open in a quick-access **drawer** for fast viewing and editing.
- Items support Markdown editing (for text types) and file upload (for file types).
- Items can be favorited, pinned to top, and tagged.

### B. Collections

- Users can create named collections (e.g., "React Patterns", "Interview Prep", "Context Files").
- An item can belong to **multiple collections** simultaneously.
- Collections can have a default item type for quick creation.
- Collections can be favorited.

### C. Search

Full-text search across:

- Item content
- Item titles
- Tags
- Item types

### D. Authentication

- **Email/password** sign-up and sign-in
- **GitHub OAuth** sign-in
- Managed via NextAuth v5

### E. General Features

- Favorite collections and items
- Pin items to top of lists
- Recently used items section
- Import code from file
- Markdown editor for text-type items
- File upload for file/image types (via Cloudflare R2)
- Export data as JSON/ZIP (Pro)
- Dark mode by default, light mode optional
- Add/remove items to/from multiple collections
- View which collections an item belongs to

### F. AI Features (Pro Only)

All AI features use the OpenAI `gpt-5-nano` model via API routes.

| Feature              | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| **AI Auto-tag**      | Suggests relevant tags based on item content                   |
| **AI Summaries**     | Generates a concise summary of an item                         |
| **AI Explain Code**  | Explains what a code snippet does in plain language            |
| **Prompt Optimizer** | Rewrites and improves AI prompts for clarity and effectiveness |

---

## Monetization (Freemium)

### Free Tier

- 50 items total
- 3 collections
- All system types **except** file and image
- Basic search
- No file or image uploads
- No AI features

### Pro Tier — $8/month or $72/year

- Unlimited items
- Unlimited collections
- File and image uploads (Cloudflare R2)
- Custom types (planned for later)
- AI auto-tagging, code explanation, prompt optimizer
- Export data (JSON/ZIP)
- Priority support

### Implementation Notes

- Stripe is used for payment processing. The `User` model stores `stripeCustomerId` and `stripeSubscriptionId`.
- During development, all users have access to all features (Pro restrictions are enforced only in production).
- Free tier limits are enforced server-side in API routes and validated client-side for UX feedback.

---

## UI/UX Guidelines

### Design Principles

- Modern, minimal, developer-focused aesthetic
- Dark mode by default, light mode optional
- Clean typography, generous whitespace
- Subtle borders and shadows
- Syntax highlighting for code blocks (use a library like `prism-react-renderer` or `shiki`)
- **Reference**: Notion, Linear, Raycast

### Layout

- **Sidebar** (collapsible): Item types with links (Snippets, Commands, etc.), latest collections
- **Main content area**: Grid of color-coded collection cards (background color based on dominant item type). Items displayed as color-coded cards (border color matches type).
- **Drawer**: Individual items open in a slide-out drawer for quick access and editing.
- **Responsive**: Desktop-first, but mobile-usable. Sidebar becomes a drawer on mobile.

### Micro-interactions

- Smooth transitions on navigation and state changes
- Hover states on cards (subtle scale or shadow lift)
- Toast notifications for CRUD actions (created, updated, deleted, copied)
- Loading skeletons for async data fetching

---

## API Routes (Planned)

These are the planned Next.js API route handlers. All routes require authentication unless noted.

### Items

```
GET    /api/items              -> List items (with filters: type, tag, search, favorites, pinned)
POST   /api/items              -> Create item
GET    /api/items/[id]         -> Get single item
PATCH  /api/items/[id]         -> Update item
DELETE /api/items/[id]         -> Delete item
POST   /api/items/[id]/favorite   -> Toggle favorite
POST   /api/items/[id]/pin        -> Toggle pin
```

### Collections

```
GET    /api/collections              -> List collections
POST   /api/collections              -> Create collection
GET    /api/collections/[id]         -> Get collection with items
PATCH  /api/collections/[id]         -> Update collection
DELETE /api/collections/[id]         -> Delete collection
POST   /api/collections/[id]/items   -> Add item(s) to collection
DELETE /api/collections/[id]/items   -> Remove item(s) from collection
```

### Tags

```
GET    /api/tags                     -> List all tags
POST   /api/tags                     -> Create tag
DELETE /api/tags/[id]                -> Delete tag
```

### Search

```
GET    /api/search?q=...             -> Full-text search across items
```

### AI (Pro only)

```
POST   /api/ai/auto-tag             -> Generate tag suggestions for an item
POST   /api/ai/summarize            -> Generate summary for an item
POST   /api/ai/explain              -> Explain code snippet
POST   /api/ai/optimize-prompt      -> Optimize a prompt
```

### Auth

```
POST   /api/auth/[...nextauth]      -> NextAuth catch-all route
```

### Payments (Stripe)

```
POST   /api/stripe/checkout         -> Create Stripe checkout session
POST   /api/stripe/webhook          -> Handle Stripe webhook events
GET    /api/stripe/portal           -> Redirect to Stripe customer portal
```

### File Upload

```
POST   /api/upload                   -> Upload file to Cloudflare R2, return URL
```

---

## Project Links & Resources

### Core Documentation

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Prisma 7 Docs](https://www.prisma.io/docs)
- [NextAuth v5 Docs](https://authjs.dev)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)

### Services

- [Neon PostgreSQL](https://neon.tech)
- [Cloudflare R2](https://developers.cloudflare.com/r2)
- [Stripe](https://stripe.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

### UI References

- [Notion](https://notion.so) — Clean layout, sidebar navigation
- [Linear](https://linear.app) — Minimal dev-focused UI, keyboard shortcuts
- [Raycast](https://raycast.com) — Fast access, command palette UX

### Useful Libraries

- [`prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer) or [`shiki`](https://shiki.matsu.io) — Syntax highlighting
- [`lucide-react`](https://lucide.dev) — Icon set (used for item type icons)
- [`react-hot-toast`](https://react-hot-toast.com) or [`sonner`](https://sonner.emilkowal.dev) — Toast notifications
- [`@uiw/react-md-editor`](https://github.com/uiwjs/react-md-editor) or [`tiptap`](https://tiptap.dev) — Markdown editor
- [`cmdk`](https://cmdk.paco.me) — Command palette (Raycast-style search)
- [`zustand`](https://zustand-demo.pmnd.rs) — Lightweight client state management

---

## Seed Data: System Item Types

Use this in your Prisma seed script (`prisma/seed.ts`) to create the default system types:

```typescript
// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { name: "command", icon: "Terminal", color: "#f97316", isSystem: true },
  { name: "note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { name: "file", icon: "File", color: "#6b7280", isSystem: true },
  { name: "image", icon: "Image", color: "#ec4899", isSystem: true },
  { name: "link", icon: "Link", color: "#10b981", isSystem: true },
] as const;

async function main(): Promise<void> {
  console.log("Seeding system item types...");

  for (const type of systemItemTypes) {
    await prisma.itemType.upsert({
      where: {
        // Use the unique constraint: name + null userId for system types
        name_userId: { name: type.name, userId: null as unknown as string },
      },
      update: { icon: type.icon, color: type.color },
      create: {
        name: type.name,
        icon: type.icon,
        color: type.color,
        isSystem: true,
        // userId is null for system types
      },
    });
  }

  console.log("System item types seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## Environment Variables

```env
# .env.local

# Database
DATABASE_URL="postgresql://user:password@host:5432/devstash?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Cloudflare R2
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="devstash-uploads"
R2_PUBLIC_URL="https://your-r2-public-url.com"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# Redis (optional)
REDIS_URL="redis://localhost:6379"
```
