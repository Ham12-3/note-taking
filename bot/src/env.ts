import { existsSync } from "node:fs";
import { join } from "node:path";
import OpenAI from "openai";
import { DEFAULT_MODEL } from "./summarize";

const envFile = join(import.meta.dirname, "..", ".env");
if (existsSync(envFile)) process.loadEnvFile(envFile);

/** OpenAI settings from bot/.env, or null when no API key is configured. */
export function openAiConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return {
    client: new OpenAI({ apiKey }),
    model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
  };
}
