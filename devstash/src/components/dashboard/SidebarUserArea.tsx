"use client";

import { signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatar } from "@/components/shared/UserAvatar";
import Link from "next/link";

interface SidebarUserAreaProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

function SidebarUserArea({ user }: SidebarUserAreaProps) {
  if (!user) {
    return (
      <div className="px-3 py-2">
        <Link href="/sign-in">
          <Button variant="outline" size="sm" className="w-full">
            Sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-sidebar-accent transition-colors">
        <UserAvatar user={user} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-medium">
            {user.name ?? "User"}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-48 p-1">
        <Link
          href="/profile"
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
        >
          <User className="size-4" />
          Profile
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </PopoverContent>
    </Popover>
  );
}

export { SidebarUserArea };
