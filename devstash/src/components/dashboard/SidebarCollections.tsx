"use client";

import Link from "next/link";
import { Star, FolderOpen } from "lucide-react";
import { collections } from "@/lib/mock-data";

function SidebarCollections() {
  const sorted = [...collections].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const visible = sorted.slice(0, 5);

  return (
    <div className="flex flex-col gap-1">
      <div className="mb-1 flex items-center justify-between px-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Collections
        </p>
        <span className="rounded-full bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {collections.length}
        </span>
      </div>
      {visible.map((collection) => (
        <Link
          key={collection.id}
          href={`/collections/${collection.id}`}
          className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <FolderOpen className="size-4 shrink-0" />
          <span className="flex-1 truncate">{collection.name}</span>
          {collection.isFavorite && (
            <Star className="size-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
          )}
        </Link>
      ))}
      <Link
        href="/collections"
        className="mt-1 flex items-center gap-2 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        View all
      </Link>
    </div>
  );
}

export { SidebarCollections };
