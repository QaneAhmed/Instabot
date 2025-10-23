import { query } from "../_generated/server";
import { v } from "convex/values";

export const byContact = query({
  args: { contactId: v.id("contacts") },
  handler: async (ctx, args) => {
    // TODO: Return the active conversation for the given contact.
    void ctx;
    void args;
    return null;
  },
});

export const detail = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    // TODO: Return conversation messages and AI annotations.
    void ctx;
    void args;
    return { messages: [], conversation: null };
  },
});
