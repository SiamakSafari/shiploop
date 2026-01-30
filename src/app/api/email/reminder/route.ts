import { NextRequest, NextResponse } from "next/server";
import { getResend, EMAIL_FROM, StreakReminderEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, currentStreak = 0, bestStreak = 0 } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Skip sending in development if no API key
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Email] Would send streak reminder to ${email}`);
      return NextResponse.json({
        message: "Email skipped (no API key configured)",
        mock: true,
      });
    }

    const subject = currentStreak > 0
      ? `Your ${currentStreak}-day streak is about to expire!`
      : "Start a new shipping streak today!";

    const resend = getResend();
    if (!resend) {
      return NextResponse.json({ message: "Email skipped (no API key configured)", mock: true });
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject,
      react: StreakReminderEmail({
        username: username || "Maker",
        currentStreak,
        bestStreak,
      }),
    });

    if (error) {
      console.error("[Email] Failed to send streak reminder:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log(`[Email] Streak reminder sent to ${email} (ID: ${data?.id})`);

    return NextResponse.json({
      message: "Email sent successfully",
      id: data?.id,
    });
  } catch (error) {
    console.error("[Email] Error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
