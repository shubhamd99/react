// Mock data for dashboard UI development
// Remove once database integration is complete

export interface MockUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface MockItemType {
  id: string;
  name: string;
  icon: string;
  color: string;
  isSystem: boolean;
}

export interface MockTag {
  id: string;
  name: string;
}

export interface MockItem {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  url: string | null;
  language: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  tags: string[];
  collectionIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MockCollection {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemIds: string[];
}

// Current user
export const currentUser: MockUser = {
  id: "user_1",
  name: "Dev Stash",
  email: "demo@devstash.io",
  image: null,
  isPro: true,
};

// System item types
export const itemTypes: MockItemType[] = [
  {
    id: "type_snippet",
    name: "snippet",
    icon: "Code",
    color: "#3b82f6",
    isSystem: true,
  },
  {
    id: "type_prompt",
    name: "prompt",
    icon: "Sparkles",
    color: "#8b5cf6",
    isSystem: true,
  },
  {
    id: "type_command",
    name: "command",
    icon: "Terminal",
    color: "#f97316",
    isSystem: true,
  },
  {
    id: "type_note",
    name: "note",
    icon: "StickyNote",
    color: "#fde047",
    isSystem: true,
  },
  {
    id: "type_file",
    name: "file",
    icon: "File",
    color: "#6b7280",
    isSystem: true,
  },
  {
    id: "type_image",
    name: "image",
    icon: "Image",
    color: "#ec4899",
    isSystem: true,
  },
  {
    id: "type_link",
    name: "link",
    icon: "Link",
    color: "#10b981",
    isSystem: true,
  },
];

// Items
export const items: MockItem[] = [
  {
    id: "item_1",
    title: "useDebounce Hook",
    description: "A custom React hook for debouncing values",
    content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    url: null,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_snippet",
    tags: ["react", "hooks", "debounce"],
    collectionIds: ["col_1"],
    createdAt: "2026-03-12",
    updatedAt: "2026-03-12",
  },
  {
    id: "item_2",
    title: "Code Review Prompt",
    description: "AI prompt for thorough code reviews",
    content: `Review the following code for:
1. Security vulnerabilities
2. Performance issues
3. Code style and best practices
4. Edge cases and error handling

Provide specific, actionable feedback with code examples where applicable.`,
    url: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    tags: ["ai", "code-review", "productivity"],
    collectionIds: ["col_2"],
    createdAt: "2026-03-08",
    updatedAt: "2026-03-08",
  },
  {
    id: "item_3",
    title: "Git Rebase Interactive",
    description: "Squash commits with interactive rebase",
    content: "git rebase -i HEAD~3",
    url: null,
    language: "bash",
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_command",
    tags: ["git", "rebase", "commits"],
    collectionIds: ["col_3"],
    createdAt: "2026-03-05",
    updatedAt: "2026-03-05",
  },
  {
    id: "item_4",
    title: "API Design Notes",
    description: "Best practices for REST API design",
    content: `## REST API Best Practices

- Use nouns for resource URLs, not verbs
- Use HTTP methods correctly (GET, POST, PUT, PATCH, DELETE)
- Return appropriate status codes
- Version your API (e.g., /api/v1/)
- Use pagination for list endpoints
- Include HATEOAS links where useful`,
    url: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    tags: ["api", "rest", "design"],
    collectionIds: ["col_4", "col_5"],
    createdAt: "2026-03-02",
    updatedAt: "2026-03-02",
  },
  {
    id: "item_5",
    title: "MDN Web Docs",
    description: "Mozilla Developer Network documentation",
    content: null,
    url: "https://developer.mozilla.org",
    language: null,
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_link",
    tags: ["documentation", "web", "reference"],
    collectionIds: ["col_5"],
    createdAt: "2026-02-28",
    updatedAt: "2026-02-28",
  },
  {
    id: "item_6",
    title: "useFetch Hook",
    description: "Generic data fetching hook with loading and error states",
    content: `import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}`,
    url: null,
    language: "typescript",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    tags: ["react", "hooks", "fetch"],
    collectionIds: ["col_1"],
    createdAt: "2026-03-10",
    updatedAt: "2026-03-10",
  },
  {
    id: "item_7",
    title: "System Design Prompt",
    description: "Prompt for system design discussions",
    content: `You are a senior software architect. Help me design a system for [SYSTEM].

Consider:
- Scalability requirements
- Data model design
- API contracts
- Caching strategy
- Failure modes and resilience`,
    url: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    tags: ["ai", "system-design", "architecture"],
    collectionIds: ["col_2"],
    createdAt: "2026-03-06",
    updatedAt: "2026-03-06",
  },
  {
    id: "item_8",
    title: "Docker Prune All",
    description: "Remove all unused Docker resources",
    content: "docker system prune -a --volumes -f",
    url: null,
    language: "bash",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_command",
    tags: ["docker", "cleanup", "devops"],
    collectionIds: ["col_3"],
    createdAt: "2026-03-04",
    updatedAt: "2026-03-04",
  },
  {
    id: "item_9",
    title: "Meeting Notes Template",
    description: "Standard template for engineering meeting notes",
    content: `## Meeting: [Title]
**Date:** [Date]
**Attendees:** [Names]

### Agenda
1.

### Discussion

### Action Items
- [ ]

### Follow-up
`,
    url: null,
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    tags: ["template", "meetings"],
    collectionIds: ["col_4"],
    createdAt: "2026-03-01",
    updatedAt: "2026-03-01",
  },
  {
    id: "item_10",
    title: "React Documentation",
    description: "Official React 19 documentation",
    content: null,
    url: "https://react.dev",
    language: null,
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_link",
    tags: ["react", "documentation", "reference"],
    collectionIds: ["col_1", "col_5"],
    createdAt: "2026-02-25",
    updatedAt: "2026-02-25",
  },
];

// Collections
export const collections: MockCollection[] = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemIds: ["item_1", "item_6", "item_10"],
  },
  {
    id: "col_2",
    name: "AI Prompts",
    description: "Collection of effective AI prompts",
    isFavorite: false,
    itemIds: ["item_2", "item_7"],
  },
  {
    id: "col_3",
    name: "Git Commands",
    description: "Useful git commands and workflows",
    isFavorite: true,
    itemIds: ["item_3", "item_8"],
  },
  {
    id: "col_4",
    name: "Project Notes",
    description: "Notes for ongoing projects",
    isFavorite: false,
    itemIds: ["item_4", "item_9"],
  },
  {
    id: "col_5",
    name: "API Resources",
    description: "Helpful API documentation and links",
    isFavorite: false,
    itemIds: ["item_4", "item_5", "item_10"],
  },
  {
    id: "col_6",
    name: "Interview Prep",
    description: "Code snippets for technical interviews",
    isFavorite: true,
    itemIds: ["item_1", "item_3", "item_4", "item_6", "item_7"],
  },
];
