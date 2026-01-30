import { NextResponse } from "next/server";
import { createStripeClient, getRevenueData } from "@/lib/stripe";

export async function GET() {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      // Return mock data in development
      return NextResponse.json({
        connected: false,
        data: null,
        message: "Stripe not configured. Set STRIPE_SECRET_KEY to enable.",
      });
    }

    const stripe = createStripeClient();
    const revenueData = await getRevenueData(stripe);

    return NextResponse.json({
      connected: true,
      data: revenueData,
    });
  } catch (error) {
    console.error("[Stripe Revenue] Error:", error);

    if (error instanceof Error && error.message.includes("Invalid API Key")) {
      return NextResponse.json(
        { error: "Invalid Stripe API key", connected: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch revenue data", connected: false },
      { status: 500 }
    );
  }
}
