/**
 * Runs the caption collector against a fake captions panel that mimics how
 * Meet renders live captions (avatar + name + growing text), so the parsing
 * logic can be checked without joining a real meeting.
 */
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { readCollector, startCollector } from "../src/captions";

const AVATAR = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

// Page-side helpers, passed as strings so tsx never rewrites them.
const fixture = `
<!doctype html>
<div role="region" aria-label="Captions" id="region"></div>
<script>
  let n = 0;
  window.say = (speaker, text) => {
    const block = document.createElement("div");
    block.id = "b" + n++;
    block.innerHTML =
      '<div><img src="${AVATAR}" alt=""><span></span></div><div class="t"></div>';
    block.querySelector("span").textContent = speaker;
    block.querySelector(".t").textContent = text;
    document.getElementById("region").appendChild(block);
    return block.id;
  };
  window.update = (id, text) => { document.getElementById(id).querySelector(".t").textContent = text; };
  window.drop = (id) => document.getElementById(id).remove();
</script>`;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(fixture);

    const before = await readCollector(page);
    assert.equal(before, null, "collector should not exist before it is started");

    await startCollector(page);
    await startCollector(page); // second call must be a no-op

    // 1. A speaker starts talking; Meet grows the text in place.
    const a = await page.evaluate(`say("Maya Ortiz", "Let's lock")`);
    await wait(600);
    await page.evaluate(`update("${a}", "Let's lock the launch date before we talk scope.")`);
    await wait(600);

    // 2. Someone else replies in a new block.
    const b = await page.evaluate(`say("Dev Patel", "Engineering can commit to the 14th.")`);
    await wait(600);

    // 3. The start of a long block scrolls away; the collector must keep it.
    await page.evaluate(
      `update("${b}", "commit to the 14th. If we cut the export feature we are fine.")`,
    );
    await wait(600);

    // 4. Old blocks leave the DOM; captured text must survive.
    await page.evaluate(`drop("${a}")`);
    await wait(600);

    const state = await readCollector(page);
    assert.ok(state, "collector state should be readable");
    assert.equal(state.regionFound, true);

    const segs = state.segments.map((s) => ({ speaker: s.speaker, text: s.text }));
    assert.deepEqual(segs, [
      { speaker: "Maya Ortiz", text: "Let's lock the launch date before we talk scope." },
      {
        speaker: "Dev Patel",
        text: "Engineering can commit to the 14th. If we cut the export feature we are fine.",
      },
    ]);
    for (const s of state.segments) assert.ok(s.end >= s.start, "end should not precede start");

    console.log("✓ caption collector: 2 segments captured correctly");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
