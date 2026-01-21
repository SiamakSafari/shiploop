import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Path to store waitlist emails (in project root, gitignored)
const WAITLIST_FILE = path.join(process.cwd(), "waitlist.json");

interface WaitlistEntry {
  email: string;
  joinedAt: string;
  source: string;
}

async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // File doesn't exist yet, return empty array
    return [];
  }
}

async function saveWaitlist(entries: WaitlistEntry[]): Promise<void> {
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(entries, null, 2));
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

    // Get existing waitlist
    const waitlist = await getWaitlist();

    // Check for duplicate
    const exists = waitlist.some((entry) => entry.email === normalizedEmail);
    if (exists) {
      return NextResponse.json(
        { message: "You're already on the waitlist!", alreadyExists: true },
        { status: 200 }
      );
    }

    // Add new entry
    const newEntry: WaitlistEntry = {
      email: normalizedEmail,
      joinedAt: new Date().toISOString(),
      source,
    };

    waitlist.push(newEntry);
    await saveWaitlist(waitlist);

    // Log for visibility (in production, you'd send to analytics/email service)
    console.log(`[Waitlist] New signup: ${normalizedEmail} (Total: ${waitlist.length})`);

    return NextResponse.json(
      {
        message: "Welcome to the waitlist!",
        position: waitlist.length,
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

// GET endpoint to check waitlist count (useful for admin)
export async function GET() {
  try {
    const waitlist = await getWaitlist();
    return NextResponse.json({
      count: waitlist.length,
    });
  } catch (error) {
    console.error("[Waitlist] Error fetching count:", error);
    return NextResponse.json(
      { error: "Failed to fetch waitlist count" },
      { status: 500 }
    );
  }
}
