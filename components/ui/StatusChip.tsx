import type { ChipTone } from "@/lib/content";
import { cn } from "./cn";

const tones: Record<ChipTone, { dot: string; text: string }> = {
  green: { dot: "bg-chip-green", text: "text-chip-green" },
  pink: { dot: "bg-chip-pink", text: "text-chip-pink" },
  orange: { dot: "bg-chip-orange", text: "text-chip-orange" },
  blue: { dot: "bg-chip-blue", text: "text-chip-blue" },
};

/** Tiny floating status label with a colored dot. */
export function StatusChip({
  label,
  tone,
  className,
  pulse = false,
}: {
  label: string;
  tone: ChipTone;
  className?: string;
  pulse?: boolean;
}) {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium",
        t.text,
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {pulse && (
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", t.dot)} />
        )}
        <span className={cn("relative h-2 w-2 rounded-full", t.dot)} />
      </span>
      {label}
    </span>
  );
}
