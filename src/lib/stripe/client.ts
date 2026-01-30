import Stripe from "stripe";
import type { StripeCharge, StripeSubscription, StripeRevenueData } from "./types";

/**
 * Create a Stripe client instance
 */
export function createStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
    typescript: true,
  });
}

/**
 * Get revenue metrics for an account
 */
export async function getRevenueData(stripe: Stripe): Promise<StripeRevenueData> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get balance transactions for revenue calculation
  const [charges, subscriptions, customers] = await Promise.all([
    stripe.charges.list({
      limit: 100,
      created: { gte: Math.floor(thirtyDaysAgo.getTime() / 1000) },
    }),
    stripe.subscriptions.list({
      limit: 100,
      status: "all",
    }),
    stripe.customers.list({
      limit: 100,
    }),
  ]);

  // Calculate MRR from active subscriptions
  const activeSubscriptions = subscriptions.data.filter(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

  let currentMRR = 0;
  for (const sub of activeSubscriptions) {
    const item = sub.items.data[0];
    if (item?.price) {
      const amount = item.price.unit_amount || 0;
      const interval = item.price.recurring?.interval || "month";

      // Normalize to monthly
      switch (interval) {
        case "year":
          currentMRR += amount / 12;
          break;
        case "week":
          currentMRR += amount * 4;
          break;
        case "day":
          currentMRR += amount * 30;
          break;
        default:
          currentMRR += amount;
      }
    }
  }

  // Convert from cents
  currentMRR = currentMRR / 100;
  const currentARR = currentMRR * 12;

  // Calculate total revenue from successful charges
  const currentRevenue = charges.data
    .filter((c) => c.status === "succeeded")
    .reduce((sum, c) => sum + (c.amount || 0), 0) / 100;

  // Format recent charges
  const recentCharges: StripeCharge[] = charges.data.slice(0, 10).map((charge) => ({
    id: charge.id,
    amount: (charge.amount || 0) / 100,
    currency: charge.currency,
    status: charge.status as "succeeded" | "pending" | "failed",
    description: charge.description,
    customerEmail: typeof charge.customer === "string" ? null : (charge.customer as Stripe.Customer)?.email || null,
    createdAt: new Date(charge.created * 1000).toISOString(),
  }));

  // Format recent subscriptions
  const recentSubscriptions: StripeSubscription[] = subscriptions.data.slice(0, 10).map((sub) => {
    const item = sub.items.data[0];
    const subAny = sub as unknown as Record<string, unknown>;
    const periodEnd = subAny.current_period_end as number | undefined;
    return {
      id: sub.id,
      status: sub.status as "active" | "canceled" | "past_due" | "trialing" | "incomplete",
      customerEmail: typeof sub.customer === "string" ? null : (sub.customer as Stripe.Customer)?.email || null,
      planName: item?.price?.nickname || item?.price?.product?.toString() || null,
      amount: ((item?.price?.unit_amount || 0) / 100),
      currency: sub.currency,
      interval: (item?.price?.recurring?.interval || "month") as "month" | "year" | "week" | "day",
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000).toISOString() : new Date().toISOString(),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      createdAt: new Date(sub.created * 1000).toISOString(),
    };
  });

  // Calculate churn (simplified)
  const canceledThisMonth = subscriptions.data.filter(
    (sub) =>
      sub.status === "canceled" &&
      sub.canceled_at &&
      sub.canceled_at * 1000 > thirtyDaysAgo.getTime()
  ).length;

  const churnRate = activeSubscriptions.length > 0
    ? (canceledThisMonth / (activeSubscriptions.length + canceledThisMonth)) * 100
    : 0;

  return {
    currency: "usd", // Default, could be detected
    currentMRR,
    currentARR,
    currentRevenue,
    mrrGrowth: 0, // Would need historical data
    arrGrowth: 0, // Would need historical data
    totalCustomers: customers.data.length,
    activeSubscriptions: activeSubscriptions.length,
    churnRate,
    recentCharges,
    recentSubscriptions,
  };
}

/**
 * Construct and verify webhook event
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  endpointSecret: string
): Stripe.Event {
  const stripe = createStripeClient();
  return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
}

/**
 * Create a Stripe Connect OAuth link
 */
export function getConnectOAuthUrl(clientId: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    scope: "read_write",
    response_type: "code",
    redirect_uri: redirectUri,
  });

  return `https://connect.stripe.com/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange OAuth code for access token
 */
export async function exchangeCodeForToken(
  code: string
): Promise<{ access_token: string; stripe_user_id: string }> {
  const stripe = createStripeClient();

  const response = await stripe.oauth.token({
    grant_type: "authorization_code",
    code,
  });

  return {
    access_token: response.access_token || "",
    stripe_user_id: response.stripe_user_id || "",
  };
}
