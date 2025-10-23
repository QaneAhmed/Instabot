import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const STATE_COOKIE = "meta_oauth_state";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const code = search.get("code");
  const state = search.get("state");
  const error = search.get("error");

  if (error) {
    return NextResponse.redirect(`/connect?error=${encodeURIComponent(error)}`);
  }

  if (!code || !state) {
    return NextResponse.redirect("/connect?error=missing_code");
  }

  const cookieStore = await cookies();
  const storedState = cookieStore.get(STATE_COOKIE)?.value;
  cookieStore.delete(STATE_COOKIE);

  if (!storedState || storedState !== state) {
    return NextResponse.redirect("/connect?error=invalid_state");
  }

  // TODO: Call Convex action to exchange the code, fetch the page + IG BA, and persist credentials.
  // await action(api.actions.integrations_meta.exchangeToken, { code, redirectUri: ... });

  return NextResponse.redirect("/inbox");
}
