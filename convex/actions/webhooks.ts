"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";

export const ingestMessage = action({
  args: {
    workspaceId: v.id("workspaces"),
    payload: v.any(),
  },
  handler: async (ctx, args) => {
    // TODO: Map webhook payload to contacts, conversations, and messages.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});
