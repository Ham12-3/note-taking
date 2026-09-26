import { AudioLines, Check, CheckCircle2, Circle, ListChecks, Sparkles } from "lucide-react";
import { hero } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/components/ui/cn";

function CardHeader({ icon, title, right }: { icon: React.ReactNode; title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-line/80 px-4 py-3">
      <div className="flex items-center gap-2 text-[13px] font-medium text-ink">
        {icon}
        {title}
      </div>
      {right}
    </div>
  );
}

export function TranscriptCard({ className }: { className?: string }) {
  const t = hero.transcript;
  return (
    <div className={cn("glass w-full overflow-hidden rounded-2xl text-left", className)}>
      <CardHeader
        icon={<AudioLines size={15} className="text-accent" aria-hidden="true" />}
        title={t.title}
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-chip-pink/10 px-2 py-0.5 text-[10px] font-medium text-chip-pink">
            <span className="h-1.5 w-1.5 rounded-full bg-chip-pink" aria-hidden="true" />
            Live
          </span>
        }
      />
      <ul className="space-y-3 px-4 py-3.5">
        {t.lines.map((l, i) => (
          <li key={i} className="flex gap-2.5">
            <Avatar initials={l.initials} size="sm" className="mt-0.5" />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-[12px] font-medium text-ink">{l.speaker}</span>
                <span className="font-mono text-[10px] text-ink-subtle">{l.time}</span>
              </div>
              <p className="mt-0.5 text-[12px] leading-snug text-ink-muted">{l.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SummaryCard({ className }: { className?: string }) {
  const s = hero.summary;
  return (
    <div className={cn("glass w-full overflow-hidden rounded-2xl bg-white/85 text-left", className)}>
      <CardHeader
        icon={<LogoMark className="h-5 w-5" />}
        title={s.title}
        right={
          <span className="inline-flex items-center gap-1 rounded-full bg-chip-green/10 px-2 py-0.5 text-[10px] font-medium text-chip-green">
            <Check size={11} aria-hidden="true" />
            {s.badge}
          </span>
        }
      />
      <div className="px-4 py-4">
        <p className="text-[11px] text-ink-subtle">{s.meta}</p>
        <ul className="mt-3 space-y-2">
          {s.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-ink">
              <Sparkles size={13} className="mt-0.5 shrink-0 text-periwinkle" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-canvas px-3 py-2">
          <div className="flex -space-x-1.5">
            {["MO", "DP", "LK", "AR"].map((i) => (
              <Avatar key={i} initials={i} size="xs" />
            ))}
          </div>
          <span className="text-[11px] text-ink-muted">Shared with 4 attendees</span>
        </div>
      </div>
    </div>
  );
}

export function ActionItemsCard({ className }: { className?: string }) {
  const a = hero.actions;
  return (
    <div className={cn("glass w-full overflow-hidden rounded-2xl text-left", className)}>
      <CardHeader
        icon={<ListChecks size={15} className="text-chip-orange" aria-hidden="true" />}
        title={a.title}
        right={<span className="text-[10px] text-ink-subtle">{a.items.length} found</span>}
      />
      <ul className="space-y-2.5 px-4 py-3.5">
        {a.items.map((it) => (
          <li key={it.task} className="flex items-start gap-2.5">
            {it.done ? (
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-chip-green" aria-hidden="true" />
            ) : (
              <Circle size={15} className="mt-0.5 shrink-0 text-ink-subtle" aria-hidden="true" />
            )}
            <div className="min-w-0 flex-1">
              <p className={cn("text-[12px] leading-snug", it.done ? "text-ink-subtle line-through" : "text-ink")}>
                {it.task}
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[10px] text-ink-muted">
                <Avatar initials={it.initials} size="xs" className="ring-1" />
                {it.owner}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
