import { action } from "convex/server";
import { v } from "convex/values";

export const sendInstagramMessage = action({
  args: {
    conversationId: v.id("conversations"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Rate limit, decrypt token, send outbound message via Instagram Graph API.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});
