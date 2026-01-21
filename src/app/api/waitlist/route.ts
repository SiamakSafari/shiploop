import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source = "landing-page" } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check for duplicate
    const { data: existingEntry } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", normalizedEmail)
      .single();

    if (existingEntry) {
      return NextResponse.json(
        { message: "You're already on the waitlist!", alreadyExists: true },
        { status: 200 }
      );
    }

    // Add new entry
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({
        email: normalizedEmail,
        source,
      });

    if (insertError) {
      console.error("[Waitlist] Insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Get total count for position
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // Log for visibility
    console.log(`[Waitlist] New signup: ${normalizedEmail} (Total: ${count})`);

    return NextResponse.json(
      {
        message: "Welcome to the waitlist!",
        position: count || 1,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET endpoint to check waitlist count
export async function GET() {
  try {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("[Waitlist] Error fetching count:", error);
      return NextResponse.json(
        { error: "Failed to fetch waitlist count" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      count: count || 0,
    });
  } catch (error) {
    console.error("[Waitlist] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist count" },
      { status: 500 }
    );
  }
}
