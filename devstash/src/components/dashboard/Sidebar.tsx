"use client";

import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useSidebarStore } from "@/stores/sidebar.store";
import { cn } from "@/lib/utils";
import { SidebarNav } from "@/components/dashboard/SidebarNav";
import { SidebarItemTypes } from "@/components/dashboard/SidebarItemTypes";
import { SidebarCollections } from "@/components/dashboard/SidebarCollections";
import { SidebarUserArea } from "@/components/dashboard/SidebarUserArea";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { SidebarItemType } from "@/lib/db/items";
import type { SidebarCollection } from "@/lib/db/collections";

interface SidebarUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SidebarProps {
  itemTypes: SidebarItemType[];
  favoriteCollections: SidebarCollection[];
  recentCollections: SidebarCollection[];
  totalCollections: number;
  user: SidebarUser | null;
}

function SidebarContent({ itemTypes, favoriteCollections, recentCollections, totalCollections, user }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto py-4">
      <div className="px-2">
        <SidebarNav />
      </div>
      <Separator className="mx-3" />
      <div className="px-2">
        <SidebarItemTypes itemTypes={itemTypes} />
      </div>
      <Separator className="mx-3" />
      <div className="flex-1 px-2">
        <SidebarCollections
          favorites={favoriteCollections}
          recents={recentCollections}
          totalCount={totalCollections}
        />
      </div>
      <Separator className="mx-3" />
      <div className="px-2">
        <SidebarUserArea user={user} />
      </div>
    </div>
  );
}

function Sidebar({ itemTypes, favoriteCollections, recentCollections, totalCollections, user }: SidebarProps) {
  const isOpen = useSidebarStore((s) => s.isOpen);
  const setOpen = useSidebarStore((s) => s.setOpen);
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile, setOpen]);

  const contentProps = { itemTypes, favoriteCollections, recentCollections, totalCollections, user };

  // Mobile: Sheet overlay
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent {...contentProps} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: collapsible aside
  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col overflow-hidden border-r border-border bg-background transition-[width] duration-200 ease-in-out",
        isOpen ? "w-60" : "w-0"
      )}
    >
      <div className="flex h-full w-60 flex-col overflow-hidden">
        <SidebarContent {...contentProps} />
      </div>
    </aside>
  );
}

export { Sidebar };
