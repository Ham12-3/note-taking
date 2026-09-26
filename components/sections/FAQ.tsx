"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faq } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/components/ui/cn";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 md:py-32">
      <Container>
        <SectionHeading id="faq-heading" pill={faq.pill} heading={faq.heading} />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ul className="glass divide-y divide-line rounded-3xl px-2 sm:px-4">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 rounded-xl px-3 py-5 text-left text-[15px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-accent sm:text-base"
                    >
                      {item.q}
                      <Plus
                        size={18}
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 text-ink-muted transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-3 pb-5 pr-12 text-[15px] leading-relaxed text-ink-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
