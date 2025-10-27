import { mutation } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

type EnsureResult =
  | { status: "signed_out" }
  | { status: "ok"; userId: Id<"users">; workspaceId: Id<"workspaces"> };

export const ensure = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return { status: "signed_out" } as EnsureResult;
    }

    const clerkUserId = identity.subject;
    const now = Date.now();

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk", (q) => q.eq("clerkUserId", clerkUserId))
      .unique();

    let userId: Id<"users">;
    if (!existingUser) {
      userId = await ctx.db.insert("users", {
        clerkUserId,
        email: identity.email ?? "",
        createdAt: now,
      });
    } else {
      userId = existingUser._id;
      const nextEmail = identity.email ?? "";
      if (nextEmail && nextEmail !== existingUser.email) {
        await ctx.db.patch(existingUser._id, { email: nextEmail });
      }
    }

    const existingWorkspace = await ctx.db
      .query("workspaces")
      .withIndex("by_owner", (q) => q.eq("ownerClerkUserId", clerkUserId))
      .unique();

    let workspaceId: Id<"workspaces">;
    if (!existingWorkspace) {
      workspaceId = await ctx.db.insert("workspaces", {
        ownerClerkUserId: clerkUserId,
        name: identity.name ?? identity.email ?? "My Workspace",
        createdAt: now,
      });
    } else {
      workspaceId = existingWorkspace._id;
    }

    return { status: "ok", userId, workspaceId } satisfies EnsureResult;
  },
});
