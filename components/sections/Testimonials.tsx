"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { DreamyBackdrop } from "@/components/ui/DreamyBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Generic placeholder company mark. Swap for a real customer logo. */
function PlaceholderLogo({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        <circle cx="9" cy="12" r="7" fill="#4f5bd5" opacity="0.85" />
        <circle cx="15" cy="12" r="7" fill="#e062b4" opacity="0.7" />
      </svg>
      {name}
    </span>
  );
}

export function Testimonials() {
  const items = testimonials.items;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const t = items[index];

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + items.length) % items.length);
  };

  return (
    <section aria-labelledby="testimonials-heading" className="px-2 py-12 sm:px-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-shell px-4 py-24 sm:px-6 md:py-32">
        <DreamyBackdrop variant="soft" />

        <div className="relative">
          <SectionHeading
            id="testimonials-heading"
            tone="dark"
            pill={testimonials.pill}
            heading={testimonials.heading}
            muted={testimonials.headingMuted}
          />

          <Reveal className="relative mx-auto mt-14 max-w-4xl">
            {/* Stacked card edges behind the active card */}
            <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-3 rounded-3xl bg-white/35 backdrop-blur-sm" />
            <div aria-hidden="true" className="absolute inset-x-12 -bottom-6 top-6 rounded-3xl bg-white/20 backdrop-blur-sm" />

            <div
              className="glass relative overflow-hidden rounded-3xl bg-white/85"
              role="group"
              aria-roledescription="carousel"
              aria-label="Customer quotes"
            >
              <AnimatePresence mode="wait" initial={false} custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -30 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid md:grid-cols-[220px_1fr]"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${items.length}`}
                >
                  <div className="flex flex-row items-end justify-between gap-4 border-b border-line p-6 md:flex-col md:items-start md:border-b-0 md:border-r md:p-8">
                    <PlaceholderLogo name={t.company} />
                    <div>
                      <p className="text-5xl font-light tracking-[-0.04em] text-ink md:text-6xl">{t.stat}</p>
                      <p className="mt-1 max-w-[12rem] text-sm text-ink-muted">{t.statLabel}</p>
                    </div>
                  </div>

                  <div className="flex flex-col p-6 md:p-8">
                    <Quote size={22} className="text-lavender" aria-hidden="true" />
                    <blockquote className="mt-3 text-pretty text-lg leading-relaxed tracking-tight text-ink md:text-xl">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <Avatar initials={t.initials} size="lg" />
                      <div>
                        <p className="text-sm font-medium text-ink">{t.name}</p>
                        <p className="text-xs text-ink-muted">{t.role}</p>
                      </div>
                    </figcaption>
                  </div>
                </motion.figure>
              </AnimatePresence>

              <div className="flex items-center justify-between border-t border-line px-6 py-4 md:px-8">
                <div className="flex gap-1.5" aria-hidden="true">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-line"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous quote"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next quote"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            <p className="sr-only" aria-live="polite">
              Showing quote {index + 1} of {items.length}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
