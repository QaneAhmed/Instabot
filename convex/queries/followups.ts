import { query } from "convex/server";
import { v } from "convex/values";

export const listUpcoming = query({
  args: {
    limit: v.optional(v.number()),
    since: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Return upcoming follow-ups ordered by due date.
    void ctx;
    void args;
    return [];
  },
});

export const listOverdue = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Return overdue follow-ups ordered by due date.
    void ctx;
    void args;
    return [];
  },
});
