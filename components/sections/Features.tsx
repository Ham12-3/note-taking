import { ListChecks, Mic, Plug, Search, Sparkles, Users, type LucideIcon } from "lucide-react";
import { features } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<(typeof features.items)[number]["icon"], LucideIcon> = {
  mic: Mic,
  users: Users,
  sparkles: Sparkles,
  "list-checks": ListChecks,
  search: Search,
  plug: Plug,
};

const tints = [
  "from-sky/60 to-periwinkle/40 text-accent",
  "from-blush/60 to-lavender/40 text-chip-pink",
  "from-lavender/60 to-sky/40 text-[#6b5bd6]",
  "from-peach/70 to-blush/40 text-chip-orange",
  "from-sky/60 to-lavender/40 text-chip-blue",
  "from-[#bfe8d6] to-sky/40 text-chip-green",
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-10 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-gradient-to-r from-sky/35 via-lavender/30 to-blush/35 blur-3xl"
      />
      <Container>
        <SectionHeading
          id="features-heading"
          pill={features.pill}
          heading={features.heading}
          muted={features.headingMuted}
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-5">
          {features.items.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <li key={f.title}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <article className="glass group h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tints[i % tints.length]}`}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium tracking-tight text-ink">{f.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{f.body}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
