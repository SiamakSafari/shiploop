/**
 * Analytics Client
 * Supports Plausible, PostHog, or custom analytics
 * Provides a unified interface for tracking events
 */

export type AnalyticsProvider = "plausible" | "posthog" | "none";

interface TrackEventOptions {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

interface PageViewOptions {
  url?: string;
  referrer?: string;
}

/**
 * Detect which analytics provider is configured
 */
export function getAnalyticsProvider(): AnalyticsProvider {
  if (typeof window === "undefined") return "none";

  const win = window as unknown as Record<string, unknown>;

  // Check for Plausible
  if (win.plausible) return "plausible";

  // Check for PostHog
  if (win.posthog) return "posthog";

  return "none";
}

/**
 * Track a custom event
 */
export function trackEvent({ name, properties }: TrackEventOptions): void {
  if (typeof window === "undefined") return;

  const provider = getAnalyticsProvider();

  switch (provider) {
    case "plausible": {
      const plausible = (window as unknown as Record<string, unknown>).plausible as
        | ((name: string, options?: { props: Record<string, string | number | boolean> }) => void)
        | undefined;
      if (plausible) {
        plausible(name, properties ? { props: properties } : undefined);
      }
      break;
    }
    case "posthog": {
      const posthog = (window as unknown as Record<string, unknown>).posthog as
        | { capture: (name: string, properties?: Record<string, string | number | boolean>) => void }
        | undefined;
      if (posthog) {
        posthog.capture(name, properties);
      }
      break;
    }
    default:
      // Log in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[Analytics] Event: ${name}`, properties || {});
      }
  }
}

/**
 * Track a page view
 */
export function trackPageView(options?: PageViewOptions): void {
  if (typeof window === "undefined") return;

  const provider = getAnalyticsProvider();

  switch (provider) {
    case "posthog": {
      const posthog = (window as unknown as Record<string, unknown>).posthog as
        | { capture: (name: string, properties?: Record<string, string>) => void }
        | undefined;
      if (posthog) {
        posthog.capture("$pageview", {
          ...(options?.url ? { $current_url: options.url } : {}),
          ...(options?.referrer ? { $referrer: options.referrer } : {}),
        });
      }
      break;
    }
    default:
      // Plausible auto-tracks page views
      if (process.env.NODE_ENV === "development") {
        console.log("[Analytics] Page view:", options?.url || window.location.pathname);
      }
  }
}

/**
 * Identify a user for analytics
 */
export function identifyUser(
  userId: string,
  traits?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;

  const provider = getAnalyticsProvider();

  switch (provider) {
    case "posthog": {
      const posthog = (window as unknown as Record<string, unknown>).posthog as
        | { identify: (id: string, traits?: Record<string, string | number | boolean>) => void }
        | undefined;
      if (posthog) {
        posthog.identify(userId, traits);
      }
      break;
    }
    default:
      if (process.env.NODE_ENV === "development") {
        console.log("[Analytics] Identify:", userId, traits);
      }
  }
}

/**
 * Pre-defined events for ShipLoop
 */
export const EVENTS = {
  // Auth events
  SIGNUP: "signup",
  LOGIN: "login",
  LOGOUT: "logout",

  // Waitlist events
  WAITLIST_JOIN: "waitlist_join",

  // Feature usage
  PROJECT_CREATED: "project_created",
  PROJECT_UPDATED: "project_updated",
  COMMIT_TRACKED: "commit_tracked",
  LAUNCH_STARTED: "launch_started",
  REVENUE_TRACKED: "revenue_tracked",

  // Coach events
  COACH_OPENED: "coach_opened",
  COACH_ASKED: "coach_asked",
  COACH_PERSONALITY_CHANGED: "coach_personality_changed",
  COACH_MESSAGE_SHARED: "coach_message_shared",

  // Engagement
  FEEDBACK_ADDED: "feedback_added",
  POST_CREATED: "post_created",
  POST_PUBLISHED: "post_published",
  POST_SHARED: "post_shared",

  // Achievement events
  STREAK_MILESTONE: "streak_milestone",
  SCORE_MILESTONE: "score_milestone",
  REVENUE_MILESTONE: "revenue_milestone",
  BADGE_EARNED: "badge_earned",

  // Settings
  THEME_CHANGED: "theme_changed",
  GITHUB_CONNECTED: "github_connected",
  STRIPE_CONNECTED: "stripe_connected",
} as const;
