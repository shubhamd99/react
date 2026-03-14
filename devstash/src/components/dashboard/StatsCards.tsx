import { LayoutGrid, FolderOpen, Star, Clock } from "lucide-react";
import { getCollectionStats } from "@/lib/db/collections";
import { getItemStats } from "@/lib/db/items";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}

async function StatsCards() {
  const [collectionStats, itemStats] = await Promise.all([
    getCollectionStats(),
    getItemStats(),
  ]);

  const totalFavorites = itemStats.favoriteItems + collectionStats.favoriteCollections;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Total Items" value={itemStats.totalItems} icon={LayoutGrid} />
      <StatCard label="Collections" value={collectionStats.totalCollections} icon={FolderOpen} />
      <StatCard label="Favorites" value={totalFavorites} icon={Star} />
      <StatCard label="Recent" value={itemStats.recentItems} icon={Clock} />
    </div>
  );
}

export { StatsCards };
