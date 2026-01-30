import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Fetch all waitlist entries
    const { data: entries, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Admin Waitlist] Error fetching entries:", error);
      return NextResponse.json(
        { error: "Failed to fetch waitlist" },
        { status: 500 }
      );
    }

    // Calculate stats
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    const typedEntries = entries as Array<Record<string, unknown>> | null;

    const stats = {
      total: typedEntries?.length || 0,
      today: typedEntries?.filter((e) => new Date(e.created_at as string) >= todayStart).length || 0,
      thisWeek: typedEntries?.filter((e) => new Date(e.created_at as string) >= weekStart).length || 0,
      invited: typedEntries?.filter((e) => e.invited_at != null).length || 0,
    };

    return NextResponse.json({
      entries: entries || [],
      stats,
    });
  } catch (error) {
    console.error("[Admin Waitlist] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist" },
      { status: 500 }
    );
  }
}

// Mark user as invited
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("waitlist")
      .update({ invited_at: new Date().toISOString() } as Record<string, unknown>)
      .eq("email", email);

    if (error) {
      console.error("[Admin Waitlist] Error updating invite status:", error);
      return NextResponse.json(
        { error: "Failed to update invite status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Admin Waitlist] Error:", error);
    return NextResponse.json(
      { error: "Failed to update invite status" },
      { status: 500 }
    );
  }
}
