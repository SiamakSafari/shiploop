import { NextRequest, NextResponse } from "next/server";
import { getResend, EMAIL_FROM, WelcomeEmail } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, position = 1 } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Skip sending in development if no API key
    if (!process.env.RESEND_API_KEY) {
      console.log(`[Email] Would send welcome email to ${email} (position: ${position})`);
      return NextResponse.json({
        message: "Email skipped (no API key configured)",
        mock: true,
      });
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json({ message: "Email skipped (no API key configured)", mock: true });
    }

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Welcome to ShipLoop! You're on the waitlist",
      react: WelcomeEmail({ position }),
    });

    if (error) {
      console.error("[Email] Failed to send welcome email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log(`[Email] Welcome email sent to ${email} (ID: ${data?.id})`);

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
