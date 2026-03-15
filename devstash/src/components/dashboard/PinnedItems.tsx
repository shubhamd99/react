import Link from "next/link";
import { Pin, Star, ChevronRight } from "lucide-react";
import { getPinnedItems } from "@/lib/db/items";
import { getIcon } from "@/lib/icon-map";
import { formatDate } from "@/lib/utils";

async function PinnedItems({ userId }: { userId: string }) {
  const pinnedItems = await getPinnedItems(userId);

  if (pinnedItems.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pin className="size-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Pinned</h2>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {pinnedItems.length}
          </span>
        </div>
        <Link
          href="/items?pinned=true"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pinnedItems.map((item) => {
          const Icon = getIcon(item.itemType.icon);

          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-lg border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-sm"
              style={{ borderLeftWidth: "3px", borderLeftColor: item.itemType.color }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="flex size-7 items-center justify-center rounded-full"
                    style={{ backgroundColor: item.itemType.color + "20" }}
                  >
                    <Icon
                      className="size-4"
                      style={{ color: item.itemType.color }}
                    />
                  </span>
                  <div>
                    <h3 className="font-semibold leading-tight">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Pin className="size-3.5 text-muted-foreground" />
                  {item.isFavorite && (
                    <Star className="size-3.5 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
              </div>

              {item.content && (
                <div className="rounded-md bg-muted/50 p-3">
                  <pre className="line-clamp-3 text-xs text-muted-foreground">
                    <code>{item.content}</code>
                  </pre>
                </div>
              )}

              {item.url && !item.content && (
                <p className="truncate text-sm text-muted-foreground">
                  {item.url}
                </p>
              )}

              <div className="flex items-center justify-between">
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
                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </span>
              </div>

              <div className="text-xs capitalize text-muted-foreground">
                {item.itemType.name}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { PinnedItems };
