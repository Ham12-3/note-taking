import Link from "next/link";
import { footer } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/50">
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,240px)_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[16rem] text-sm text-ink-muted">{footer.blurb}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-sm font-medium text-ink">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      {/* TODO: point these at real pages */}
                      <Link
                        href="#"
                        className="rounded text-sm text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row">
          <p>
            © {site.year} {site.name}. {footer.copyright}
          </p>
          <p>{footer.legal}</p>
        </div>
      </Container>
    </footer>
  );
}
