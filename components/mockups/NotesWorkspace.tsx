import { CalendarDays, CheckCircle2, Circle, Flag, Search, Sparkles } from "lucide-react";
import { problem } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/components/ui/cn";

/** Large product mockup: meeting list on the left, notes on the right. */
export function NotesWorkspace() {
  const w = problem.workspace;
  const n = w.notes;

  return (
    <div className="glass overflow-hidden rounded-2xl bg-white/90 text-left">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f3b3b3]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f5d9a3]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#b8e0c3]" />
        <div className="ml-3 flex h-7 flex-1 items-center gap-2 rounded-lg bg-canvas px-3 text-[11px] text-ink-subtle sm:max-w-xs">
          <Search size={12} aria-hidden="true" />
          Search all meetings
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr]">
        {/* Meeting list */}
        <aside className="hidden border-r border-line bg-canvas/60 p-3 md:block">
          <div className="flex items-center gap-2 px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
            <CalendarDays size={12} aria-hidden="true" />
            {w.listTitle}
          </div>
          <ul className="space-y-1">
            {w.meetings.map((m) => (
              <li
                key={m.title}
                className={cn(
                  "rounded-xl px-3 py-2.5",
                  m.active ? "bg-white shadow-sm ring-1 ring-line" : "",
                )}
              >
                <p className="truncate text-[12px] font-medium text-ink">{m.title}</p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-ink-subtle">
                  <span>
                    {m.time} · {m.duration}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1",
                      m.status === "Recording" ? "text-chip-pink" : "text-chip-green",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        m.status === "Recording" ? "bg-chip-pink" : "bg-chip-green",
                      )}
                    />
                    {m.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Notes */}
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-lg font-medium tracking-tight text-ink">{n.title}</p>
              <p className="mt-0.5 text-[12px] text-ink-subtle">{n.meta}</p>
            </div>
            <div className="flex -space-x-1.5">
              {["PR", "SM", "AK", "JT"].map((i) => (
                <Avatar key={i} initials={i} size="sm" />
              ))}
            </div>
          </div>

          <div className="mt-5 flex gap-1 border-b border-line text-[12px]">
            {n.tabs.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "-mb-px border-b-2 px-3 pb-2",
                  i === 0 ? "border-accent font-medium text-ink" : "border-transparent text-ink-subtle",
                )}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
                <Sparkles size={12} className="text-periwinkle" aria-hidden="true" />
                Overview
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink">{n.overview}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
                  <Flag size={12} className="text-chip-pink" aria-hidden="true" />
                  Decisions
                </p>
                <ul className="mt-2 space-y-2">
                  {n.decisions.map((d) => (
                    <li key={d} className="flex gap-2 text-[12px] leading-snug text-ink">
                      <CheckCircle2 size={14} className="mt-px shrink-0 text-chip-green" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
                  <Circle size={12} className="text-chip-orange" aria-hidden="true" />
                  Next steps
                </p>
                <ul className="mt-2 space-y-2">
                  {n.nextSteps.map((s) => (
                    <li
                      key={s.task}
                      className="flex items-center justify-between gap-2 rounded-lg bg-canvas px-3 py-2 text-[12px] text-ink"
                    >
                      {s.task}
                      <span className="text-[10px] text-ink-muted">{s.owner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
