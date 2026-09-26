import { finalCta } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { Container } from "@/components/ui/Container";
import { Flower } from "@/components/ui/DreamyBackdrop";
import { Floating } from "@/components/ui/Floating";
import { Reveal } from "@/components/ui/Reveal";
import { StatusChip } from "@/components/ui/StatusChip";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

// Decorative avatars and chips scattered around the headline (desktop only).
const avatars = [
  { initials: "JE", pos: "left-[6%] top-[18%]", delay: 0 },
  { initials: "RS", pos: "right-[8%] top-[12%]", delay: 0.6 },
  { initials: "CD", pos: "left-[14%] bottom-[16%]", delay: 1.1 },
  { initials: "AR", pos: "right-[14%] bottom-[22%]", delay: 0.3 },
];

const chipPos = [
  "left-[2%] top-[42%]",
  "right-[3%] top-[36%]",
  "left-[24%] top-[6%]",
  "right-[24%] bottom-[8%]",
];

export function FinalCTA() {
  return (
    <section id="get-started" aria-labelledby="cta-heading" className="relative overflow-hidden py-28 md:py-40">
      {/* Soft wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,rgb(185_168_245/0.35),transparent_70%)]"
      />
      <div aria-hidden="true" className="absolute left-[30%] top-10 -z-10 hidden h-16 w-16 md:block">
        <Flower tone="peach" petals={5} className="inset-0 h-full w-full opacity-90" />
      </div>
      <div aria-hidden="true" className="absolute bottom-12 right-[28%] -z-10 hidden h-12 w-12 md:block">
        <Flower tone="lilac" className="inset-0 h-full w-full opacity-80" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        {avatars.map((a) => (
          <Floating key={a.initials} amplitude={6} duration={7} delay={a.delay} className={`absolute ${a.pos}`}>
            <Avatar initials={a.initials} size="lg" className="shadow-lg" />
          </Floating>
        ))}
        {finalCta.chips.map((c, i) => (
          <Floating key={c.label} amplitude={5} duration={6} delay={i * 0.4} className={`absolute ${chipPos[i]}`}>
            <StatusChip label={c.label} tone={c.tone} />
          </Floating>
        ))}
      </div>

      <Container className="relative text-center">
        <Reveal>
          <h2
            id="cta-heading"
            className="mx-auto max-w-2xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl md:text-6xl"
          >
            {finalCta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-[15px] leading-relaxed text-ink-muted">
            {finalCta.subtext}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9">
          <WaitlistForm />
        </Reveal>
        {/* Chips inline on mobile, where the scattered layout doesn't fit */}
        <div aria-hidden="true" className="mt-10 flex flex-wrap justify-center gap-2 md:hidden">
          {finalCta.chips.map((c) => (
            <StatusChip key={c.label} label={c.label} tone={c.tone} />
          ))}
        </div>
      </Container>
    </section>
  );
}
