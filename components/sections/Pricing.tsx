import { Check } from "lucide-react";
import { pricing } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/components/ui/cn";

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-96 max-w-4xl -translate-y-1/2 rounded-full bg-gradient-to-r from-sky/40 via-lavender/40 to-blush/40 blur-3xl"
      />
      <Container>
        <SectionHeading
          id="pricing-heading"
          pill={pricing.pill}
          heading={pricing.heading}
          muted={pricing.headingMuted}
        />

        <ul className="mx-auto mt-14 grid max-w-5xl items-stretch gap-5 md:mt-20 md:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <li key={tier.name}>
              <Reveal delay={i * 0.08} className="h-full">
                <article
                  aria-labelledby={`tier-${tier.name}`}
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-7",
                    tier.highlighted
                      ? "bg-gradient-to-b from-[#4f5bd5] to-[#6b5fcf] text-white shadow-[var(--shadow-soft)] md:scale-[1.04]"
                      : "glass text-ink",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <h3 id={`tier-${tier.name}`} className="text-lg font-medium">
                      {tier.name}
                    </h3>
                    {tier.badge && (
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white ring-1 ring-white/40">
                        {tier.badge}
                      </span>
                    )}
                  </div>
                  <p className={cn("mt-2 text-sm", tier.highlighted ? "text-white/90" : "text-ink-muted")}>
                    {tier.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-5xl font-light tracking-[-0.04em]">{tier.price}</span>
                    <span className={cn("text-sm", tier.highlighted ? "text-white/90" : "text-ink-muted")}>
                      {tier.period}
                    </span>
                  </p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check
                          size={16}
                          className={cn("mt-0.5 shrink-0", tier.highlighted ? "text-white" : "text-accent")}
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href="#get-started"
                    variant={tier.highlighted ? "white" : "dark"}
                    className="mt-8 w-full shrink-0"
                  >
                    {tier.cta}
                  </ButtonLink>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
