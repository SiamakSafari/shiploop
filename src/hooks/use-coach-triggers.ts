"use client";

import { useEffect, useRef, useCallback } from "react";
import { useCoachStore } from "@/stores/use-coach-store";
import { CoachContext, MessageTrigger } from "@/lib/coach";
import { useAuth } from "@/components/providers/auth-provider";
import { useShipScore } from "@/hooks/api";

interface UseCoachTriggersOptions {
  // Enable/disable specific triggers
  enableDailyCheckin?: boolean;
  enableStreakAlerts?: boolean;
  enableMilestoneAlerts?: boolean;
  enableSlackingAlerts?: boolean;
}

export function useCoachTriggers(options: UseCoachTriggersOptions = {}) {
  const {
    enableDailyCheckin = true,
    enableStreakAlerts = true,
    enableMilestoneAlerts = true,
    enableSlackingAlerts = true,
  } = options;

  const { profile } = useAuth();
  const { data: shipScoreData } = useShipScore();
  const { addMessage, isEnabled } = useCoachStore();

  // Track previous values to detect changes
  const prevShipScore = useRef<number | null>(null);
  const prevStreak = useRef<number | null>(null);
  const lastDailyCheckin = useRef<string | null>(null);
  const hasTriggeredInitial = useRef(false);

  // Build context from current data
  const buildContext = useCallback((): CoachContext => {
    const score = shipScoreData?.score;
    const rank = shipScoreData?.rank;

    return {
      userName: profile?.name?.split(" ")[0] || "Shipper",
      shipScore: score?.total || 0,
      currentStreak: score?.current_streak || 0,
      longestStreak: score?.longest_streak || 0,
      isOnFire: score?.is_on_fire || false,
      totalRevenue: 0, // TODO: Get from financial data
      projectCount: 0, // TODO: Get from projects
      launchCount: score?.launches || 0,
      lastActiveDate: new Date().toISOString(),
      daysSinceLastActivity: 0,
      leaderboardPosition: rank?.position || 0,
      leaderboardChange: 0, // TODO: Track changes
    };
  }, [profile, shipScoreData]);

  // Trigger a coach message
  const triggerMessage = useCallback(
    (trigger: MessageTrigger) => {
      if (!isEnabled) return null;
      const context = buildContext();
      return addMessage(trigger, context);
    },
    [isEnabled, buildContext, addMessage]
  );

  // Daily check-in (once per day)
  useEffect(() => {
    if (!enableDailyCheckin || !isEnabled || !profile) return;

    const today = new Date().toDateString();
    if (lastDailyCheckin.current === today) return;

    // Trigger daily check-in after a short delay
    const timer = setTimeout(() => {
      lastDailyCheckin.current = today;
      triggerMessage("daily-checkin");
    }, 2000);

    return () => clearTimeout(timer);
  }, [enableDailyCheckin, isEnabled, profile, triggerMessage]);

  // Ship Score changes
  useEffect(() => {
    if (!isEnabled || !shipScoreData?.score) return;

    const currentScore = shipScoreData.score.total;

    if (prevShipScore.current !== null && prevShipScore.current !== currentScore) {
      if (currentScore > prevShipScore.current) {
        triggerMessage("ship-score-up");
      } else if (currentScore < prevShipScore.current) {
        triggerMessage("ship-score-down");
      }
    }

    prevShipScore.current = currentScore;
  }, [isEnabled, shipScoreData?.score, triggerMessage]);

  // Streak changes
  useEffect(() => {
    if (!enableStreakAlerts || !isEnabled || !shipScoreData?.score) return;

    const currentStreak = shipScoreData.score.current_streak;

    if (prevStreak.current !== null) {
      if (currentStreak === 1 && prevStreak.current === 0) {
        triggerMessage("streak-started");
      } else if (currentStreak > prevStreak.current && currentStreak > 1) {
        triggerMessage("streak-continued");
      } else if (currentStreak === 0 && prevStreak.current > 0) {
        triggerMessage("streak-broken");
      }
    }

    prevStreak.current = currentStreak;
  }, [enableStreakAlerts, isEnabled, shipScoreData?.score, triggerMessage]);

  // Initial welcome message (first time user)
  useEffect(() => {
    if (!isEnabled || !profile || hasTriggeredInitial.current) return;

    hasTriggeredInitial.current = true;

    // Trigger a welcome message after a short delay
    const timer = setTimeout(() => {
      triggerMessage("daily-checkin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [isEnabled, profile, triggerMessage]);

  // Manual trigger function for external use
  return {
    triggerMessage,
    triggerStreakStarted: () => triggerMessage("streak-started"),
    triggerStreakContinued: () => triggerMessage("streak-continued"),
    triggerStreakBroken: () => triggerMessage("streak-broken"),
    triggerMilestoneHit: () => triggerMessage("milestone-hit"),
    triggerRevenueMilestone: () => triggerMessage("revenue-milestone"),
    triggerSlacking: () => triggerMessage("slacking"),
    triggerComeback: () => triggerMessage("comeback"),
    triggerFirstLaunch: () => triggerMessage("first-launch"),
    triggerLeaderboardClimb: () => triggerMessage("leaderboard-climb"),
    triggerLeaderboardDrop: () => triggerMessage("leaderboard-drop"),
    triggerDailyCheckin: () => triggerMessage("daily-checkin"),
    triggerWeeklySummary: () => triggerMessage("weekly-summary"),
  };
}
