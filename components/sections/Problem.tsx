import { Loader2, ListChecks, Send } from "lucide-react";
import { problem } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Flower } from "@/components/ui/DreamyBackdrop";
import { Floating } from "@/components/ui/Floating";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusChip } from "@/components/ui/StatusChip";
import { NotesWorkspace } from "@/components/mockups/NotesWorkspace";

export function Problem() {
  const side = problem.workspace.sideCards;

  return (
    <section aria-labelledby="problem-heading" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="problem-heading"
          pill={problem.pill}
          heading={problem.statement}
          muted={problem.statementMuted}
        />

        <Reveal y={40} className="relative mx-auto mt-16 max-w-5xl md:mt-20">
          {/* Soft glow + a small flower accent behind the mockup */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[3rem] bg-gradient-to-br from-sky/40 via-lavender/30 to-blush/40 blur-2xl"
          />
          <div aria-hidden="true" className="absolute -left-10 -top-14 -z-10 h-32 w-32 md:-left-16 md:h-40 md:w-40">
            <Flower tone="pink" className="inset-0 h-full w-full opacity-90 blur-[2px]" />
          </div>

          <div role="img" aria-label="Preview of the meeting notes view: today's meetings on the left, the summary, decisions, and next steps on the right">
            <NotesWorkspace />

            {/* Floating side cards */}
            <Floating
              amplitude={5}
              duration={7}
              className="absolute -left-4 top-[58%] hidden w-56 lg:-left-32 lg:block xl:-left-44"
            >
              <div className="glass rounded-2xl p-4 text-left">
                <p className="flex items-center gap-2 text-[12px] font-medium text-ink">
                  <Loader2 size={14} className="animate-spin text-accent motion-reduce:animate-none" aria-hidden="true" />
                  {side.writing}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {side.writingSteps.map((s, i) => (
                    <li key={s} className="flex items-center gap-2 text-[11px] text-ink-muted">
                      <span
                        className={
                          i < 2
                            ? "h-1.5 w-1.5 rounded-full bg-chip-green"
                            : "h-1.5 w-1.5 animate-pulse rounded-full bg-chip-orange"
                        }
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Floating>

            <Floating
              amplitude={4}
              duration={6}
              delay={0.5}
              className="absolute -right-4 top-10 hidden lg:-right-20 lg:block"
            >
              <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-[12px] text-ink">
                <Send size={14} className="text-chip-blue" aria-hidden="true" />
                {side.shared}
              </div>
            </Floating>

            <Floating
              amplitude={5}
              duration={6.5}
              delay={1}
              className="absolute -right-2 bottom-12 hidden lg:-right-14 lg:block"
            >
              <div className="glass flex items-center gap-2 rounded-2xl px-4 py-3 text-[12px] text-ink">
                <ListChecks size={14} className="text-chip-orange" aria-hidden="true" />
                {side.task}
              </div>
            </Floating>

            <Floating amplitude={4} duration={5} className="absolute -top-4 right-8 md:right-24">
              <StatusChip label={side.ready} tone="green" />
            </Floating>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
