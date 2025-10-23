import { query } from "convex/server";

export const getWorkspace = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Resolve the current user's workspace metadata.
    void ctx;
    return null;
  },
});
