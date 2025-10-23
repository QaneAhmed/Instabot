import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    contactId: v.id("contacts"),
    conversationId: v.id("conversations"),
    dueAt: v.number(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Create a pending follow-up reminder for the workspace.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});

export const markDone = mutation({
  args: { id: v.id("followups") },
  handler: async (ctx, args) => {
    // TODO: Mark the follow-up as completed.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});

export const dismiss = mutation({
  args: { id: v.id("followups") },
  handler: async (ctx, args) => {
    // TODO: Dismiss the follow-up without completing it.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});
