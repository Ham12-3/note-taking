/**
 * Local Google Meet notetaker bot (for testing, $0 to run).
 *
 *   npm run join -- https://meet.google.com/abc-defg-hij
 *
 * Opens Chrome, joins the meeting as a guest, turns on Meet's live captions,
 * and saves a speaker-labelled transcript to output/<meeting>-<time>/.
 * If OPENAI_API_KEY is set (bot/.env), it also writes an AI summary when the call ends.
 * Press Ctrl+C to make the bot leave early; the transcript is saved either way.
 */
import { join } from "node:path";
import { parseArgs } from "node:util";
import { chromium, type Browser } from "playwright";
import { site } from "../../lib/site";
import { readCollector, startCollector } from "./captions";
import {
  announce,
  callHasEnded,
  enableCaptions,
  joinMeeting,
  leaveCall,
  meetingCode,
  MeetError,
} from "./meet";
import { openAiConfig } from "./env";
import { saveSummary, summarizeTranscript } from "./summarize";
import { saveTranscript, type Transcript } from "./transcript";

const HELP = `
Usage: npm run join -- <meet-url> [options]

Options:
  --name <text>        Name shown in the meeting   (default: "${site.name} Notetaker")
  --headless           Run without a visible browser window
  --max-minutes <n>    Leave after this many minutes (default: 120)
  --admit-minutes <n>  How long to wait to be admitted (default: 5)
  --no-announce        Don't post the "taking notes" message in chat
  --no-summary         Skip the OpenAI summary at the end
  --out <dir>          Output folder (default: bot/output)
`;

function parseCli() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      name: { type: "string", default: `${site.name} Notetaker` },
      headless: { type: "boolean", default: false },
      "max-minutes": { type: "string", default: "120" },
      "admit-minutes": { type: "string", default: "5" },
      "no-announce": { type: "boolean", default: false },
      "no-summary": { type: "boolean", default: false },
      out: { type: "string", default: join(import.meta.dirname, "..", "output") },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  const url = positionals[0];
  if (values.help || !url) {
    console.log(HELP);
    process.exit(values.help ? 0 : 1);
  }
  if (!/^https:\/\/meet\.google\.com\/[a-z0-9-]+/i.test(url)) {
    console.error(`Not a Google Meet link: ${url}`);
    process.exit(1);
  }
  return {
    url,
    name: values.name,
    headless: values.headless,
    maxMs: Number(values["max-minutes"]) * 60_000,
    admitMs: Number(values["admit-minutes"]) * 60_000,
    announce: !values["no-announce"],
    summary: !values["no-summary"],
    outDir: values.out,
  };
}

const log = (msg: string) => console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);

function stamp(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

async function launch(headless: boolean): Promise<Browser> {
  // --mute-audio: the bot listens through captions, so don't play the call through your speakers.
  const args = ["--mute-audio", "--lang=en-US"];
  try {
    return await chromium.launch({ channel: "chrome", headless, args });
  } catch {
    log("Installed Chrome not found, falling back to Playwright's Chromium.");
    return chromium.launch({ headless, args });
  }
}

async function main() {
  const cfg = parseCli();
  const code = meetingCode(cfg.url);
  const dir = join(cfg.outDir, `${code}-${stamp()}`);

  let stopRequested = false;
  process.on("SIGINT", () => {
    if (stopRequested) process.exit(130);
    stopRequested = true;
    log("Stopping… (press Ctrl+C again to force quit)");
  });

  const browser = await launch(cfg.headless);
  // No camera/mic permissions: the bot only listens.
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: "en-US" });
  const page = await context.newPage();

  const transcript: Transcript = {
    meetingCode: code,
    url: cfg.url,
    botName: cfg.name,
    joinedAt: new Date().toISOString(),
    endedAt: null,
    endReason: null,
    segments: [],
  };

  const snapshot = async () => {
    const state = await readCollector(page).catch(() => null);
    if (state) transcript.segments = state.segments;
    saveTranscript(dir, transcript);
    return state;
  };

  try {
    log(`Joining ${code} as "${cfg.name}"…`);
    await joinMeeting(page, { url: cfg.url, name: cfg.name, admitTimeoutMs: cfg.admitMs, log });
    transcript.joinedAt = new Date().toISOString();
    log("In the call.");

    if (!(await enableCaptions(page))) {
      log("⚠ Couldn't turn on captions. Try turning them on in the bot's window (press c).");
    }
    await startCollector(page);

    if (cfg.announce) {
      const ok = await announce(
        page,
        `Hi, I'm ${cfg.name}. I'm taking notes for this meeting from live captions.`,
      );
      log(ok ? "Posted a note-taking notice in chat." : "⚠ Couldn't post the chat notice.");
    }

    log(`Recording captions. Transcript: ${dir}`);
    const startedAt = Date.now();
    let missedChecks = 0;
    let lastCount = 0;
    let warnedNoCaptions = false;

    while (!stopRequested) {
      await page.waitForTimeout(3000).catch(() => {});
      const state = await snapshot();

      if (state && state.segments.length !== lastCount) {
        lastCount = state.segments.length;
        const last = state.segments[lastCount - 1];
        log(`${lastCount} caption blocks · ${last.speaker}: ${last.text.slice(0, 60)}`);
      }
      if (state && !state.regionFound && !warnedNoCaptions && Date.now() - startedAt > 20_000) {
        warnedNoCaptions = true;
        log("⚠ Captions panel not found. Nothing will be recorded until captions are on.");
      }

      // Require a few misses in a row so a brief UI change doesn't end the recording.
      missedChecks = (await callHasEnded(page)) ? missedChecks + 1 : 0;
      if (missedChecks >= 3) {
        transcript.endReason = "call ended";
        break;
      }
      if (Date.now() - startedAt > cfg.maxMs) {
        transcript.endReason = "max duration reached";
        break;
      }
    }
    transcript.endReason ??= "stopped by user";
  } catch (err) {
    transcript.endReason = err instanceof MeetError ? err.message : `error: ${String(err)}`;
    log(`✗ ${transcript.endReason}`);
    process.exitCode = 1;
  } finally {
    await snapshot().catch(() => {});
    await leaveCall(page).catch(() => {});
    transcript.endedAt = new Date().toISOString();
    saveTranscript(dir, transcript);
    await browser.close().catch(() => {});
    log(`Done (${transcript.endReason}). ${transcript.segments.length} caption blocks saved to ${dir}`);
  }

  if (cfg.summary && transcript.segments.length > 0) await writeSummary(dir, transcript);
}

async function writeSummary(dir: string, transcript: Transcript) {
  const ai = openAiConfig();
  if (!ai) {
    log("No OPENAI_API_KEY in bot/.env, so skipping the summary.");
    return;
  }
  try {
    log(`Summarizing with ${ai.model}…`);
    saveSummary(dir, await summarizeTranscript(transcript, ai), transcript);
    log(`Summary saved to ${join(dir, "summary.md")}`);
  } catch (err) {
    log(`⚠ Summary failed: ${err instanceof Error ? err.message : String(err)}`);
    log(`  Retry later with: npm run summarize -- "${dir}"`);
  }
}

main();
