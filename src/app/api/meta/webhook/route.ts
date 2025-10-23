import { NextRequest, NextResponse } from "next/server";
import { verifyMetaSignature } from "@/lib/meta";

export async function GET(req: NextRequest) {
  const verifyToken = process.env.META_VERIFY_TOKEN;
  const token = req.nextUrl.searchParams.get("hub.verify_token");

  if (!verifyToken || token !== verifyToken) {
    return NextResponse.json({ error: "Invalid verify token" }, { status: 403 });
  }

  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  return new NextResponse(challenge ?? "", { status: 200 });
}

export async function POST(req: NextRequest) {
  const isValid = await verifyMetaSignature(req);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = await req.json();

  // TODO: Resolve workspaceId mapping and forward the payload to the Convex ingest action.
  // await action(api.actions.webhooks.ingestMessage, { workspaceId, payload });

  return NextResponse.json({ ok: true });
}
