import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";
import { collections, items, itemTypes } from "@/lib/mock-data";
import { getIcon } from "@/lib/icon-map";

function CollectionsGrid() {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Collections</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {collections.length}
          </span>
        </div>
        <Link
          href="/collections"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => {
          const collectionItems = items.filter((item) =>
            collection.itemIds.includes(item.id)
          );

          const typeIds = [
            ...new Set(collectionItems.map((item) => item.itemTypeId)),
          ];

          return (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{collection.name}</h3>
                    {collection.isFavorite && (
                      <Star className="size-4 shrink-0 fill-yellow-500 text-yellow-500" />
                    )}
                  </div>
                  {collection.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {typeIds.map((typeId) => {
                    const type = itemTypes.find((t) => t.id === typeId);
                    if (!type) return null;
                    const Icon = getIcon(type.icon);
                    return (
                      <span
                        key={typeId}
                        className="flex size-6 items-center justify-center rounded-full"
                        style={{ backgroundColor: type.color + "20" }}
                      >
                        <Icon
                          className="size-3.5"
                          style={{ color: type.color }}
                        />
                      </span>
                    );
                  })}
                </div>
                <span className="text-sm text-muted-foreground">
                  {collectionItems.length} items
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export { CollectionsGrid };
