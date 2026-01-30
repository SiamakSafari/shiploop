import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Cron endpoint for sending streak reminder emails
 *
 * This endpoint should be called daily (e.g., via Vercel Cron)
 * It finds users whose streaks are about to expire and sends reminders
 *
 * Vercel Cron configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/streak-reminder",
 *     "schedule": "0 20 * * *"
 *   }]
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized calls
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Find users with active streaks who haven't shipped today
    // This is a simplified version - in production, query users table
    // with streak data and last activity timestamps

    console.log("[Cron] Starting streak reminder job...");

    // TODO: Replace with actual database query
    // Example query:
    // const { data: users, error } = await supabase
    //   .from("users")
    //   .select("id, email, name, current_streak, best_streak, last_activity_date")
    //   .gt("current_streak", 0)
    //   .lt("last_activity_date", today.toISOString())
    //   .eq("streak_reminders_enabled", true);

    // For now, log the job execution
    const sentCount = 0;
    const errors: string[] = [];

    // TODO: Loop through users and send reminders
    // for (const user of users) {
    //   try {
    //     await fetch(`${siteUrl}/api/email/reminder`, {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         email: user.email,
    //         username: user.name || "Maker",
    //         currentStreak: user.current_streak,
    //         bestStreak: user.best_streak,
    //       }),
    //     });
    //     sentCount++;
    //   } catch (err) {
    //     errors.push(`Failed to send to ${user.email}`);
    //   }
    // }

    console.log(`[Cron] Streak reminder job complete. Sent: ${sentCount}, Errors: ${errors.length}`);

    return NextResponse.json({
      success: true,
      sent: sentCount,
      errors: errors.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Cron] Streak reminder error:", error);
    return NextResponse.json(
      { error: "Cron job failed" },
      { status: 500 }
    );
  }
}
