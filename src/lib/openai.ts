import OpenAI from "openai";

let client: OpenAI | null = null;

export const getOpenAIClient = () => {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }
    client = new OpenAI({ apiKey });
  }

  return client;
};
