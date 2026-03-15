import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionsGrid } from "@/components/dashboard/CollectionsGrid";
import { PinnedItems } from "@/components/dashboard/PinnedItems";
import { RecentItems } from "@/components/dashboard/RecentItems";
import { getRecentItems } from "@/lib/db/items";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/sign-in");

  const userId = session.user.id;
  const recentItems = await getRecentItems(userId);

  return (
    <div className="flex flex-col gap-8">
      <StatsCards userId={userId} />
      <CollectionsGrid userId={userId} />
      <PinnedItems userId={userId} />
      <RecentItems items={recentItems} />
    </div>
  );
}
