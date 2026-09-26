import { cn } from "./cn";

const gradients = [
  "from-[#8f9df3] to-[#b596f0]",
  "from-[#ef8fbd] to-[#d45ea3]",
  "from-[#f7b27f] to-[#e9806a]",
  "from-[#6fc3a6] to-[#3f9d7f]",
  "from-[#8fb2fb] to-[#5b7de6]",
];

function pick(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return gradients[h % gradients.length];
}

const sizes = {
  xs: "h-5 w-5 text-[8px]",
  sm: "h-6 w-6 text-[9px]",
  md: "h-8 w-8 text-[11px]",
  lg: "h-11 w-11 text-sm",
};

/** Initials avatar. Decorative: the person's name is always shown next to it. */
export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-white",
        pick(initials),
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}
