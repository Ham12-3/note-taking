import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "white" | "dark" | "glass" | "outline";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  white:
    "bg-white text-ink shadow-[0_6px_20px_-8px_rgb(40_40_100/0.45)] hover:bg-white/90 focus-visible:outline-white",
  dark: "bg-ink text-white shadow-[0_8px_24px_-10px_rgb(20_20_40/0.6)] hover:bg-ink/85 focus-visible:outline-accent",
  glass: "glass-tint text-white hover:bg-white/25 focus-visible:outline-white",
  outline: "border border-line bg-white/70 text-ink hover:bg-white focus-visible:outline-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60";

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function ButtonLink({
  href,
  variant = "white",
  size = "md",
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "white",
  size = "md",
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}
