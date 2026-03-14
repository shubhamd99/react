import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionsGrid } from "@/components/dashboard/CollectionsGrid";
import { PinnedItems } from "@/components/dashboard/PinnedItems";
import { RecentItems } from "@/components/dashboard/RecentItems";
import { getRecentItems } from "@/lib/db/items";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const recentItems = await getRecentItems();

  return (
    <div className="flex flex-col gap-8">
      <StatsCards />
      <CollectionsGrid />
      <PinnedItems />
      <RecentItems items={recentItems} />
    </div>
  );
}
