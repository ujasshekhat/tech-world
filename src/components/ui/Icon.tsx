import React from "react";
import * as Icons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 20 }: IconProps) {
  // Fallback if the icon doesn't exist
  const LucideIcon = (Icons as any)[name] || Icons.BookOpen;
  return <LucideIcon className={className} size={size} />;
}
