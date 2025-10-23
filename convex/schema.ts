import { defineSchema, defineTable, v } from "./_generated/server";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }).index("by_clerk", ["clerkUserId"]),

  workspaces: defineTable({
    ownerClerkUserId: v.string(),
    name: v.string(),
    createdAt: v.number(),
  }).index("by_owner", ["ownerClerkUserId"]),

  integrations_instagram: defineTable({
    workspaceId: v.id("workspaces"),
    metaUserId: v.string(),
    pageId: v.string(),
    pageAccessToken: v.string(),
    igBusinessId: v.string(),
    tokenExpiresAt: v.number(),
    subscribed: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_workspace", ["workspaceId"]),

  contacts: defineTable({
    workspaceId: v.id("workspaces"),
    igUserId: v.string(),
    handle: v.optional(v.string()),
    displayName: v.optional(v.string()),
    notes: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    lastMessageAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_ws_ig", ["workspaceId", "igUserId"])
    .index("by_ws_last", ["workspaceId", "lastMessageAt"]),

  conversations: defineTable({
    workspaceId: v.id("workspaces"),
    contactId: v.id("contacts"),
    igThreadId: v.string(),
    lastMessageAt: v.number(),
    aiSummary: v.optional(v.string()),
    aiIntent: v.optional(v.string()),
    aiConfidence: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_ws_thread", ["workspaceId", "igThreadId"])
    .index("by_ws_last", ["workspaceId", "lastMessageAt"]),

  messages: defineTable({
    workspaceId: v.id("workspaces"),
    conversationId: v.id("conversations"),
    igMessageId: v.string(),
    direction: v.string(),
    senderIgUserId: v.string(),
    text: v.optional(v.string()),
    attachments: v.optional(
      v.array(
        v.object({
          type: v.string(),
          id: v.optional(v.string()),
          url: v.optional(v.string()),
        }),
      ),
    ),
    timestamp: v.number(),
    createdAt: v.number(),
  })
    .index("by_ws_msg", ["workspaceId", "igMessageId"])
    .index("by_ws_conv_time", ["workspaceId", "conversationId"]),

  followups: defineTable({
    workspaceId: v.id("workspaces"),
    contactId: v.id("contacts"),
    conversationId: v.id("conversations"),
    dueAt: v.number(),
    status: v.string(),
    createdAt: v.number(),
    note: v.optional(v.string()),
  }).index("by_ws_due", ["workspaceId", "dueAt"]),

  audit_logs: defineTable({
    workspaceId: v.id("workspaces"),
    actorClerkUserId: v.string(),
    action: v.string(),
    targetType: v.string(),
    targetId: v.string(),
    payload: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_ws_time", ["workspaceId", "createdAt"]),
});
