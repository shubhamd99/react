import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  console.log("Testing database connection...\n");

  // Test 1: Connection
  const result = await prisma.$queryRawUnsafe<{ now: Date }[]>("SELECT NOW()");
  console.log("[PASS] Connected to database at:", result[0].now);

  // Test 2: System item types
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });
  console.log(`[PASS] Found ${itemTypes.length} system item types:`);
  for (const t of itemTypes) {
    console.log(`  - ${t.name} (${t.icon}, ${t.color})`);
  }

  // Test 3: Table counts
  const tables = [
    { name: "User", count: await prisma.user.count() },
    { name: "Item", count: await prisma.item.count() },
    { name: "Collection", count: await prisma.collection.count() },
    { name: "Tag", count: await prisma.tag.count() },
    { name: "ItemCollection", count: await prisma.itemCollection.count() },
    { name: "TagsOnItems", count: await prisma.tagsOnItems.count() },
  ];
  console.log("\nTable row counts:");
  for (const t of tables) {
    console.log(`  - ${t.name}: ${t.count}`);
  }

  // Test 4: Demo user
  const demoUser = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: {
      id: true,
      name: true,
      email: true,
      isPro: true,
      emailVerified: true,
      hashedPassword: true,
    },
  });
  if (!demoUser) {
    console.log("\n[FAIL] Demo user not found");
    process.exit(1);
  }
  console.log("\n[PASS] Demo user:");
  console.log(`  - Name: ${demoUser.name}`);
  console.log(`  - Email: ${demoUser.email}`);
  console.log(`  - isPro: ${demoUser.isPro}`);
  console.log(`  - Email verified: ${demoUser.emailVerified}`);
  console.log(`  - Has password: ${!!demoUser.hashedPassword}`);

  // Test 5: Collections with item counts
  const collections = await prisma.collection.findMany({
    where: { userId: demoUser.id },
    include: {
      _count: { select: { items: true } },
    },
    orderBy: { name: "asc" },
  });
  console.log(`\n[PASS] ${collections.length} collections:`);
  for (const c of collections) {
    console.log(`  - ${c.name} (${c._count.items} items, favorite: ${c.isFavorite})`);
  }

  // Test 6: Items by type
  const itemsByType = await prisma.item.groupBy({
    by: ["itemTypeId"],
    where: { userId: demoUser.id },
    _count: true,
  });
  const typeNames = new Map(itemTypes.map((t) => [t.id, t.name]));
  console.log("\n[PASS] Items by type:");
  for (const group of itemsByType) {
    console.log(`  - ${typeNames.get(group.itemTypeId) ?? "unknown"}: ${group._count}`);
  }

  // Test 7: Items with details
  const items = await prisma.item.findMany({
    where: { userId: demoUser.id },
    include: {
      itemType: { select: { name: true } },
      tags: { include: { tag: { select: { name: true } } } },
      collections: { include: { collection: { select: { name: true } } } },
    },
    orderBy: { title: "asc" },
  });
  console.log(`\n[PASS] ${items.length} items:`);
  for (const item of items) {
    const tags = item.tags.map((t) => t.tag.name).join(", ");
    const cols = item.collections.map((c) => c.collection.name).join(", ");
    console.log(`  - [${item.itemType.name}] ${item.title}`);
    console.log(`    Tags: ${tags}`);
    console.log(`    Collections: ${cols}`);
    console.log(`    Pinned: ${item.isPinned} | Favorite: ${item.isFavorite}`);
  }

  // Test 8: Tags
  const allTags = await prisma.tag.findMany({
    include: { _count: { select: { items: true } } },
    orderBy: { name: "asc" },
  });
  console.log(`\n[PASS] ${allTags.length} tags:`);
  console.log(`  ${allTags.map((t) => `${t.name}(${t._count.items})`).join(", ")}`);

  console.log("\nAll tests passed.");
}

main()
  .catch((e) => {
    console.error("[FAIL]", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
