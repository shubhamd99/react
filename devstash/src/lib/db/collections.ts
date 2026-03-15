import { prisma } from "@/lib/db";

export async function getCollectionsWithTypes() {
  const collections = await prisma.collection.findMany({
    include: {
      items: {
        include: {
          item: {
            include: {
              itemType: true,
            },
          },
        },
      },
    },
    orderBy: [{ isFavorite: "desc" }, { updatedAt: "desc" }],
  });

  return collections.map((collection) => {
    const itemTypes = collection.items.map((ic) => ic.item.itemType);

    // Count occurrences of each type to find the dominant one
    const typeCounts = new Map<string, { count: number; color: string }>();
    for (const type of itemTypes) {
      const existing = typeCounts.get(type.id);
      typeCounts.set(type.id, {
        count: (existing?.count ?? 0) + 1,
        color: type.color,
      });
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

    // Unique types in this collection
    const uniqueTypes = [
      ...new Map(itemTypes.map((t) => [t.id, t])).values(),
    ];

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: collection.items.length,
      borderColor,
      types: uniqueTypes.map((t) => ({
        id: t.id,
        name: t.name,
        icon: t.icon,
        color: t.color,
      })),
    };
  });
}

function transformSidebarCollection(collection: {
  id: string;
  name: string;
  isFavorite: boolean;
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
    itemCount: collection.items.length,
    dominantColor,
  };
}

const SIDEBAR_COLLECTION_INCLUDE = {
  items: {
    include: {
      item: {
        include: {
          itemType: true,
        },
      },
    },
  },
} as const;

export async function getSidebarCollections() {
  const [favorites, recents, totalCount] = await Promise.all([
    prisma.collection.findMany({
      where: { isFavorite: true },
      include: SIDEBAR_COLLECTION_INCLUDE,
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.collection.findMany({
      where: { isFavorite: false },
      include: SIDEBAR_COLLECTION_INCLUDE,
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.collection.count(),
  ]);

  return {
    totalCount,
    favorites: favorites.map(transformSidebarCollection),
    recents: recents.map(transformSidebarCollection),
  };
}

export type SidebarCollection = ReturnType<typeof transformSidebarCollection>;

export async function getCollectionStats() {
  const [totalCollections, favoriteCollections] = await Promise.all([
    prisma.collection.count(),
    prisma.collection.count({ where: { isFavorite: true } }),
  ]);

  return { totalCollections, favoriteCollections };
}
