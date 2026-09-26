// Runs inside the Google Meet tab (injected by the bot).
// Watches Meet's live captions and keeps a running list of caption segments
// on window.__notewell, which the bot reads every few seconds.
//
// Meet's markup is obfuscated and changes often, so this avoids class names:
// it finds the captions region by its accessible label, then treats every
// avatar image inside it as the start of a caption block
// ("speaker name" on the first line, what they said on the following lines).
(() => {
  if (window.__notewell) return;

  const state = { segments: [], regionFound: false, lastActivity: Date.now() };
  window.__notewell = state;

  const segmentFor = new WeakMap(); // caption block element -> segment

  const findRegion = () =>
    document.querySelector('[role="region"][aria-label="Captions"]') ||
    document.querySelector('[role="region"][aria-label*="aption" i]');

  const linesOf = (el) =>
    el.innerText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  // Walk up from an avatar until we reach an element holding name + text.
  const blockFor = (img, region) => {
    let el = img.parentElement;
    while (el && el !== region) {
      if (linesOf(el).length >= 2) return el;
      el = el.parentElement;
    }
    return null;
  };

  // Meet revises captions as it hears more, and drops the start of long
  // blocks as they scroll. Keep the full text across both cases.
  const MIN_OVERLAP = 8;
  const merge = (prev, next) => {
    // Grew or was revised in place.
    if (next.startsWith(prev.slice(0, 20))) return next;

    // Start scrolled away, and the rest is still somewhere in what we have.
    const probe = next.slice(0, 30);
    const at = prev.indexOf(probe);
    if (probe.length >= MIN_OVERLAP && at > 0) return prev.slice(0, at) + next;

    // Start scrolled away while new words were added: join on the overlap
    // between the end of what we have and the start of the new text.
    for (let k = Math.min(prev.length, next.length); k >= MIN_OVERLAP; k--) {
      if (prev.endsWith(next.slice(0, k))) return prev + next.slice(k);
    }
    return next;
  };

  const tick = () => {
    const region = findRegion();
    state.regionFound = Boolean(region);
    if (!region) return;

    const blocks = new Set();
    region.querySelectorAll("img").forEach((img) => {
      const block = blockFor(img, region);
      if (block) blocks.add(block);
    });

    const now = Date.now();
    for (const block of blocks) {
      const lines = linesOf(block);
      const speaker = lines[0];
      const text = lines.slice(1).join(" ");
      if (!text) continue;

      const seg = segmentFor.get(block);
      if (!seg) {
        const created = { speaker, text, start: now, end: now };
        segmentFor.set(block, created);
        state.segments.push(created);
        state.lastActivity = now;
      } else if (seg.text !== text) {
        seg.text = merge(seg.text, text);
        seg.speaker = speaker;
        seg.end = now;
        state.lastActivity = now;
      }
    }
  };

  setInterval(tick, 400);
})();
