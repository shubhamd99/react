import { prisma } from "@/lib/db";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  hasPassword: boolean;
  isPro: boolean;
  createdAt: Date;
}

interface ProfileStats {
  totalItems: number;
  totalCollections: number;
  itemsByType: Array<{
    name: string;
    icon: string;
    color: string;
    count: number;
  }>;
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      hashedPassword: true,
      isPro: true,
      createdAt: true,
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    hasPassword: !!user.hashedPassword,
    isPro: user.isPro,
    createdAt: user.createdAt,
  };
}

async function getProfileStats(userId: string): Promise<ProfileStats> {
  const [totalItems, totalCollections, typeCounts] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    prisma.itemType.findMany({
      where: {
        OR: [{ isSystem: true }, { userId }],
      },
      select: {
        name: true,
        icon: true,
        color: true,
        _count: { select: { items: { where: { userId } } } },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  // Deduplicate by name — seed script can create duplicate system types
  const deduped = new Map<string, { name: string; icon: string; color: string; count: number }>();
  for (const t of typeCounts) {
    const existing = deduped.get(t.name);
    if (existing) {
      existing.count += t._count.items;
    } else {
      deduped.set(t.name, {
        name: t.name,
        icon: t.icon,
        color: t.color,
        count: t._count.items,
      });
    }
  }

  const sortOrder = [
    "snippet",
    "prompt",
    "command",
    "note",
    "link",
    "file",
    "image",
  ];

  const itemsByType = [...deduped.values()].sort(
    (a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name)
  );

  return { totalItems, totalCollections, itemsByType };
}

export { getUserProfile, getProfileStats };
export type { UserProfile, ProfileStats };
