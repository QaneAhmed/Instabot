import { query } from "../_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Return paginated contacts sorted by last message timestamp.
    void ctx;
    void args;
    return { contacts: [], cursor: null as string | null };
  },
});
