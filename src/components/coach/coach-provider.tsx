"use client";

import { useCoachTriggers } from "@/hooks";
import { CoachWidget } from "./coach-widget";
import { CoachNotificationContainer } from "./coach-notification";

export function CoachProvider({ children }: { children: React.ReactNode }) {
  // Initialize coach triggers - this sets up automatic message triggers
  useCoachTriggers({
    enableDailyCheckin: true,
    enableStreakAlerts: true,
    enableMilestoneAlerts: true,
    enableSlackingAlerts: true,
  });

  return (
    <>
      {children}
      <CoachWidget />
      <CoachNotificationContainer />
    </>
  );
}
