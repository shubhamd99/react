import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
  size?: "sm" | "default" | "lg";
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function UserAvatar({ user, size = "default", className }: UserAvatarProps) {
  const initials = user.name ? getInitials(user.name) : "?";

  return (
    <Avatar size={size} className={cn(className)}>
      {user.image && (
        <AvatarImage src={user.image} alt={user.name ?? "User avatar"} />
      )}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

export { UserAvatar };
export type { UserAvatarProps };
