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
  ];
  console.log("\nTable row counts:");
  for (const t of tables) {
    console.log(`  - ${t.name}: ${t.count}`);
  }

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
