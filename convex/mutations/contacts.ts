import { mutation } from "convex/server";
import { v } from "convex/values";

export const upsertNote = mutation({
  args: {
    contactId: v.id("contacts"),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Update contact notes scoped to the current workspace.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});
