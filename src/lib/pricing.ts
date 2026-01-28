/**
 * ShipLoop Pricing Configuration
 */

export const PRICING = {
  monthly: 9,
  annual: 79,
  currency: 'USD',
} as const;

export const FREE_LIMITS = {
  projects: 1,
  ideasPerMonth: 3,
  analyticsHistoryDays: 7,
  launchHubTemplates: false,
  aiCoach: false,
  leaderboardShare: false,
} as const;

export const PRO_FEATURES = {
  projects: 'unlimited',
  ideasPerMonth: 'unlimited',
  analyticsHistoryDays: 'unlimited',
  launchHubTemplates: true,
  aiCoach: true,
  leaderboardShare: true,
} as const;

export type SubscriptionTier = 'free' | 'pro';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  expiresAt?: string;
  cancelAtPeriodEnd?: boolean;
}

export const FEATURES = [
  {
    name: 'Ship Score Tracking',
    free: true,
    pro: true,
  },
  {
    name: 'Projects',
    free: '1 project',
    pro: 'Unlimited',
  },
  {
    name: 'Idea Validator',
    free: '3/month',
    pro: 'Unlimited',
  },
  {
    name: 'Analytics History',
    free: '7 days',
    pro: 'Full history',
  },
  {
    name: 'Leaderboard',
    free: 'View only',
    pro: 'Full + shareable badges',
  },
  {
    name: 'Launch Hub',
    free: 'Basic checklists',
    pro: 'Full + templates',
  },
  {
    name: 'AI Coach',
    free: false,
    pro: true,
  },
  {
    name: 'Priority Support',
    free: false,
    pro: true,
  },
] as const;

/**
 * Check if user can perform action based on tier
 */
export function canCreateProject(tier: SubscriptionTier, currentProjectCount: number): boolean {
  if (tier === 'pro') return true;
  return currentProjectCount < FREE_LIMITS.projects;
}

export function canValidateIdea(tier: SubscriptionTier, ideasThisMonth: number): boolean {
  if (tier === 'pro') return true;
  return ideasThisMonth < FREE_LIMITS.ideasPerMonth;
}

export function canAccessAICoach(tier: SubscriptionTier): boolean {
  return tier === 'pro';
}

export function canShareLeaderboard(tier: SubscriptionTier): boolean {
  return tier === 'pro';
}
