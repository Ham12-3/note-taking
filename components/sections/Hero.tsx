import { Play, Video } from "lucide-react";
import { hero } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { DreamyBackdrop } from "@/components/ui/DreamyBackdrop";
import { Floating } from "@/components/ui/Floating";
import { StatusChip } from "@/components/ui/StatusChip";
import { ActionItemsCard, SummaryCard, TranscriptCard } from "@/components/mockups/HeroCards";

export function Hero() {
  const [recording, speaker, actions, slack] = hero.chips;

  return (
    <section aria-labelledby="hero-heading" className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-shell">
        <DreamyBackdrop variant="hero" />

        <div className="relative px-4 pt-32 sm:px-6 md:pt-40">
          {/* Copy */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="rise">
              <span className="glass-tint inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-white">
                <Video size={13} aria-hidden="true" />
                {hero.chip}
              </span>
            </div>
            <div className="rise [animation-delay:60ms]">
              <h1
                id="hero-heading"
                className="mt-6 text-balance text-[2.6rem] font-light leading-[1.05] tracking-[-0.04em] text-white [text-shadow:0_1px_24px_rgb(40_40_120/0.25)] sm:text-6xl md:text-7xl"
              >
                {hero.headline}
              </h1>
            </div>
            <div className="rise [animation-delay:120ms]">
              <p className="mx-auto mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-white sm:text-base">
                {hero.subtext}
              </p>
            </div>
            <div className="rise mt-8 flex [animation-delay:180ms] flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={hero.primaryCta.href} variant="white" className="w-full sm:w-auto">
                <Video size={17} aria-hidden="true" />
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="glass" className="w-full sm:w-auto">
                <Play size={15} aria-hidden="true" />
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          {/* Overlapping UI mockups */}
          <div className="rise relative mx-auto mt-14 h-[360px] max-w-5xl sm:h-[400px] md:mt-20 [animation-delay:250ms]">
            <div
              role="img"
              aria-label="Preview of the app: a live transcript, a meeting summary, and extracted action items"
              className="absolute inset-0"
            >
              <Floating
                amplitude={5}
                duration={7}
                className="absolute left-0 top-16 hidden w-[290px] -rotate-2 md:block lg:left-6"
              >
                <TranscriptCard />
              </Floating>

              <Floating
                amplitude={4}
                duration={8}
                delay={0.6}
                className="absolute right-0 top-20 hidden w-[270px] rotate-2 md:block lg:right-6"
              >
                <ActionItemsCard />
              </Floating>

              <Floating
                amplitude={6}
                duration={6.5}
                delay={0.3}
                className="absolute left-1/2 top-9 z-10 w-full max-w-[360px] -translate-x-1/2 md:top-0"
              >
                <SummaryCard className="shadow-[var(--shadow-soft)]" />
              </Floating>

              {/* Floating status chips */}
              <Floating amplitude={4} duration={5} className="absolute left-[4%] top-0 z-20 md:left-[14%] md:top-2">
                <StatusChip {...recording} pulse />
              </Floating>
              <Floating amplitude={5} duration={6} delay={1} className="absolute right-[4%] top-0 z-20 md:right-[16%] md:top-6">
                <StatusChip {...slack} />
              </Floating>
              <Floating amplitude={4} duration={5.5} delay={0.4} className="absolute left-[2%] top-[250px] z-20 hidden md:block">
                <StatusChip {...speaker} />
              </Floating>
              <Floating amplitude={5} duration={6.5} delay={0.8} className="absolute right-[26%] top-[290px] z-20 hidden md:block">
                <StatusChip {...actions} />
              </Floating>
            </div>
          </div>
        </div>

        {/* Fade the bottom of the hero into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-28 bg-gradient-to-b from-transparent to-canvas"
        />
      </div>
    </section>
  );
}
