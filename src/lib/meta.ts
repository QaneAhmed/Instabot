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
    console.warn(
      "[meta] Missing app secret or signature header during webhook verification",
      { hasAppSecret: Boolean(appSecret), hasSignature: Boolean(signature) },
    );
    return false;
  }

  const payloadBuffer = Buffer.from(await req.clone().arrayBuffer());
  const digest = crypto
    .createHmac("sha256", appSecret)
    .update(payloadBuffer)
    .digest("hex");

  const expected = `sha256=${digest}`;
  const isValid = expected === signature;

  if (!isValid) {
    console.warn("[meta] Invalid webhook signature", {
      expectedPrefix: expected.slice(0, 12),
      receivedPrefix: signature.slice(0, 12),
      payloadBytes: payloadBuffer.byteLength,
    });
  }

  return isValid;
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
