"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";

export const exchangeToken = action({
  args: {
    code: v.string(),
    redirectUri: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Exchange OAuth code for a user access token and return page data.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});

export const storePage = action({
  args: {
    pageId: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Fetch Instagram business id, encrypt long-lived token, and persist integration row.
    void ctx;
    void args;
    throw new Error("Not implemented");
  },
});

export const refreshLongLivedToken = action({
  args: {},
  handler: async (ctx) => {
    // TODO: Refresh long-lived page tokens when near expiry.
    void ctx;
  },
});
