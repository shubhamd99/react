"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ChevronRight,
  LayoutGrid,
  List,
  Pin,
  Star,
} from "lucide-react";
import { items, itemTypes } from "@/lib/mock-data";
import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

const MAX_RECENT = 10;

function RecentItems() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const recentItems = [...items]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, MAX_RECENT);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Recent Items</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {recentItems.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex size-8 items-center justify-center rounded-l-lg transition-colors",
                viewMode === "grid"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex size-8 items-center justify-center rounded-r-lg transition-colors",
                viewMode === "list"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="List view"
            >
              <List className="size-4" />
            </button>
          </div>
          <Link
            href="/items"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recentItems.map((item) => (
            <RecentItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {recentItems.map((item) => (
            <RecentItemRow key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

interface ItemDisplayProps {
  item: (typeof items)[number];
}

function RecentItemCard({ item }: ItemDisplayProps) {
  const type = itemTypes.find((t) => t.id === item.itemTypeId);
  if (!type) return null;
  const Icon = getIcon(type.icon);

  return (
    <div
      className="flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
      style={{ borderLeftWidth: "3px", borderLeftColor: type.color }}
    >
      <div className="flex items-start justify-between">
        <span
          className="flex size-7 items-center justify-center rounded-full"
          style={{ backgroundColor: type.color + "20" }}
        >
          <Icon className="size-4" style={{ color: type.color }} />
        </span>
        <div className="flex items-center gap-1">
          {item.isPinned && (
            <Pin className="size-3.5 text-muted-foreground" />
          )}
          {item.isFavorite && (
            <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
          )}
        </div>
      </div>

      <div>
        <h3 className="font-semibold leading-tight">{item.title}</h3>
        {item.description && (
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>

      {item.content && (
        <div className="rounded-md bg-muted/50 p-2.5">
          <pre className="line-clamp-2 text-xs text-muted-foreground">
            <code>{item.content}</code>
          </pre>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="capitalize">{type.name}</span>
        <span>{formatDate(item.updatedAt)}</span>
      </div>
    </div>
  );
}

function RecentItemRow({ item }: ItemDisplayProps) {
  const type = itemTypes.find((t) => t.id === item.itemTypeId);
  if (!type) return null;
  const Icon = getIcon(type.icon);

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 transition-all hover:border-foreground/20 hover:shadow-sm">
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: type.color + "20" }}
      >
        <Icon className="size-4" style={{ color: type.color }} />
      </span>
      <div className="flex-1 truncate">
        <h3 className="truncate font-semibold leading-tight">{item.title}</h3>
        {item.description && (
          <p className="truncate text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {item.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="hidden rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground md:inline-block"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {item.isPinned && <Pin className="size-3.5 text-muted-foreground" />}
        {item.isFavorite && (
          <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
        )}
      </div>
      <span className="shrink-0 text-xs capitalize text-muted-foreground">
        {type.name}
      </span>
      <span className="shrink-0 text-xs text-muted-foreground">
        {formatDate(item.updatedAt)}
      </span>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export { RecentItems };
