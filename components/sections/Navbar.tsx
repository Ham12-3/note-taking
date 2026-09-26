"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/components/ui/cn";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Light (white) text while floating over the hero, dark once the bar turns to glass.
  const light = !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-4">
      <div
        className={cn(
          "mx-auto max-w-[1400px] rounded-2xl transition-[background-color,box-shadow,border-color] duration-300",
          light ? "border border-transparent" : "glass",
        )}
      >
        <nav aria-label="Main" className="flex h-14 items-center justify-between px-3 sm:px-5 md:h-16">
          <Link
            href="/"
            className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Logo tone={light ? "light" : "dark"} />
          </Link>

          <ul
            className={cn(
              "hidden items-center gap-1 rounded-full p-1 md:flex",
              light ? "glass-tint" : "border border-line bg-white/60",
            )}
          >
            {nav.links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={cn(
                    "block rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent",
                    light ? "text-white hover:bg-white/20" : "text-ink-muted hover:bg-white hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink href={nav.cta.href} size="sm" variant={light ? "white" : "dark"}>
                {nav.cta.label}
              </ButtonLink>
            </span>
            <button
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-accent md:hidden",
                light ? "text-white hover:bg-white/15" : "text-ink hover:bg-black/5",
              )}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 px-3 pb-4">
                {nav.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-[15px] text-ink hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <ButtonLink href={nav.cta.href} variant="dark" className="w-full" onClick={() => setOpen(false)}>
                    {nav.cta.label}
                  </ButtonLink>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
