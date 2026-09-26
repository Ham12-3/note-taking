/**
 * Summarize a transcript the bot already saved:
 *
 *   npm run summarize -- output/abc-defg-hij-20260926-0930
 */
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { openAiConfig } from "./env";
import { saveSummary, summarizeTranscript } from "./summarize";
import type { Transcript } from "./transcript";

async function main() {
  const dir = process.argv[2];
  if (!dir) {
    console.error("Usage: npm run summarize -- <output folder containing transcript.json>");
    process.exit(1);
  }
  const file = join(resolve(dir), "transcript.json");
  if (!existsSync(file)) {
    console.error(`No transcript.json in ${dir}`);
    process.exit(1);
  }

  const ai = openAiConfig();
  if (!ai) {
    console.error("OPENAI_API_KEY is not set. Copy bot/.env.example to bot/.env and add your key.");
    process.exit(1);
  }

  const transcript = JSON.parse(readFileSync(file, "utf8")) as Transcript;
  console.log(`Summarizing ${transcript.segments.length} caption blocks with ${ai.model}…`);
  const summary = await summarizeTranscript(transcript, ai);
  saveSummary(resolve(dir), summary, transcript);
  console.log(`Saved ${join(dir, "summary.md")}`);
}

main().catch((err) => {
  console.error(`✗ ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
