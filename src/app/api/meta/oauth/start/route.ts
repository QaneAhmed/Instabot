import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { buildOAuthUrl } from "@/lib/meta";

const STATE_COOKIE = "meta_oauth_state";

export async function GET() {
  const redirectUri = process.env.META_OAUTH_REDIRECT_URI;
  if (!redirectUri) {
    return NextResponse.json(
      { error: "META_OAUTH_REDIRECT_URI is not configured." },
      { status: 500 },
    );
  }

  const state = randomBytes(16).toString("hex");
  (await cookies()).set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60,
    path: "/",
  });

  const oauthUrl = buildOAuthUrl({ redirectUri, state });
  return NextResponse.redirect(oauthUrl, { status: 302 });
}
