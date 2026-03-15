import { prisma } from "@/lib/db";

const ITEM_INCLUDE = {
  itemType: true,
  tags: {
    include: {
      tag: true,
    },
  },
} as const;

export async function getPinnedItems() {
  const items = await prisma.item.findMany({
    where: { isPinned: true },
    include: ITEM_INCLUDE,
    orderBy: { updatedAt: "desc" },
  });

  return items.map(transformItem);
}

export async function getRecentItems(limit = 10) {
  const items = await prisma.item.findMany({
    include: ITEM_INCLUDE,
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return items.map(transformItem);
}

export async function getItemStats() {
  const [totalItems, favoriteItems, recentItems] = await Promise.all([
    prisma.item.count(),
    prisma.item.count({ where: { isFavorite: true } }),
    prisma.item.count({
      where: {
        updatedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  return { totalItems, favoriteItems, recentItems };
}

function transformItem(item: Awaited<ReturnType<typeof prisma.item.findMany<{ include: typeof ITEM_INCLUDE }>>>[number]) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    content: item.content,
    url: item.url,
    isPinned: item.isPinned,
    isFavorite: item.isFavorite,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
    itemType: {
      name: item.itemType.name,
      icon: item.itemType.icon,
      color: item.itemType.color,
    },
    tags: item.tags.map((t) => t.tag.name),
  };
}

export type DashboardItem = ReturnType<typeof transformItem>;

export async function getItemTypesWithCounts() {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: {
      _count: {
        select: { items: true },
      },
    },
    orderBy: { name: "asc" },
  });

  // Deduplicate by name — seed script can create duplicates because
  // PostgreSQL treats NULL as distinct in unique constraints (name, userId)
  const deduped = new Map<string, { id: string; name: string; icon: string; color: string; count: number }>();
  for (const type of types) {
    const existing = deduped.get(type.name);
    if (existing) {
      existing.count += type._count.items;
    } else {
      deduped.set(type.name, {
        id: type.id,
        name: type.name,
        icon: type.icon,
        color: type.color,
        count: type._count.items,
      });
    }
  }

  const SORT_ORDER = ["snippet", "prompt", "command", "note", "file", "image", "link"];
  const sortIndex = (name: string) => {
    const i = SORT_ORDER.indexOf(name);
    return i === -1 ? 99 : i;
  };

  return [...deduped.values()].sort(
    (a, b) => sortIndex(a.name) - sortIndex(b.name)
  );
}

export type SidebarItemType = Awaited<ReturnType<typeof getItemTypesWithCounts>>[number];
