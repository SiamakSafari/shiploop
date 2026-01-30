/**
 * Stripe Integration Types
 */

export interface StripeConnectionStatus {
  connected: boolean;
  accountId?: string;
  accountName?: string;
  connectedAt?: string;
  lastSync?: string;
}

export interface StripeRevenueData {
  currency: string;
  // Current period
  currentMRR: number;
  currentARR: number;
  currentRevenue: number;
  // Growth
  mrrGrowth: number;
  arrGrowth: number;
  // Customers
  totalCustomers: number;
  activeSubscriptions: number;
  churnRate: number;
  // Recent activity
  recentCharges: StripeCharge[];
  recentSubscriptions: StripeSubscription[];
}

export interface StripeCharge {
  id: string;
  amount: number;
  currency: string;
  status: "succeeded" | "pending" | "failed";
  description: string | null;
  customerEmail: string | null;
  createdAt: string;
}

export interface StripeSubscription {
  id: string;
  status: "active" | "canceled" | "past_due" | "trialing" | "incomplete";
  customerEmail: string | null;
  planName: string | null;
  amount: number;
  currency: string;
  interval: "month" | "year" | "week" | "day";
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
  created: number;
}

export interface RevenueMetrics {
  date: string;
  mrr: number;
  arr: number;
  newCustomers: number;
  churned: number;
  netRevenue: number;
}
