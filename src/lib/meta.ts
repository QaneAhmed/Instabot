import crypto from "node:crypto";
import { NextRequest } from "next/server";

const META_BASE_URL = "https://graph.facebook.com/v20.0";

export const buildOAuthUrl = ({
  redirectUri,
  state,
}: {
  redirectUri: string;
  state: string;
}) => {
  const clientId = process.env.META_APP_ID;
  if (!clientId) {
    throw new Error("META_APP_ID must be configured.");
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: [
      "pages_show_list",
      "pages_manage_metadata",
      "pages_messaging",
      "instagram_basic",
      "instagram_manage_messages",
      "instagram_manage_insights",
    ].join(","),
    state,
    response_type: "code",
  });

  return `https://www.facebook.com/v20.0/dialog/oauth?${params.toString()}`;
};

export const verifyMetaSignature = async (req: NextRequest) => {
  const appSecret = process.env.META_APP_SECRET;
  const signature = req.headers.get("x-hub-signature-256");

  if (!appSecret || !signature) {
    return false;
  }

  const digest = crypto
    .createHmac("sha256", appSecret)
    .update(await req.clone().arrayBuffer())
    .digest("hex");

  return `sha256=${digest}` === signature;
};

export const metaFetch = async (
  path: string,
  init: RequestInit & { accessToken: string },
) => {
  const response = await fetch(`${META_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${init.accessToken}`,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Meta API error (${response.status}): ${message}`);
  }

  return response.json();
};
