/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_ai from "../actions/ai.js";
import type * as actions_integrations_meta from "../actions/integrations_meta.js";
import type * as actions_messaging from "../actions/messaging.js";
import type * as actions_webhooks from "../actions/webhooks.js";
import type * as cron from "../cron.js";
import type * as lib_crypto from "../lib/crypto.js";
import type * as lib_rateLimit from "../lib/rateLimit.js";
import type * as mutations_contacts from "../mutations/contacts.js";
import type * as mutations_followups from "../mutations/followups.js";
import type * as mutations_workspace from "../mutations/workspace.js";
import type * as queries_contacts from "../queries/contacts.js";
import type * as queries_conversations from "../queries/conversations.js";
import type * as queries_followups from "../queries/followups.js";
import type * as queries_me from "../queries/me.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "actions/ai": typeof actions_ai;
  "actions/integrations_meta": typeof actions_integrations_meta;
  "actions/messaging": typeof actions_messaging;
  "actions/webhooks": typeof actions_webhooks;
  cron: typeof cron;
  "lib/crypto": typeof lib_crypto;
  "lib/rateLimit": typeof lib_rateLimit;
  "mutations/contacts": typeof mutations_contacts;
  "mutations/followups": typeof mutations_followups;
  "mutations/workspace": typeof mutations_workspace;
  "queries/contacts": typeof queries_contacts;
  "queries/conversations": typeof queries_conversations;
  "queries/followups": typeof queries_followups;
  "queries/me": typeof queries_me;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
