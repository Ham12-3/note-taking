import { AudioLines, Bot, CalendarDays, Check, ChevronDown, ListChecks, Sparkles } from "lucide-react";
import { howItWorks } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { LogoMark } from "@/components/ui/Logo";
import { Toggle } from "@/components/ui/Toggle";

const panelHead = "flex items-center gap-3 border-b border-line px-5 py-4";

export function CalendarPanel() {
  const c = howItWorks.calendar;
  return (
    <div>
      <div className={panelHead}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky/30 text-accent">
          <CalendarDays size={17} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">{c.title}</p>
          <p className="text-xs text-ink-muted">{c.account}</p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-chip-green/10 px-2 py-0.5 text-[11px] font-medium text-chip-green">
          <Check size={12} aria-hidden="true" />
          {c.connected}
        </span>
      </div>
      <ul className="divide-y divide-line px-5">
        {c.calendars.map((cal) => (
          <li key={cal.name} className="flex items-center justify-between py-3.5 text-sm text-ink">
            {cal.name}
            <Toggle label={`Watch ${cal.name} calendar`} defaultOn={cal.on} />
          </li>
        ))}
      </ul>
      <p className="px-5 pb-5 pt-1 text-xs text-ink-muted">{c.note}</p>
    </div>
  );
}

export function SettingsPanel() {
  const s = howItWorks.settings;
  return (
    <div>
      <div className={panelHead}>
        <LogoMark className="h-9 w-9" />
        <div>
          <p className="text-sm font-medium text-ink">{s.title}</p>
          <p className="text-xs text-ink-muted">{s.subtitle}</p>
        </div>
      </div>
      <ul className="grid gap-x-6 px-5 sm:grid-cols-2">
        {s.rows.map((r) => (
          <li key={r.label} className="flex items-center justify-between gap-3 border-b border-line py-3.5">
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-ink">{r.label}</p>
              <p className="truncate text-xs text-ink-muted">{r.value}</p>
            </div>
            {r.toggle ? (
              <Toggle label={r.label} />
            ) : (
              <ChevronDown size={15} className="shrink-0 text-ink-subtle" aria-hidden="true" />
            )}
          </li>
        ))}
      </ul>
      <div className="m-5 flex items-start gap-2 rounded-xl bg-gradient-to-r from-sky/25 to-blush/25 p-3 text-xs text-ink">
        <Bot size={15} className="mt-px shrink-0 text-accent" aria-hidden="true" />
        {s.assistant}
      </div>
    </div>
  );
}

export function LivePanel() {
  const l = howItWorks.live;
  return (
    <div>
      <div className={panelHead}>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blush/40 text-chip-pink">
          <AudioLines size={17} aria-hidden="true" />
        </span>
        <p className="text-sm font-medium text-ink">{l.title}</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-chip-pink/10 px-2 py-0.5 text-[11px] font-medium text-chip-pink">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chip-pink" aria-hidden="true" />
          {l.status} · <span className="font-mono">{l.elapsed}</span>
        </span>
      </div>
      {/* Waveform */}
      <div className="flex h-12 items-center gap-[3px] px-5 pt-4" aria-hidden="true">
        {Array.from({ length: 56 }).map((_, i) => (
          <span
            key={i}
            className="w-1 flex-1 rounded-full bg-gradient-to-t from-periwinkle to-blush"
            style={{ height: `${Math.round(18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 82)}%` }}
          />
        ))}
      </div>
      <ul className="space-y-4 p-5">
        {l.lines.map((line, i) => (
          <li key={i} className="flex gap-3">
            <Avatar initials={line.initials} size="md" />
            <div>
              <p className="text-[13px] font-medium text-ink">
                {line.speaker}{" "}
                <span className="ml-1 font-mono text-[11px] font-normal text-ink-subtle">{line.time}</span>
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-ink-muted">{line.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RecapPanel() {
  const r = howItWorks.recap;
  return (
    <div className="p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-ink">
        <Sparkles size={15} className="text-periwinkle" aria-hidden="true" />
        {r.title}
      </p>
      <ul className="mt-3 space-y-2">
        {r.points.map((p) => (
          <li key={p} className="rounded-xl bg-canvas px-3.5 py-2.5 text-[13px] text-ink">
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2 text-sm font-medium text-ink">
        <ListChecks size={15} className="text-chip-orange" aria-hidden="true" />
        {r.actionsTitle}
      </p>
      <ul className="mt-3 divide-y divide-line rounded-xl border border-line">
        {r.actions.map((a) => (
          <li key={a.task} className="flex items-center justify-between gap-3 px-3.5 py-3 text-[13px] text-ink">
            <span className="flex items-center gap-2.5">
              <span className="h-4 w-4 rounded-md border border-ink-subtle/60" aria-hidden="true" />
              {a.task}
            </span>
            <span className="rounded-full bg-lavender/25 px-2 py-0.5 text-[11px] text-ink">{a.owner}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SharePanel() {
  const d = howItWorks.destinations;
  return (
    <div className="p-5">
      <p className="text-sm font-medium text-ink">{d.title}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {d.items.map((it) => (
          <li key={it.name} className="flex items-center gap-3 rounded-xl border border-line bg-white p-3.5">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: it.color }}
              aria-hidden="true"
            >
              {it.mark}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-ink">{it.name}</p>
              <p className="truncate text-xs text-ink-muted">{it.detail}</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-chip-green">
              <Check size={12} aria-hidden="true" />
              {it.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const stepPanels = {
  connect: CalendarPanel,
  join: SettingsPanel,
  transcript: LivePanel,
  summary: RecapPanel,
  share: SharePanel,
} as const;
