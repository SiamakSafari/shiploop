"use client";

import { useCallback } from "react";
import { trackEvent, trackPageView, EVENTS } from "@/lib/analytics/client";

/**
 * Hook for tracking analytics events
 */
export function useTrackEvent() {
  const track = useCallback(
    (name: string, properties?: Record<string, string | number | boolean>) => {
      trackEvent({ name, properties });
    },
    []
  );

  const trackPage = useCallback((url?: string) => {
    trackPageView({ url });
  }, []);

  return {
    track,
    trackPage,
    events: EVENTS,
  };
}
