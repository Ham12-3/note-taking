/**
 * Google Meet page automation: join as a guest, turn on captions, announce
 * the bot in chat, and detect when the call is over.
 *
 * Meet's UI changes often. Everything here targets accessible names
 * (button labels, aria-labels) with the UI forced to English via ?hl=en,
 * which is much more stable than class names. If Meet changes a label,
 * this is the file to update.
 */
import type { Locator, Page } from "playwright";

const LABELS = {
  nameInput: /your name/i,
  joinButton: /^(ask to join|join now|join anyway)$/i,
  noMediaButton: /continue without (microphone and camera|mic)/i,
  leaveButton: /leave call/i,
  captionsOn: /turn on captions/i,
  captionsOff: /turn off captions/i,
  chatButton: /chat with everyone/i,
  chatInput: /send a message/i,
  dismiss: /^(got it|dismiss|close)$/i,
};

const CANT_JOIN =
  /you can.t join this video call|check your meeting code|invalid video call name|meeting hasn.t started|not allowed to join/i;
const DENIED = /denied your request|no one responded to your request|you can.t join this call/i;
const ENDED =
  /you left the meeting|you.ve been removed|you have been removed|the call (has )?ended|meeting (has )?ended|host ended the meeting|return to home screen/i;

export class MeetError extends Error {}

type Log = (msg: string) => void;

const visible = (l: Locator) => l.first().isVisible().catch(() => false);

async function clickIfVisible(l: Locator) {
  if (await visible(l)) {
    await l.first().click().catch(() => {});
    return true;
  }
  return false;
}

async function pageSays(page: Page, pattern: RegExp) {
  return visible(page.getByText(pattern));
}

/** Force the English UI so accessible names match LABELS. */
export function withEnglishUi(url: string) {
  const u = new URL(url);
  u.searchParams.set("hl", "en");
  return u.toString();
}

export function meetingCode(url: string) {
  return new URL(url).pathname.replace(/^\//, "").split("/")[0] || "meeting";
}

/**
 * Opens the meeting, enters the bot's name, and asks to join.
 * Resolves once the host has admitted the bot.
 */
export async function joinMeeting(
  page: Page,
  opts: { url: string; name: string; admitTimeoutMs: number; log: Log },
) {
  const { url, name, admitTimeoutMs, log } = opts;
  await page.goto(withEnglishUi(url), { waitUntil: "domcontentloaded" });

  // 1. Pre-join screen: fill the name and click "Ask to join".
  const nameBox = page.getByRole("textbox", { name: LABELS.nameInput });
  const joinBtn = page.getByRole("button", { name: LABELS.joinButton });
  const noMedia = page.getByRole("button", { name: LABELS.noMediaButton });

  const preJoinDeadline = Date.now() + 60_000;
  let asked = false;
  while (!asked) {
    if (Date.now() > preJoinDeadline) {
      throw new MeetError("Timed out on the pre-join screen. Is the link correct?");
    }
    if (await pageSays(page, CANT_JOIN)) {
      throw new MeetError(
        "Meet refused the join. The link may be wrong, or the meeting may not allow guests.",
      );
    }
    await clickIfVisible(noMedia);

    if (await visible(nameBox)) {
      const current = await nameBox.first().inputValue().catch(() => "");
      if (current !== name) await nameBox.first().fill(name);
    }
    if (await visible(joinBtn)) {
      if (await joinBtn.first().isEnabled().catch(() => false)) {
        await joinBtn.first().click();
        asked = true;
        break;
      }
    }
    await page.waitForTimeout(1000);
  }
  log("Asked to join. Admit the bot from the meeting.");

  // 2. Wait for the host to admit us.
  const leaveBtn = page.getByRole("button", { name: LABELS.leaveButton });
  const admitDeadline = Date.now() + admitTimeoutMs;
  while (!(await visible(leaveBtn))) {
    if (Date.now() > admitDeadline) throw new MeetError("Nobody admitted the bot in time.");
    if (await pageSays(page, DENIED)) throw new MeetError("The request to join was denied.");
    await clickIfVisible(noMedia);
    await page.waitForTimeout(1000);
  }
  // Admission can still be pending when the button first renders; let the call settle.
  await page.waitForTimeout(2000);
  await dismissPopups(page);
}

/** Closes "Got it"-style tips that can cover the controls. */
export async function dismissPopups(page: Page) {
  await clickIfVisible(page.getByRole("button", { name: LABELS.dismiss }));
}

/** Turns on live captions. Returns false if the captions panel never showed up. */
export async function enableCaptions(page: Page) {
  const on = page.getByRole("button", { name: LABELS.captionsOn });
  const off = page.getByRole("button", { name: LABELS.captionsOff });
  const region = page.locator('[role="region"][aria-label*="aption" i]');

  for (let attempt = 0; attempt < 4; attempt++) {
    if ((await visible(off)) || (await visible(region))) return true;
    if (!(await clickIfVisible(on)) && attempt === 1) {
      // Button hidden (e.g. narrow window): fall back to Meet's "c" shortcut, once.
      await page.keyboard.press("c");
    }
    await page.waitForTimeout(1500);
  }
  return (await visible(off)) || (await visible(region));
}

/** Posts a message in the meeting chat so everyone knows notes are being taken. */
export async function announce(page: Page, message: string) {
  try {
    await clickIfVisible(page.getByRole("button", { name: LABELS.chatButton }));
    const input = page.getByRole("textbox", { name: LABELS.chatInput }).first();
    await input.waitFor({ state: "visible", timeout: 5000 });
    await input.fill(message);
    await input.press("Enter");
    await page.waitForTimeout(500);
    // Close the chat panel again so the captions have room.
    await clickIfVisible(page.getByRole("button", { name: LABELS.chatButton }));
    return true;
  } catch {
    return false;
  }
}

/** True once the bot is no longer in the call (left, removed, or meeting ended). */
export async function callHasEnded(page: Page) {
  if (page.isClosed()) return true;
  if (await pageSays(page, ENDED)) return true;
  return !(await visible(page.getByRole("button", { name: LABELS.leaveButton })));
}

export async function leaveCall(page: Page) {
  if (page.isClosed()) return;
  await clickIfVisible(page.getByRole("button", { name: LABELS.leaveButton }));
}
