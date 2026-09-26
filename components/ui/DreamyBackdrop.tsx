import { useId } from "react";
import { cn } from "./cn";

type FlowerTone = "pink" | "lilac" | "peach";

const flowerStops: Record<FlowerTone, [string, string, string]> = {
  pink: ["#fff1f7", "#f4a3cc", "#d9559f"],
  lilac: ["#f6f0ff", "#c9b3f6", "#8f7ae8"],
  peach: ["#fff6ee", "#ffc6a3", "#f08aa0"],
};

/** Out-of-focus flower drawn in SVG. Blur is applied with CSS so it stays cheap. */
export function Flower({
  className,
  tone = "pink",
  petals = 6,
  stamens = true,
}: {
  className?: string;
  tone?: FlowerTone;
  petals?: number;
  stamens?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const [c0, c1, c2] = flowerStops[tone];
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={cn("pointer-events-none absolute", className)}>
      <defs>
        <radialGradient id={`p-${id}`} cx="0" cy="0.9" r="1.1">
          <stop offset="0" stopColor={c0} />
          <stop offset="0.45" stopColor={c1} />
          <stop offset="1" stopColor={c2} />
        </radialGradient>
      </defs>
      {Array.from({ length: petals }).map((_, i) => (
        <path
          key={i}
          d="M0 0 C -26 -22, -30 -70, 0 -92 C 30 -70, 26 -22, 0 0 Z"
          fill={`url(#p-${id})`}
          opacity={0.92}
          transform={`rotate(${(360 / petals) * i + 12})`}
        />
      ))}
      <circle r="12" fill={c0} opacity="0.9" />
      {stamens &&
        Array.from({ length: 9 }).map((_, i) => {
          const a = ((i * 40 + 5) * Math.PI) / 180;
          const r = 30 + (i % 3) * 7;
          const x = +(Math.cos(a) * r).toFixed(2);
          const y = +(Math.sin(a) * r).toFixed(2);
          return (
            <g key={i}>
              <line x1="0" y1="0" x2={x} y2={y} stroke="#fbe3c2" strokeWidth="1.2" opacity="0.8" />
              <circle cx={x} cy={y} r="3.4" fill="#f5a04a" />
            </g>
          );
        })}
    </svg>
  );
}

/**
 * Layered dreamy background: gradient base, soft color blobs, blurred flowers,
 * halftone dots, and grain. Purely decorative.
 */
export function DreamyBackdrop({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "soft";
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Base gradient. The upper area stays deep enough for white text contrast. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "hero"
              ? "linear-gradient(180deg, #5563cf 0%, #6674dc 26%, #8d8ae8 52%, #c3a5ef 72%, #efc1dc 90%, #f6f6fa 100%)"
              : "linear-gradient(180deg, #5a67d0 0%, #6f78dc 30%, #a695ea 62%, #e7bddc 100%)",
        }}
      />

      {/* Soft color blobs */}
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#9fb4ff] opacity-60 blur-3xl" />
      <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-[#f29ccc] opacity-45 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-72 w-[28rem] rounded-full bg-[#c7b0ff] opacity-50 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-[#3f4cc0] opacity-40 blur-3xl" />

      {/* Out-of-focus flowers */}
      <Flower
        tone="pink"
        className="-left-24 bottom-[8%] h-[26rem] w-[26rem] rotate-12 opacity-80 blur-[10px] md:-left-16 md:h-[34rem] md:w-[34rem]"
      />
      <Flower
        tone="peach"
        petals={5}
        className="-right-28 top-[18%] h-[22rem] w-[22rem] -rotate-12 opacity-75 blur-[12px] md:-right-10 md:h-[30rem] md:w-[30rem]"
      />
      <Flower
        tone="lilac"
        stamens={false}
        className="left-[18%] -top-24 hidden h-56 w-56 opacity-40 blur-[22px] md:block"
      />
      {variant === "hero" && (
        <Flower
          tone="pink"
          petals={5}
          stamens={false}
          className="right-[22%] bottom-[18%] hidden h-40 w-40 opacity-50 blur-[16px] lg:block"
        />
      )}

      {/* Halftone dots around the edges and fine grain over everything */}
      <div className="halftone absolute inset-0 opacity-70" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
