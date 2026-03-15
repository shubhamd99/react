# Item Types Reference

> All 7 system-defined item types in DevStash, their data models, and display characteristics.

---

## Type Definitions

### 1. Snippet

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `snippet`           |
| **Icon**    | `Code` (Lucide)     |
| **Color**   | `#3b82f6` (Blue)    |
| **System**  | Yes                 |
| **Content** | TEXT                |
| **URL**     | `/items/snippets`   |

**Purpose**: Store reusable code blocks — hooks, patterns, boilerplate, utilities.

**Key fields**: `content` (Markdown/code), `language` (syntax highlighting hint, e.g. `"typescript"`, `"dockerfile"`).

---

### 2. Prompt

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `prompt`            |
| **Icon**    | `Sparkles` (Lucide) |
| **Color**   | `#8b5cf6` (Purple)  |
| **System**  | Yes                 |
| **Content** | TEXT                |
| **URL**     | `/items/prompts`    |

**Purpose**: Save AI prompts — system messages, code review templates, refactoring guides, documentation generators.

**Key fields**: `content` (Markdown text of the prompt).

---

### 3. Command

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `command`           |
| **Icon**    | `Terminal` (Lucide) |
| **Color**   | `#f97316` (Orange)  |
| **System**  | Yes                 |
| **Content** | TEXT                |
| **URL**     | `/items/commands`   |

**Purpose**: Store shell commands, CLI cheatsheets, deployment scripts, package manager utilities.

**Key fields**: `content` (command text, often multi-line with comments).

---

### 4. Note

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `note`              |
| **Icon**    | `StickyNote` (Lucide)|
| **Color**   | `#fde047` (Yellow)  |
| **System**  | Yes                 |
| **Content** | TEXT                |
| **URL**     | `/items/notes`      |

**Purpose**: General-purpose Markdown notes — meeting notes, design decisions, TIL entries, learning logs.

**Key fields**: `content` (Markdown text).

---

### 5. File

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `file`              |
| **Icon**    | `File` (Lucide)     |
| **Color**   | `#6b7280` (Gray)    |
| **System**  | Yes                 |
| **Content** | FILE                |
| **URL**     | `/items/files`      |
| **Tier**    | **Pro only**        |

**Purpose**: Upload and store arbitrary files (PDFs, configs, documents) via Cloudflare R2.

**Key fields**: `fileUrl` (R2 URL), `fileName` (original name), `fileSize` (bytes). `content` is null.

---

### 6. Image

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `image`             |
| **Icon**    | `Image` (Lucide)    |
| **Color**   | `#ec4899` (Pink)    |
| **System**  | Yes                 |
| **Content** | FILE                |
| **URL**     | `/items/images`     |
| **Tier**    | **Pro only**        |

**Purpose**: Upload and store images (screenshots, diagrams, design references) via Cloudflare R2.

**Key fields**: `fileUrl` (R2 URL), `fileName` (original name), `fileSize` (bytes). `content` is null.

---

### 7. Link

| Property    | Value               |
| ----------- | ------------------- |
| **Name**    | `link`              |
| **Icon**    | `Link` (Lucide)     |
| **Color**   | `#10b981` (Emerald) |
| **System**  | Yes                 |
| **Content** | TEXT                |
| **URL**     | `/items/links`      |

**Purpose**: Bookmark external URLs — documentation, tools, design references, articles.

**Key fields**: `url` (the bookmarked URL), `content` (optional notes/description about the link).

---

## Classification Summary

### By Content Model

| Classification | Types                          | Storage                          |
| -------------- | ------------------------------ | -------------------------------- |
| **TEXT**       | snippet, prompt, command, note | `content` field (Markdown)       |
| **FILE**       | file, image                    | `fileUrl`/`fileName`/`fileSize` (Cloudflare R2) |
| **URL + TEXT** | link                           | `url` field + optional `content` |

### By Tier

| Tier     | Types                                      |
| -------- | ------------------------------------------ |
| **Free** | snippet, prompt, command, note, link       |
| **Pro**  | file, image (require Cloudflare R2 upload) |

---

## Shared Properties (All Types)

Every item, regardless of type, has these fields:

| Field         | Type      | Description                          |
| ------------- | --------- | ------------------------------------ |
| `id`          | `cuid()`  | Unique identifier                    |
| `title`       | `String`  | Required display name                |
| `description` | `String?` | Optional subtitle/summary            |
| `contentType` | `enum`    | `TEXT` or `FILE`                     |
| `language`    | `String?` | Programming language (for code)      |
| `isFavorite`  | `Boolean` | Starred by user                      |
| `isPinned`    | `Boolean` | Pinned to top of lists               |
| `userId`      | `String`  | Owner reference                      |
| `itemTypeId`  | `String`  | Reference to `ItemType`              |
| `tags`        | relation  | Many-to-many via `TagsOnItems`       |
| `collections` | relation  | Many-to-many via `ItemCollection`    |
| `createdAt`   | `DateTime`| Auto-set on creation                 |
| `updatedAt`   | `DateTime`| Auto-updated on modification         |

---

## Display Differences

| Aspect              | TEXT types                        | FILE types                     | Link type                        |
| ------------------- | --------------------------------- | ------------------------------ | -------------------------------- |
| **Card preview**    | First lines of `content`          | File name + size               | URL + optional notes             |
| **Drawer view**     | Markdown editor                   | File preview/download          | Clickable URL + notes editor     |
| **Syntax highlight**| Yes (snippet, command)            | N/A                            | N/A                              |
| **Border color**    | Matches type color                | Matches type color             | Matches type color               |
| **Icon**            | From `ItemType.icon` via icon-map | From `ItemType.icon`           | From `ItemType.icon`             |

---

## Icon Mapping (Runtime)

Icons are resolved at runtime via `src/lib/icon-map.tsx`:

```typescript
const iconMap: Record<string, LucideIcon> = {
  Code,        // snippet
  Sparkles,    // prompt
  Terminal,    // command
  StickyNote,  // note
  File,        // file (also fallback for unknown icons)
  Image,       // image
  Link,        // link
};
```

The `DynamicIcon` component accepts an icon `name` string and renders the corresponding Lucide icon. Unknown names fall back to `File`.

---

## ItemType Schema

```prisma
model ItemType {
  id       String  @id @default(cuid())
  name     String            // "snippet", "prompt", etc.
  icon     String            // Lucide icon name
  color    String            // Hex color
  isSystem Boolean @default(false)  // true for all 7 system types
  userId   String?           // null for system types
  user     User?
  items    Item[]

  @@unique([name, userId])   // unique type name per user
}
```

System types have `isSystem: true` and `userId: null`. Custom types (planned Pro feature) will have `isSystem: false` and a non-null `userId`.
