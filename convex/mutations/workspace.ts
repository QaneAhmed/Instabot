import { mutation } from "../_generated/server";

export const ensure = mutation({
  args: {},
  handler: async (ctx) => {
    // TODO: Upsert user and workspace records for the authenticated Clerk user.
    void ctx;
    throw new Error("Not implemented");
  },
});
