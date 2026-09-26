/**
 * All page copy lives here. Edit text without touching components.
 * The product name comes from lib/site.ts.
 */
import { NAME } from "./site";

export type ChipTone = "green" | "pink" | "orange" | "blue";

/* ---------------------------------------------------------------- Nav */

export const nav = {
  links: [
    { label: "Product", href: "#how-it-works" },
    { label: "Solutions", href: "#features" },
    { label: "Resources", href: "#faq" },
    { label: "Pricing", href: "#pricing" },
  ],
  cta: { label: "Try for free", href: "#get-started" },
};

/* --------------------------------------------------------------- Hero */

export const hero = {
  chip: "Works with Google Meet",
  // Alternatives:
  //   "Be in the meeting. We'll take the notes."
  //   "Stop typing. Start listening."
  headline: "Every meeting, captured. Nothing missed.",
  subtext: `${NAME} joins your Google Meet calls and hands you notes, a summary, and action items the moment you hang up.`,
  primaryCta: { label: "Add to Google Meet", href: "#get-started" },
  secondaryCta: { label: "Watch demo", href: "#how-it-works" },
  chips: [
    { label: "Recording", tone: "pink" as ChipTone },
    { label: "Speaker identified", tone: "blue" as ChipTone },
    { label: "Action items found", tone: "orange" as ChipTone },
    { label: "Sent to Slack", tone: "green" as ChipTone },
  ],
  transcript: {
    title: "Live transcript",
    meeting: "Q4 roadmap sync",
    lines: [
      { speaker: "Maya Ortiz", initials: "MO", time: "00:04", text: "Let's lock the launch date before we talk scope." },
      { speaker: "Dev Patel", initials: "DP", time: "00:11", text: "Engineering can commit to the 14th if we cut the export feature." },
      { speaker: "Maya Ortiz", initials: "MO", time: "00:19", text: "Okay, the 14th it is. Export moves to December." },
    ],
  },
  summary: {
    title: "Meeting summary",
    badge: "Summary ready",
    meta: "Q4 roadmap sync · 32 min · 4 people",
    points: [
      "Launch date set for Nov 14",
      "CSV export moved to the December release",
      "Design review needs one more pass on onboarding",
    ],
  },
  actions: {
    title: "Action items",
    items: [
      { task: "Update launch plan with Nov 14", owner: "Maya", initials: "MO", done: true },
      { task: "Share revised scope with sales", owner: "Dev", initials: "DP", done: false },
      { task: "Book onboarding design review", owner: "Lena", initials: "LK", done: false },
    ],
  },
};

/* ------------------------------------------------------------ Problem */

export const problem = {
  pill: `Why ${NAME}`,
  statement: "Most teams spend the meeting taking notes instead of listening.",
  statementMuted: `${NAME} takes them for you, quietly in the background.`,
  workspace: {
    listTitle: "Today",
    meetings: [
      { title: "Customer interview: Acme", time: "9:30 AM", duration: "28 min", status: "Notes ready" },
      { title: "Weekly product sync", time: "11:00 AM", duration: "45 min", status: "Notes ready", active: true },
      { title: "Candidate screen: Senior PM", time: "1:15 PM", duration: "30 min", status: "Notes ready" },
      { title: "Pipeline review", time: "3:00 PM", duration: "Live", status: "Recording" },
    ],
    notes: {
      title: "Weekly product sync",
      meta: "Tue, Sep 22 · 45 min · Google Meet",
      tabs: ["Summary", "Transcript", "Action items"],
      overview:
        "The team agreed to ship the new onboarding flow behind a flag next week and revisit pricing page tests after launch.",
      decisions: [
        "Ship onboarding v2 behind a feature flag on Monday",
        "Pause pricing page tests until after launch",
      ],
      nextSteps: [
        { task: "Write rollout plan", owner: "Priya" },
        { task: "Draft launch email", owner: "Sam" },
      ],
    },
    sideCards: {
      writing: `${NAME} is writing notes...`,
      writingSteps: ["Transcribing audio", "Matching speakers", "Drafting summary"],
      shared: "Sent to #product-team",
      task: "3 action items found",
      ready: "Notes ready",
    },
  },
};

/* -------------------------------------------------------- How it works */

export const howItWorks = {
  pill: "How it works",
  heading: "Set it up once.",
  headingMuted: "Every call after that takes care of itself.",
  steps: [
    {
      id: "connect",
      title: "Connect Google Calendar",
      body: "Sign in with Google and pick which calendars to watch. Takes about a minute.",
    },
    {
      id: "join",
      title: `${NAME} joins your Meet`,
      body: "It joins scheduled calls on its own, or you can add it to any meeting with one click.",
    },
    {
      id: "transcript",
      title: "Live transcript",
      body: "Follow along in real time with speaker names and timestamps, so you can jump back to any moment.",
    },
    {
      id: "summary",
      title: "AI summary and action items",
      body: "When the call ends, you get a short summary, the decisions that were made, and who owns what.",
    },
    {
      id: "share",
      title: "Share anywhere",
      body: "Send notes to email, Slack, Notion, or Google Docs automatically, or share them by hand.",
    },
  ],
  // Copy for the panel shown next to each step
  calendar: {
    title: "Connect your calendar",
    account: "maya@yourcompany.com",
    connected: "Connected",
    calendars: [
      { name: "Work", on: true },
      { name: "Hiring", on: true },
      { name: "Personal", on: false },
    ],
    note: "Only events with a Google Meet link are picked up.",
  },
  settings: {
    title: "Your notetaker settings",
    subtitle: `${NAME} will use these for every meeting.`,
    rows: [
      { label: "Auto-join meetings", value: "Meetings I organize", toggle: true },
      { label: "Language", value: "English (auto-detect)" },
      { label: "Summary style", value: "Concise bullets" },
      { label: "Who gets notes", value: "All invited attendees" },
      { label: "Send recap to Slack", value: "#team-notes", toggle: true },
    ],
    assistant: `${NAME} will join "Design review" at 2:00 PM and send notes to 5 people.`,
  },
  live: {
    title: "Design review",
    status: "Recording",
    elapsed: "12:48",
    lines: [
      { speaker: "Alex Rivera", initials: "AR", time: "12:31", text: "Can we simplify the empty state? It feels busy." },
      { speaker: "Priya Shah", initials: "PS", time: "12:39", text: "Agreed. I'll drop the illustration and keep one clear action." },
      { speaker: "Alex Rivera", initials: "AR", time: "12:46", text: "Great, let's review it again on Thursday." },
    ],
  },
  recap: {
    title: "Summary",
    points: [
      "Empty state will be simplified to a single call to action",
      "Illustration removed from onboarding screens",
    ],
    actionsTitle: "Action items",
    actions: [
      { task: "Update empty state design", owner: "Priya" },
      { task: "Schedule follow-up review for Thursday", owner: "Alex" },
    ],
  },
  destinations: {
    title: "Where notes go",
    items: [
      { name: "Email", detail: "All attendees", mark: "@", color: "#3b6fe0", status: "Sent" },
      { name: "Slack", detail: "#design-team", mark: "#", color: "#d9468f", status: "Sent" },
      { name: "Notion", detail: "Meeting notes database", mark: "N", color: "#16161d", status: "Synced" },
      { name: "Google Docs", detail: "Design / Reviews", mark: "D", color: "#1f9d63", status: "Created" },
    ],
  },
};

/* ------------------------------------------------------------ Features */

export const features = {
  pill: "Features",
  heading: "Everything you'd want from a great notetaker.",
  headingMuted: "Nothing you'd have to babysit.",
  items: [
    {
      icon: "mic",
      title: "Live transcription",
      body: "Accurate, real-time transcripts you can read during the call or search after it.",
    },
    {
      icon: "users",
      title: "Speaker detection",
      body: "Every line is labeled with who said it, so quotes and follow-ups are never a guess.",
    },
    {
      icon: "sparkles",
      title: "AI summaries",
      body: "A short, readable recap of what mattered, written for people who weren't there.",
    },
    {
      icon: "list-checks",
      title: "Action items and decisions",
      body: "Tasks and owners are pulled out automatically, along with what the group agreed on.",
    },
    {
      icon: "search",
      title: "Search across all meetings",
      body: "Find that one thing a customer said three weeks ago in seconds.",
    },
    {
      icon: "plug",
      title: "Integrations",
      body: "Send notes to Slack, Notion, Google Docs, or email without copying and pasting.",
    },
  ] as const,
};

/* -------------------------------------------------------- Testimonials */

// PLACEHOLDER: names, companies, quotes, and stats below are fictional.
// Replace with real customer quotes (with permission) before launch.
export const testimonials = {
  pill: "Customer stories",
  heading: "Fewer notes to write.",
  headingMuted: "More calls you actually remember.",
  items: [
    {
      company: "Placeholder Co.",
      quote: `I used to leave every call with half-finished notes. Now I just talk, and ${NAME} has a clean recap in Slack before I'm back at my desk.`,
      name: "Jordan Example",
      role: "Founder, Placeholder Co.",
      initials: "JE",
      stat: "5h",
      statLabel: "saved per week",
    },
    {
      company: "Sample Labs",
      quote: "Our sales team stopped arguing about who promised what. The action items and owners are just there after every demo.",
      name: "Riley Sample",
      role: "Head of Sales, Sample Labs",
      initials: "RS",
      stat: "2x",
      statLabel: "faster follow-ups",
    },
    {
      company: "Demo Talent",
      quote: "I run eight interviews a day. Having searchable transcripts means I can focus on the candidate instead of my keyboard.",
      name: "Casey Demo",
      role: "Recruiting Lead, Demo Talent",
      initials: "CD",
      stat: "8",
      statLabel: "interviews a day, fully documented",
    },
  ],
};

/* --------------------------------------------------------------- Trust */

export const trust = {
  pill: "Privacy",
  heading: "Your meetings stay yours.",
  items: [
    {
      icon: "lock",
      title: "Private by default",
      body: "Recordings and notes are only visible to you until you choose to share them.",
    },
    {
      icon: "user-check",
      title: "You decide who gets notes",
      body: "Choose per meeting or set a default. Nothing is sent without your settings saying so.",
    },
    {
      icon: "trash",
      title: "Delete anytime",
      body: "Remove a recording, a transcript, or your whole account whenever you want.",
    },
  ] as const,
};

/* ------------------------------------------------------------- Pricing */

// PLACEHOLDER prices. Update before launch.
export const pricing = {
  pill: "Pricing",
  heading: "Start free.",
  headingMuted: "Upgrade when your calendar fills up.",
  tiers: [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "For trying it out on your own calls.",
      features: ["10 meetings per month", "Live transcripts", "AI summaries", "7-day history"],
      cta: "Start for free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$15",
      period: "per month",
      description: "For people with back-to-back calls.",
      features: [
        "Unlimited meetings",
        "Action items and decisions",
        "Search across all meetings",
        "Slack, Notion, and Google Docs",
        "Unlimited history",
      ],
      cta: "Start 14-day trial",
      highlighted: true,
      badge: "Most popular",
    },
    {
      name: "Team",
      price: "$25",
      period: "per user / month",
      description: "For teams that share notes by default.",
      features: [
        "Everything in Pro",
        "Shared team workspace",
        "Admin controls and roles",
        "Custom summary templates",
        "Priority support",
      ],
      cta: "Contact sales",
      highlighted: false,
    },
  ],
};

/* ----------------------------------------------------------------- FAQ */

export const faq = {
  pill: "FAQ",
  heading: "Questions, answered.",
  items: [
    {
      q: "Does it only work with Google Meet?",
      a: `For now, yes. ${NAME} is built for Google Meet first so it works really well there. Zoom and Microsoft Teams are on the roadmap.`,
    },
    {
      q: "Do other people know the meeting is being recorded?",
      a: `Yes. ${NAME} joins as a visible participant with a clear name, and you can turn on an automatic chat message letting everyone know notes are being taken. Always follow the recording laws and policies that apply to you.`,
    },
    {
      q: "What languages are supported?",
      a: "English, Spanish, French, German, and Portuguese at launch, with more coming. The language is detected automatically, or you can set it per meeting.",
    },
    {
      q: "Where is my data stored?",
      a: "Recordings and notes are stored encrypted with a major cloud provider. You can delete any recording or transcript at any time.",
    },
    {
      q: "Can I choose which meetings it joins?",
      a: "Yes. Have it join every meeting, only meetings you organize, or only the ones you add it to by hand.",
    },
    {
      q: "Do I need to install anything?",
      a: "No download needed. Connect your Google account in the browser and you're ready for your next call.",
    },
  ],
};

/* ----------------------------------------------------------- Final CTA */

export const finalCta = {
  heading: "Your next meeting is already taken care of.",
  subtext: `Add ${NAME} to your calendar and walk out of every call with notes you didn't have to write.`,
  cta: "Start for free",
  emailLabel: "Work email",
  emailPlaceholder: "you@company.com",
  success: "You're on the list. We'll be in touch soon.",
  submitting: "Joining...",
  error: "Please enter a valid email address.",
  chips: [
    { label: "Notes sent", tone: "green" as ChipTone },
    { label: "Summary ready", tone: "blue" as ChipTone },
    { label: "Task created", tone: "orange" as ChipTone },
    { label: "Decision logged", tone: "pink" as ChipTone },
  ],
};

/* -------------------------------------------------------------- Footer */

export const footer = {
  blurb: "AI meeting notes for Google Meet.",
  copyright: "All rights reserved.",
  legal: "Google Meet is a trademark of Google LLC.",
  columns: [
    { title: "Product", links: ["How it works", "Features", "Pricing", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Contact"] },
    { title: "Resources", links: ["Blog", "Help center", "FAQ"] },
    { title: "Integrations", links: ["Google Meet", "Slack", "Notion", "Google Docs"] },
    { title: "Legal", links: ["Privacy policy", "Terms of service", "Security"] },
    { title: "Social", links: ["X", "LinkedIn", "YouTube"] },
  ],
};
