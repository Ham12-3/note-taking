# Notewell landing page

Marketing site for an AI notetaker for Google Meet. "Notewell" is a placeholder name.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and lucide-react.

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Where things live

```
app/
  layout.tsx        fonts, metadata, skip link
  page.tsx          section order
  globals.css       color tokens + glass / halftone / grain utilities
lib/
  site.ts           product name, tagline, URL
  content.ts        every piece of copy on the page
components/
  sections/         Navbar, Hero, Problem, HowItWorks, Features, Testimonials,
                    Trust, Pricing, FAQ, FinalCTA, Footer
  mockups/          HTML/CSS product mockups (hero cards, notes workspace, step panels)
  ui/               Button, Pill, StatusChip, Avatar, Toggle, DreamyBackdrop,
                    Reveal, Floating, WaitlistForm, ...
```

## Common edits

- **Rename the product:** change `name` in `lib/site.ts`.
- **Change copy:** edit `lib/content.ts`. Hero headline alternatives are in a comment there.
- **Change colors:** edit the CSS variables at the top of `app/globals.css`. They are available
  as Tailwind classes (`bg-periwinkle`, `text-ink-muted`, `bg-chip-green`, ...).
  The hero and testimonial gradients are in `components/ui/DreamyBackdrop.tsx`.
- **Hook up the waitlist:** see the `TODO` in `components/ui/WaitlistForm.tsx`.

Before launch, replace the placeholder testimonials, stats, and prices (marked `PLACEHOLDER`
in `lib/content.ts`) and point footer links at real pages.
