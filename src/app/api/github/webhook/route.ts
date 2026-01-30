import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/github";
import type { GitHubWebhookPayload } from "@/lib/github";

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-hub-signature-256");
    const event = request.headers.get("x-github-event");
    const deliveryId = request.headers.get("x-github-delivery");

    // Get raw body for signature verification
    const rawBody = await request.text();

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        console.error("[GitHub Webhook] Invalid signature");
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    }

    const payload: GitHubWebhookPayload = JSON.parse(rawBody);

    console.log(`[GitHub Webhook] Received ${event} event (${deliveryId})`);

    // Handle different event types
    switch (event) {
      case "push":
        await handlePushEvent(payload);
        break;
      case "ping":
        console.log("[GitHub Webhook] Ping received");
        break;
      default:
        console.log(`[GitHub Webhook] Unhandled event type: ${event}`);
    }

    return NextResponse.json({ received: true, event, deliveryId });
  } catch (error) {
    console.error("[GitHub Webhook] Error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

async function handlePushEvent(payload: GitHubWebhookPayload) {
  const { repository, sender, commits, head_commit } = payload;

  if (!commits || commits.length === 0) {
    console.log("[GitHub Webhook] Push event with no commits");
    return;
  }

  console.log(`[GitHub Webhook] Push to ${repository.full_name} by ${sender.login}`);
  console.log(`[GitHub Webhook] ${commits.length} commit(s) received`);

  // Process each commit
  for (const commit of commits) {
    console.log(`[GitHub Webhook] Commit: ${commit.id.slice(0, 7)} - ${commit.message.split("\n")[0]}`);

    // TODO: Store commit in database
    // TODO: Update user's ship score
    // TODO: Trigger coach notification

    // Example: Update ship score calculation
    // await updateUserShipScore(sender.login, {
    //   type: "commit",
    //   repoName: repository.name,
    //   commitMessage: commit.message,
    //   additions: commit.added.length,
    //   deletions: commit.removed.length,
    //   modifications: commit.modified.length,
    // });
  }

  console.log(`[GitHub Webhook] Processed push event for ${repository.full_name}`);
}
