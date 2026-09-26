import type { ReactNode } from "react";
import { cn } from "./cn";

/** Small label that sits above section headings, with a leading dot. */
export function Pill({
  children,
  className,
  tone = "light",
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "glass";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        tone === "light"
          ? "border border-line bg-white/80 text-ink-muted shadow-sm"
          : "glass-tint text-white",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-accent" : "bg-white")}
      />
      {children}
    </span>
  );
}
