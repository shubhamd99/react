"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icon-map";
import { itemTypes, items } from "@/lib/mock-data";

function getItemCount(typeId: string): number {
  return items.filter((item) => item.itemTypeId === typeId).length;
}

function pluralize(name: string): string {
  if (name.endsWith("s")) return name;
  return name + "s";
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function SidebarItemTypes() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      <p className="mb-1 px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Item Types
      </p>
      {itemTypes.map((type) => {
        const Icon = getIcon(type.icon);
        const count = getItemCount(type.id);
        const href = `/items/${pluralize(type.name)}`;
        const isActive = pathname === href;

        return (
          <Link
            key={type.id}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" style={{ color: type.color }} />
            <span className="flex-1">{capitalize(pluralize(type.name))}</span>
            <span className="text-xs text-muted-foreground">{count}</span>
          </Link>
        );
      })}
    </div>
  );
}

export { SidebarItemTypes };
