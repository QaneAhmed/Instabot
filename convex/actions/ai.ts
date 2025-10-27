"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";

export const runAiPipeline = action({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    // TODO: Fetch transcript, call OpenAI, persist AI summary/intent data.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});
