import { query } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

type WorkspaceStatus =
  | { status: "signed_out" }
  | { status: "missing_workspace" }
  | {
      status: "ok";
      workspaceId: Id<"workspaces">;
      workspaceName: string;
      instagramIntegration: {
        hasIntegration: true;
        igBusinessId: string;
        subscribed: boolean;
      } | { hasIntegration: false };
    };

export const getWorkspace = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return { status: "signed_out" } satisfies WorkspaceStatus;
    }

    const workspace = await ctx.db
      .query("workspaces")
      .withIndex("by_owner", (q) => q.eq("ownerClerkUserId", identity.subject))
      .unique();

    if (!workspace) {
      return { status: "missing_workspace" } satisfies WorkspaceStatus;
    }

    const integration = await ctx.db
      .query("integrations_instagram")
      .withIndex("by_workspace", (q) => q.eq("workspaceId", workspace._id))
      .unique();

    if (!integration) {
      return {
        status: "ok",
        workspaceId: workspace._id,
        workspaceName: workspace.name,
        instagramIntegration: { hasIntegration: false },
      } satisfies WorkspaceStatus;
    }

    return {
      status: "ok",
      workspaceId: workspace._id,
      workspaceName: workspace.name,
      instagramIntegration: {
        hasIntegration: true,
        igBusinessId: integration.igBusinessId,
        subscribed: integration.subscribed,
      },
    } satisfies WorkspaceStatus;
  },
});
