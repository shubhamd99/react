"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { SidebarCollection } from "@/lib/db/collections";

interface SidebarCollectionsProps {
  favorites: SidebarCollection[];
  recents: SidebarCollection[];
  totalCount: number;
}

function CollectionItem({ collection }: { collection: SidebarCollection }) {
  return (
    <Link
      href={`/collections/${collection.id}`}
      className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      {collection.isFavorite ? (
        <Star className="size-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
      ) : (
        <span
          className="size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: collection.dominantColor }}
        />
      )}
      <span className="flex-1 truncate">{collection.name}</span>
      <span className="text-xs text-muted-foreground">{collection.itemCount}</span>
    </Link>
  );
}

function SidebarCollections({ favorites, recents, totalCount }: SidebarCollectionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Collections
        </p>
        <span className="rounded-full bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {totalCount}
        </span>
      </div>

      {favorites.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="px-3 text-[10px] font-medium tracking-wider text-muted-foreground/60 uppercase">
            Favorites
          </p>
          {favorites.map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
          ))}
        </div>
      )}

      {recents.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="px-3 text-[10px] font-medium tracking-wider text-muted-foreground/60 uppercase">
            Recent
          </p>
          {recents.map((collection) => (
            <CollectionItem key={collection.id} collection={collection} />
          ))}
        </div>
      )}

      <Link
        href="/collections"
        className="flex items-center gap-2 px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        View all collections
      </Link>
    </div>
  );
}

export { SidebarCollections };
