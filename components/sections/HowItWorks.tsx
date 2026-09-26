"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { howItWorks } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Flower } from "@/components/ui/DreamyBackdrop";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/components/ui/cn";
import { stepPanels } from "@/components/mockups/StepPanels";

type StepId = keyof typeof stepPanels;

export function HowItWorks() {
  const steps = howItWorks.steps;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const step = steps[active];
  const Panel = stepPanels[step.id as StepId];

  // Arrow-key navigation for the vertical tab list
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + steps.length) % steps.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = steps.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="relative py-24 md:py-32">
      <div aria-hidden="true" className="absolute left-0 top-1/2 -z-10 hidden h-64 w-64 -translate-x-1/3 md:block">
        <Flower tone="lilac" className="inset-0 h-full w-full opacity-70 blur-[3px]" />
      </div>

      <Container>
        <SectionHeading
          id="how-heading"
          pill={howItWorks.pill}
          heading={howItWorks.heading}
          muted={howItWorks.headingMuted}
        />

        <Reveal className="mt-14 grid gap-8 md:mt-20 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-12 lg:gap-16">
          {/* Vertical tab list */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Steps"
            onKeyDown={onKeyDown}
            className="relative flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-0 md:overflow-visible md:border-l md:border-line md:pb-0"
          >
            {steps.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative shrink-0 rounded-xl px-4 py-2.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:rounded-none md:rounded-r-xl md:py-3.5 md:pl-6",
                    selected
                      ? "bg-white text-ink shadow-sm ring-1 ring-line md:bg-transparent md:shadow-none md:ring-0"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="step-indicator"
                      aria-hidden="true"
                      className="absolute -left-px top-2 bottom-2 hidden w-[2px] rounded-full bg-accent md:block"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="whitespace-nowrap md:whitespace-normal">
                    <span className="mr-2 font-mono text-xs text-ink-subtle">{i + 1}.</span>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active panel */}
          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.id}
                id={`panel-${step.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${step.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="max-w-lg text-[15px] leading-relaxed text-ink-muted">{step.body}</p>
                <div className="relative mt-6 md:min-h-[400px]">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sky/35 via-lavender/25 to-blush/35 blur-2xl"
                  />
                  <div className="glass overflow-hidden rounded-2xl bg-white/85">
                    <Panel />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
