import { readFileSync } from "node:fs";
import type { Page } from "playwright";

export type Segment = {
  speaker: string;
  text: string;
  /** Epoch ms when the caption first appeared / last changed. */
  start: number;
  end: number;
};

type CollectorState = { segments: Segment[]; regionFound: boolean; lastActivity: number };

const collectorSource = readFileSync(new URL("./collector.browser.js", import.meta.url), "utf8");

/** Starts the in-page caption collector. Safe to call more than once. */
export async function startCollector(page: Page) {
  await page.evaluate(collectorSource);
}

/** Reads everything the collector has captured so far. */
export async function readCollector(page: Page): Promise<CollectorState | null> {
  // Passed as a string so tsx's transforms never touch code that runs in the page.
  const json = await page.evaluate("window.__notewell ? JSON.stringify(window.__notewell) : null");
  return typeof json === "string" ? (JSON.parse(json) as CollectorState) : null;
}
