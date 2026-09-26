import type { ReactNode } from "react";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";
import { cn } from "./cn";

/** Pill + large light headline where the second half is muted grey. */
export function SectionHeading({
  id,
  pill,
  heading,
  muted,
  className,
  tone = "light",
  children,
}: {
  id?: string;
  pill?: string;
  heading: string;
  muted?: string;
  className?: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl text-center", className)}>
      {pill && <Pill tone={tone === "dark" ? "glass" : "light"}>{pill}</Pill>}
      <h2
        id={id}
        className={cn(
          "mt-5 text-balance text-3xl font-light leading-[1.12] tracking-[-0.03em] sm:text-4xl md:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {heading}
        {muted && (
          <>
            {" "}
            <span className={tone === "dark" ? "text-white/80" : "text-ink-subtle"}>{muted}</span>
          </>
        )}
      </h2>
      {children}
    </Reveal>
  );
}
