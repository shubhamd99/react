import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

// ──────────────────────────────────────────
// System Item Types
// ──────────────────────────────────────────

const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { name: "command", icon: "Terminal", color: "#f97316", isSystem: true },
  { name: "note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { name: "file", icon: "File", color: "#6b7280", isSystem: true },
  { name: "image", icon: "Image", color: "#ec4899", isSystem: true },
  { name: "link", icon: "Link", color: "#10b981", isSystem: true },
] as const;

// ──────────────────────────────────────────
// Seed Items Data
// ──────────────────────────────────────────

interface SeedItem {
  title: string;
  description?: string;
  content?: string;
  language?: string;
  url?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  typeName: string;
  tags: string[];
}

interface SeedCollection {
  name: string;
  description: string;
  isFavorite?: boolean;
  items: SeedItem[];
}

const collections: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    isFavorite: true,
    items: [
      {
        title: "useDebounce Hook",
        description: "Custom hook for debouncing values with configurable delay",
        typeName: "snippet",
        language: "typescript",
        isPinned: true,
        tags: ["react", "hooks", "typescript"],
        content: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
      },
      {
        title: "useLocalStorage Hook",
        description: "Persist state to localStorage with SSR safety",
        typeName: "snippet",
        language: "typescript",
        tags: ["react", "hooks", "storage"],
        content: `import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("useLocalStorage write failed:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}`,
      },
      {
        title: "Compound Component Pattern",
        description: "Context-based compound component with implicit state sharing",
        typeName: "snippet",
        language: "typescript",
        isFavorite: true,
        tags: ["react", "patterns", "compound-components"],
        content: `import { createContext, useContext, useState, type ReactNode } from "react";

interface AccordionContextValue {
  openIndex: number | null;
  toggle: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used within Accordion");
  return ctx;
}

export function Accordion({ children }: { children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <AccordionContext value={{ openIndex, toggle }}>
      <div className="divide-y">{children}</div>
    </AccordionContext>
  );
}

export function AccordionItem({ index, title, children }: {
  index: number; title: string; children: ReactNode;
}) {
  const { openIndex, toggle } = useAccordion();
  return (
    <div>
      <button onClick={() => toggle(index)} className="w-full text-left p-4 font-medium">
        {title}
      </button>
      {openIndex === index && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        title: "Code Review Prompt",
        description: "Thorough code review with actionable feedback",
        typeName: "prompt",
        isPinned: true,
        tags: ["ai", "code-review", "prompt-engineering"],
        content: `You are a senior software engineer performing a code review. Analyze the following code and provide feedback in these categories:

1. **Bugs & Logic Errors** — Identify any bugs, edge cases, or logic flaws.
2. **Security** — Flag potential vulnerabilities (XSS, injection, auth issues).
3. **Performance** — Highlight unnecessary re-renders, N+1 queries, or heavy computations.
4. **Readability** — Suggest naming improvements, simplifications, or better abstractions.
5. **TypeScript** — Check for proper typing, missing types, or unsafe casts.

For each issue, provide:
- **Severity**: Critical / Warning / Suggestion
- **Location**: File and line reference
- **Fix**: Concrete code suggestion

Be direct. Skip praise. Focus on what needs to change.`,
      },
      {
        title: "Documentation Generator",
        description: "Generate comprehensive JSDoc and README documentation",
        typeName: "prompt",
        isFavorite: true,
        tags: ["ai", "documentation", "prompt-engineering"],
        content: `Generate documentation for the following code. Include:

1. **JSDoc comments** for every exported function, type, and interface
2. **Parameter descriptions** with types and default values
3. **Return type** documentation
4. **Usage examples** showing common use cases
5. **Edge cases** and important notes

Follow these rules:
- Use TypeScript types in JSDoc (not plain JS types)
- Include @example blocks with realistic code
- Mark optional parameters clearly
- Document thrown errors with @throws
- Keep descriptions concise but complete`,
      },
      {
        title: "Refactoring Assistant",
        description: "Guided refactoring with before/after comparisons",
        typeName: "prompt",
        tags: ["ai", "refactoring", "prompt-engineering"],
        content: `You are a refactoring specialist. Analyze the following code and suggest improvements:

## Analysis Steps
1. Identify code smells (duplication, long methods, deep nesting, unclear naming)
2. Check SOLID principle violations
3. Look for missing error handling
4. Evaluate testability

## Output Format
For each refactoring suggestion:
- **Problem**: What's wrong and why it matters
- **Before**: The current code (abbreviated)
- **After**: The refactored version
- **Rationale**: Why this is better (performance, readability, maintainability)

Prioritize suggestions by impact. Start with the highest-value changes.
Do not suggest changes that are purely cosmetic or style-related.`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Multi-stage Dockerfile",
        description: "Production-ready Node.js Dockerfile with multi-stage build",
        typeName: "snippet",
        language: "dockerfile",
        isPinned: true,
        tags: ["docker", "devops", "node"],
        content: `# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy to Production",
        description: "Full deployment script with health check and rollback",
        typeName: "command",
        tags: ["deploy", "devops", "scripts"],
        content: `# Build and push Docker image
docker build -t myapp:$(git rev-parse --short HEAD) . && \\
docker tag myapp:$(git rev-parse --short HEAD) registry.example.com/myapp:latest && \\
docker push registry.example.com/myapp:latest

# Deploy with health check
ssh prod-server "docker pull registry.example.com/myapp:latest && \\
  docker stop myapp-old || true && \\
  docker rename myapp myapp-old && \\
  docker run -d --name myapp -p 3000:3000 registry.example.com/myapp:latest && \\
  sleep 5 && curl -f http://localhost:3000/api/health || \\
  (docker stop myapp && docker rename myapp-old myapp && docker start myapp)"`,
      },
      {
        title: "GitHub Actions CI/CD Guide",
        description: "Official GitHub Actions documentation for CI/CD pipelines",
        typeName: "link",
        url: "https://docs.github.com/en/actions",
        tags: ["github", "ci-cd", "devops"],
        content: "GitHub Actions official docs — workflow syntax, reusable workflows, matrix builds, and deployment strategies.",
      },
      {
        title: "Docker Compose Documentation",
        description: "Docker Compose reference for multi-container setups",
        typeName: "link",
        url: "https://docs.docker.com/compose/",
        tags: ["docker", "devops", "infrastructure"],
        content: "Docker Compose official reference — services, networks, volumes, and environment configuration.",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    isFavorite: true,
    items: [
      {
        title: "Git Operations Cheatsheet",
        description: "Essential git commands for daily workflow",
        typeName: "command",
        isPinned: true,
        tags: ["git", "terminal", "workflow"],
        content: `# Interactive rebase last N commits
git rebase -i HEAD~5

# Stash with message and restore
git stash push -m "work in progress: feature-x"
git stash list
git stash pop stash@{0}

# Find which commit introduced a bug
git bisect start
git bisect bad HEAD
git bisect good v1.0.0

# Show changes in a specific commit
git show --stat <commit-hash>

# Cherry-pick without committing
git cherry-pick --no-commit <commit-hash>`,
      },
      {
        title: "Docker Container Management",
        description: "Common Docker commands for development",
        typeName: "command",
        isFavorite: true,
        tags: ["docker", "terminal", "containers"],
        content: `# Remove all stopped containers and dangling images
docker system prune -f

# View logs with follow and timestamps
docker logs -f --timestamps <container>

# Execute command in running container
docker exec -it <container> /bin/sh

# List containers with resource usage
docker stats --no-stream

# Copy file from container to host
docker cp <container>:/path/to/file ./local-path`,
      },
      {
        title: "Process Management",
        description: "Find and manage system processes",
        typeName: "command",
        tags: ["terminal", "processes", "debugging"],
        content: `# Find process using a specific port
lsof -i :3000
# or on Linux
ss -tlnp | grep :3000

# Kill process on a specific port
kill -9 $(lsof -t -i :3000)

# Monitor resource usage in real-time
top -o %MEM

# Find large files in current directory
du -sh * | sort -rh | head -20

# Watch a command output (refresh every 2s)
watch -n 2 "docker ps --format 'table {{.Names}}\t{{.Status}}'"`,
      },
      {
        title: "Package Manager Utilities",
        description: "npm, pnpm, and yarn productivity commands",
        typeName: "command",
        tags: ["npm", "terminal", "packages"],
        content: `# Check for outdated packages
npm outdated

# View dependency tree for a package
npm ls <package-name>

# Find why a package is installed
npm explain <package-name>

# Clean install (remove node_modules + lockfile reinstall)
rm -rf node_modules && npm ci

# List globally installed packages
npm ls -g --depth=0

# Check package bundle size before installing
npx bundlephobia <package-name>`,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS Documentation",
        description: "Official Tailwind CSS utility-first framework docs",
        typeName: "link",
        url: "https://tailwindcss.com/docs",
        isFavorite: true,
        tags: ["css", "tailwind", "design"],
        content: "Tailwind CSS official documentation — utility classes, configuration, responsive design, and dark mode.",
      },
      {
        title: "shadcn/ui Components",
        description: "Accessible component library built on Radix UI and Tailwind",
        typeName: "link",
        url: "https://ui.shadcn.com",
        isPinned: true,
        tags: ["components", "ui", "react"],
        content: "shadcn/ui — beautifully designed, accessible components. Copy-paste into your project, fully customizable.",
      },
      {
        title: "Realtime Colors",
        description: "Visualize color palettes on a real website template",
        typeName: "link",
        url: "https://www.realtimecolors.com",
        tags: ["colors", "design", "tools"],
        content: "Realtime Colors — generate and preview color palettes on a live website mockup. Great for picking accessible color schemes.",
      },
      {
        title: "Lucide Icons",
        description: "Beautiful and consistent open-source icon library",
        typeName: "link",
        url: "https://lucide.dev",
        tags: ["icons", "design", "react"],
        content: "Lucide — community-maintained fork of Feather Icons. 1500+ icons, tree-shakeable, React/Vue/Svelte support.",
      },
    ],
  },
];

// ──────────────────────────────────────────
// Main Seed Function
// ──────────────────────────────────────────

async function main(): Promise<void> {
  console.log("Seeding database...\n");

  // 1. Seed system item types
  console.log("1. Seeding system item types...");
  const typeMap = new Map<string, string>();

  for (const type of systemItemTypes) {
    // Cannot use upsert with compound unique (name, userId) when userId is null —
    // PostgreSQL treats NULL as distinct, so upsert never matches existing rows.
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true, userId: null },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color },
      });
      typeMap.set(type.name, existing.id);
    } else {
      const created = await prisma.itemType.create({
        data: {
          name: type.name,
          icon: type.icon,
          color: type.color,
          isSystem: true,
        },
      });
      typeMap.set(type.name, created.id);
    }
  }
  console.log(`   Created ${typeMap.size} item types`);

  // 2. Create demo user
  console.log("2. Creating demo user...");
  const hashedPassword = await bcrypt.hash("12345678", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {
      name: "Demo User",
      hashedPassword,
      emailVerified: new Date(),
    },
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`   User: ${user.email} (${user.id})`);

  // 3. Create tags
  console.log("3. Creating tags...");
  const allTags = new Set<string>();
  for (const collection of collections) {
    for (const item of collection.items) {
      for (const tag of item.tags) {
        allTags.add(tag);
      }
    }
  }

  const tagMap = new Map<string, string>();
  for (const tagName of allTags) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
    tagMap.set(tagName, tag.id);
  }
  console.log(`   Created ${tagMap.size} tags`);

  // 4. Create collections and items
  console.log("4. Creating collections and items...");
  let totalItems = 0;

  for (const collectionData of collections) {
    const defaultTypeName = collectionData.items[0]?.typeName;
    const defaultTypeId = defaultTypeName ? typeMap.get(defaultTypeName) : undefined;

    const collection = await prisma.collection.create({
      data: {
        name: collectionData.name,
        description: collectionData.description,
        isFavorite: collectionData.isFavorite ?? false,
        defaultTypeId: defaultTypeId ?? null,
        userId: user.id,
      },
    });

    for (const itemData of collectionData.items) {
      const itemTypeId = typeMap.get(itemData.typeName);
      if (!itemTypeId) {
        console.error(`   Unknown type: ${itemData.typeName}`);
        continue;
      }

      const item = await prisma.item.create({
        data: {
          title: itemData.title,
          description: itemData.description,
          content: itemData.content,
          language: itemData.language,
          url: itemData.url,
          isFavorite: itemData.isFavorite ?? false,
          isPinned: itemData.isPinned ?? false,
          contentType: "TEXT",
          userId: user.id,
          itemTypeId,
        },
      });

      // Link item to collection
      await prisma.itemCollection.create({
        data: {
          itemId: item.id,
          collectionId: collection.id,
        },
      });

      // Link tags
      for (const tagName of itemData.tags) {
        const tagId = tagMap.get(tagName);
        if (tagId) {
          await prisma.tagsOnItems.create({
            data: { itemId: item.id, tagId },
          });
        }
      }

      totalItems++;
    }

    console.log(`   Collection "${collectionData.name}" — ${collectionData.items.length} items`);
  }

  console.log(`\nSeed complete: 1 user, ${typeMap.size} types, ${collections.length} collections, ${totalItems} items, ${tagMap.size} tags`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
