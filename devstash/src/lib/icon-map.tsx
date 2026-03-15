import type { ComponentProps } from "react";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link,
};

function getIcon(name: string): LucideIcon {
  if (process.env.NODE_ENV !== "production" && !(name in iconMap)) {
    console.warn(`[icon-map] Unknown icon name: "${name}". Add it to iconMap.`);
  }
  return iconMap[name] ?? File;
}

interface DynamicIconProps extends ComponentProps<LucideIcon> {
  name: string;
}

function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name] ?? File;
  return <Icon {...props} />;
}

export { iconMap, getIcon, DynamicIcon };
