# Local Meet bot (testing)

A free, local stand-in for a paid meeting-bot API. It opens Chrome, joins a Google Meet
as a guest, turns on Meet's live captions, and saves a speaker-labelled transcript.
The bot itself is free; the optional summary uses the OpenAI API.

## Run it

```bash
cd bot && npm install      # first time only (uses your installed Chrome)
npm run join -- https://meet.google.com/abc-defg-hij
```

Or from the repo root: `npm run bot -- <meet-url>`.

1. A Chrome window opens and asks to join as "Notewell Notetaker".
2. Admit it from your meeting.
3. It turns on captions, posts a short "taking notes" message in chat, and records.
4. It leaves when the call ends, after `--max-minutes`, or when you press Ctrl+C.

Output: `bot/output/<meeting-code>-<time>/transcript.md` and `transcript.json`,
updated every few seconds while the call runs.

Options: `--name`, `--headless`, `--max-minutes`, `--admit-minutes`, `--no-announce`, `--out`
(`npm run join -- --help`).

## AI summary (OpenAI)

Copy `.env.example` to `.env` and add your `OPENAI_API_KEY`. When a call ends, the bot
sends the transcript to the OpenAI Responses API and writes `summary.md` / `summary.json`
(overview, key points, decisions, action items with owners, open questions).
The model defaults to `gpt-5.4-mini`; override with `OPENAI_MODEL` in `.env`.

- Summarize an existing transcript: `npm run summarize -- output/<folder>`
- Skip it for a run: `--no-summary`
- Without a key the bot still works; it just skips the summary.

## How it works

- `src/meet.ts`: join flow, captions, chat notice, end-of-call detection. It targets
  button labels with the UI forced to English, so **if Meet changes a label, update `LABELS` here**.
- `src/collector.browser.js`: runs inside the Meet tab and reads the captions panel.
- `src/transcript.ts`: writes the JSON and Markdown files.
- `src/summarize.ts`: builds the OpenAI request (prompt + strict JSON schema) and renders `summary.md`.
- `npm test`: checks caption parsing against a fake captions panel and the summarizer against a stubbed OpenAI client (no meeting or API key needed).

## Limits (fine for testing, not for production)

- Joins as a guest, so someone must admit it, and meetings that block guests
  (some Google Workspace orgs) will refuse it.
- Transcript quality is whatever Meet's captions produce. Caption languages are limited,
  and there's no audio recording yet.
- It depends on Meet's UI, which can change without notice.
- One meeting per process, run on your machine.
