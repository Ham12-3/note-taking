import { NAME } from "@/lib/site";
import { cn } from "./cn";

/** Logo mark: stacked note lines inside a soft rounded square. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-8 w-8", className)}>
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c8cf0" />
          <stop offset="0.6" stopColor="#b08cf0" />
          <stop offset="1" stopColor="#e57bbd" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-g)" />
      <rect x="8" y="9" width="16" height="3" rx="1.5" fill="#fff" />
      <rect x="8" y="14.5" width="12" height="3" rx="1.5" fill="#fff" opacity="0.85" />
      <rect x="8" y="20" width="8" height="3" rx="1.5" fill="#fff" opacity="0.7" />
      <circle cx="22" cy="21.5" r="2.5" fill="#fff" />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      <span
        className={cn(
          "text-[17px] font-medium tracking-tight transition-colors",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        {NAME}
      </span>
    </span>
  );
}
