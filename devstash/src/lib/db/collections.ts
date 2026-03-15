import { prisma } from "@/lib/db";

export async function getCollectionsWithTypes(userId: string) {
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      _count: { select: { items: true } },
      items: {
        include: {
          item: {
            select: {
              itemType: {
                select: { id: true, name: true, icon: true, color: true },
              },
            },
          },
        },
      },
    },
    orderBy: [{ isFavorite: "desc" }, { updatedAt: "desc" }],
  });

  return collections.map((collection) => {
    // Count occurrences of each type to find the dominant one
    const typeCounts = new Map<string, { count: number; color: string }>();
    const uniqueTypes = new Map<string, { id: string; name: string; icon: string; color: string }>();

    for (const ic of collection.items) {
      const type = ic.item.itemType;
      const existing = typeCounts.get(type.id);
      typeCounts.set(type.id, {
        count: (existing?.count ?? 0) + 1,
        color: type.color,
      });
      if (!uniqueTypes.has(type.id)) {
        uniqueTypes.set(type.id, type);
      }
    }

    // Dominant type color for border
    let borderColor = "#6b7280"; // default gray
    let maxCount = 0;
    for (const { count, color } of typeCounts.values()) {
      if (count > maxCount) {
        maxCount = count;
        borderColor = color;
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: collection._count.items,
      borderColor,
      types: [...uniqueTypes.values()],
    };
  });
}

function transformSidebarCollection(collection: {
  id: string;
  name: string;
  isFavorite: boolean;
  _count: { items: number };
  items: { item: { itemType: { id: string; color: string } } }[];
}) {
  const typeCounts = new Map<string, { count: number; color: string }>();
  for (const ic of collection.items) {
    const type = ic.item.itemType;
    const existing = typeCounts.get(type.id);
    typeCounts.set(type.id, {
      count: (existing?.count ?? 0) + 1,
      color: type.color,
    });
  }

  let dominantColor = "#6b7280";
  let maxCount = 0;
  for (const { count, color } of typeCounts.values()) {
    if (count > maxCount) {
      maxCount = count;
      dominantColor = color;
    }
  }

  return {
    id: collection.id,
    name: collection.name,
    isFavorite: collection.isFavorite,
    itemCount: collection._count.items,
    dominantColor,
  };
}

const SIDEBAR_COLLECTION_INCLUDE = {
  _count: { select: { items: true } },
  items: {
    include: {
      item: {
        select: {
          itemType: {
            select: { id: true, color: true },
          },
        },
      },
    },
  },
} as const;

export async function getSidebarCollections(userId: string) {
  const [favorites, recents, totalCount] = await Promise.all([
    prisma.collection.findMany({
      where: { isFavorite: true, userId },
      include: SIDEBAR_COLLECTION_INCLUDE,
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.collection.findMany({
      where: { isFavorite: false, userId },
      include: SIDEBAR_COLLECTION_INCLUDE,
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.collection.count({ where: { userId } }),
  ]);

  return {
    totalCount,
    favorites: favorites.map(transformSidebarCollection),
    recents: recents.map(transformSidebarCollection),
  };
}

export type SidebarCollection = ReturnType<typeof transformSidebarCollection>;

export async function getCollectionStats(userId: string) {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count({ where: { userId } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { totalCollections, favoriteCollections };
}
