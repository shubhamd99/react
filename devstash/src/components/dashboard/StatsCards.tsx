import { LayoutGrid, FolderOpen, Star, Clock } from "lucide-react";
import { items, collections } from "@/lib/mock-data";
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

function StatsCards() {
  const totalItems = items.length;
  const totalCollections = collections.length;
  const favoriteItems = items.filter((i) => i.isFavorite).length;
  const favoriteCollections = collections.filter((c) => c.isFavorite).length;
  const totalFavorites = favoriteItems + favoriteCollections;
  const recentItems = items
    .toSorted(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 10).length;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Total Items" value={totalItems} icon={LayoutGrid} />
      <StatCard label="Collections" value={totalCollections} icon={FolderOpen} />
      <StatCard label="Favorites" value={totalFavorites} icon={Star} />
      <StatCard label="Recent" value={recentItems} icon={Clock} />
    </div>
  );
}

export { StatsCards };
