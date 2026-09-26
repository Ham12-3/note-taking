import { Lock, Trash2, UserCheck, type LucideIcon } from "lucide-react";
import { trust } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<(typeof trust.items)[number]["icon"], LucideIcon> = {
  lock: Lock,
  "user-check": UserCheck,
  trash: Trash2,
};

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="py-20 md:py-24">
      <Container>
        <Reveal className="glass grid gap-10 rounded-3xl p-8 md:grid-cols-[minmax(0,260px)_1fr] md:gap-12 md:p-12">
          <div>
            <Pill>{trust.pill}</Pill>
            <h2 id="trust-heading" className="mt-5 text-3xl font-light leading-tight tracking-[-0.03em] text-ink">
              {trust.heading}
            </h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-3">
            {trust.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title}>
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                  <h3 className="mt-3 text-[15px] font-medium text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
