"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics/client";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * Analytics Provider component
 * Tracks page views automatically when routes change
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  // Track page view on route change
  useEffect(() => {
    trackPageView({ url: pathname });
  }, [pathname]);

  return <>{children}</>;
}
