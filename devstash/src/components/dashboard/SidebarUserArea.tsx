"use client";

import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-data";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function SidebarUserArea() {
  return (
    <div className="flex items-center gap-3 rounded-lg px-3 py-2">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {getInitials(currentUser.name)}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{currentUser.name}</span>
        <span className="text-xs text-muted-foreground">
          {currentUser.isPro ? "Pro Plan" : "Free Plan"}
        </span>
      </div>
      <Button variant="ghost" size="icon-xs" aria-label="Settings">
        <Settings className="size-3.5" />
      </Button>
    </div>
  );
}

export { SidebarUserArea };
