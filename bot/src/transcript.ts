import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Segment } from "./captions";

export type Transcript = {
  meetingCode: string;
  url: string;
  botName: string;
  /** ISO timestamps */
  joinedAt: string;
  endedAt: string | null;
  endReason: string | null;
  segments: Segment[];
};

function clock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${pad(m)}:${pad(s % 60)}`;
}

/** Joins back-to-back segments from the same speaker into one paragraph. */
export function paragraphs(t: Transcript) {
  const out: { speaker: string; at: number; text: string }[] = [];
  for (const s of t.segments) {
    const last = out[out.length - 1];
    if (last && last.speaker === s.speaker) last.text += ` ${s.text}`;
    else out.push({ speaker: s.speaker, at: s.start, text: s.text });
  }
  return out;
}

export function toMarkdown(t: Transcript) {
  const start = Date.parse(t.joinedAt);
  const lines = [
    `# Meeting ${t.meetingCode}`,
    "",
    `- Joined: ${new Date(t.joinedAt).toLocaleString()}`,
    `- Ended: ${t.endedAt ? new Date(t.endedAt).toLocaleString() : "in progress"}`,
    `- Speakers: ${[...new Set(t.segments.map((s) => s.speaker))].join(", ") || "none yet"}`,
    "",
    "## Transcript",
    "",
  ];
  for (const p of paragraphs(t)) {
    lines.push(`**${p.speaker}** (${clock(p.at - start)}): ${p.text}`, "");
  }
  return lines.join("\n");
}

/** Writes transcript.json and transcript.md, replacing the old files atomically. */
export function saveTranscript(dir: string, t: Transcript) {
  mkdirSync(dir, { recursive: true });
  const write = (name: string, body: string) => {
    const tmp = join(dir, `${name}.tmp`);
    writeFileSync(tmp, body, "utf8");
    renameSync(tmp, join(dir, name));
  };
  write("transcript.json", JSON.stringify(t, null, 2));
  write("transcript.md", toMarkdown(t));
}
