/**
 * Checks the summarizer's request and output handling with a stubbed OpenAI
 * client, so it runs without an API key or network access.
 */
import assert from "node:assert/strict";
import {
  summarizeTranscript,
  summaryToMarkdown,
  type ResponsesClient,
  type Summary,
} from "../src/summarize";
import type { Transcript } from "../src/transcript";

const joined = Date.parse("2026-09-26T09:30:00Z");

const transcript: Transcript = {
  meetingCode: "abc-defg-hij",
  url: "https://meet.google.com/abc-defg-hij",
  botName: "Notewell Notetaker",
  joinedAt: new Date(joined).toISOString(),
  endedAt: new Date(joined + 600_000).toISOString(),
  endReason: "call ended",
  segments: [
    { speaker: "Maya Ortiz", text: "Let's ship on the 14th.", start: joined + 5_000, end: joined + 8_000 },
    { speaker: "Maya Ortiz", text: "Dev, can you update the plan?", start: joined + 9_000, end: joined + 11_000 },
    { speaker: "Dev Patel", text: "Yes, I'll do it by Friday.", start: joined + 125_000, end: joined + 128_000 },
  ],
};

const fakeSummary: Summary = {
  title: "Launch date sync",
  overview: "The team set the launch for the 14th.",
  keyPoints: ["Launch date discussed"],
  decisions: ["Ship on the 14th"],
  actionItems: [{ task: "Update the launch plan", owner: "Dev Patel", due: "Friday" }],
  openQuestions: [],
};

function stubClient(reply: { status?: string; output_text: string; incomplete_details?: { reason: string } }) {
  const calls: Record<string, unknown>[] = [];
  const client = {
    responses: {
      create: async (body: Record<string, unknown>) => {
        calls.push(body);
        return reply;
      },
    },
  } as unknown as ResponsesClient;
  return { client, calls };
}

async function main() {
  // 1. Happy path: request shape and parsed result.
  const { client, calls } = stubClient({ status: "completed", output_text: JSON.stringify(fakeSummary) });
  const summary = await summarizeTranscript(transcript, { client, model: "test-model" });
  assert.deepEqual(summary, fakeSummary);

  const body = calls[0] as {
    model: string;
    input: string;
    text: { format: { type: string; strict: boolean; schema: { required: string[] } } };
  };
  assert.equal(body.model, "test-model");
  assert.equal(body.text.format.type, "json_schema");
  assert.equal(body.text.format.strict, true);
  assert.deepEqual(body.text.format.schema.required, [
    "title",
    "overview",
    "keyPoints",
    "decisions",
    "actionItems",
    "openQuestions",
  ]);
  // Same-speaker segments are merged, with minute offsets from when the bot joined.
  assert.match(body.input, /\[0m\] Maya Ortiz: Let's ship on the 14th\. Dev, can you update the plan\?/);
  assert.match(body.input, /\[2m\] Dev Patel: Yes, I'll do it by Friday\./);

  // 2. Markdown rendering.
  const md = summaryToMarkdown(summary, transcript);
  assert.match(md, /^# Launch date sync/);
  assert.match(md, /- \[ \] Update the launch plan \(Dev Patel, due Friday\)/);
  assert.match(md, /## Open questions\n\n- None/);

  // 3. Failure cases.
  await assert.rejects(
    summarizeTranscript({ ...transcript, segments: [] }, { client }),
    /empty/,
  );
  const cut = stubClient({ status: "incomplete", output_text: "", incomplete_details: { reason: "max_output_tokens" } });
  await assert.rejects(summarizeTranscript(transcript, { client: cut.client }), /max_output_tokens/);

  console.log("✓ summarizer: request, parsing, markdown, and error cases");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
