import { NextRequest, NextResponse } from "next/server";
import { getConnectOAuthUrl, exchangeCodeForToken } from "@/lib/stripe";

// GET - Get OAuth URL for Stripe Connect
export async function GET() {
  try {
    const clientId = process.env.STRIPE_CLIENT_ID;
    if (!clientId) {
      return NextResponse.json(
        { error: "Stripe Connect not configured" },
        { status: 500 }
      );
    }

    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/stripe/connect/callback`;
    const authUrl = getConnectOAuthUrl(clientId, redirectUri);

    return NextResponse.json({ url: authUrl });
  } catch (error) {
    console.error("[Stripe Connect] Error generating OAuth URL:", error);
    return NextResponse.json(
      { error: "Failed to generate connect URL" },
      { status: 500 }
    );
  }
}

// POST - Exchange authorization code for access token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Authorization code required" },
        { status: 400 }
      );
    }

    const { access_token, stripe_user_id } = await exchangeCodeForToken(code);

    // TODO: Store the access_token and stripe_user_id in your database
    // associated with the current user

    console.log(`[Stripe Connect] Connected account: ${stripe_user_id}`);

    return NextResponse.json({
      success: true,
      accountId: stripe_user_id,
    });
  } catch (error) {
    console.error("[Stripe Connect] Error exchanging code:", error);
    return NextResponse.json(
      { error: "Failed to connect Stripe account" },
      { status: 500 }
    );
  }
}
