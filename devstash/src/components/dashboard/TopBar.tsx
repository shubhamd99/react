"use client";

import { Search, Plus, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TopBar() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-background px-4">
      <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
        <PanelLeft className="size-4" />
      </Button>

      <h1 className="text-base font-semibold">Dashboard</h1>

      <div className="relative ml-auto flex max-w-sm flex-1 items-center">
        <Search className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search items..."
          className="h-8 pl-8 text-sm"
          readOnly
        />
      </div>

      <Button size="sm" className="gap-1.5">
        <Plus className="size-4" />
        <span>New Item</span>
      </Button>
    </header>
  );
}

export { TopBar };
