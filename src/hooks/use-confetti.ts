"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  colors?: string[];
}

export function useConfetti() {
  // Default celebration colors (earthy/gold tones to match theme)
  const defaultColors = ["#bdb76b", "#8b8651", "#7c8c6e", "#a89070", "#c9b896"];

  // Basic confetti burst
  const burst = useCallback((options?: ConfettiOptions) => {
    confetti({
      particleCount: options?.particleCount ?? 100,
      spread: options?.spread ?? 70,
      startVelocity: options?.startVelocity ?? 30,
      decay: options?.decay ?? 0.95,
      scalar: options?.scalar ?? 1,
      colors: options?.colors ?? defaultColors,
      origin: { y: 0.6 },
    });
  }, []);

  // Celebration with multiple bursts
  const celebrate = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: defaultColors,
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: defaultColors,
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Side cannons effect
  const sideCannons = useCallback(() => {
    const end = Date.now() + 1000;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: defaultColors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: defaultColors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  // Fireworks effect
  const fireworks = useCallback(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 50, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.8), y: randomInRange(0.2, 0.5) },
        colors: defaultColors,
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Stars falling
  const stars = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0 },
      startVelocity: 25,
      gravity: 0.5,
      colors: ["#FFD700", "#FFA500", "#FFFFFF", "#bdb76b"],
      shapes: ["star"],
      scalar: 1.2,
    });
  }, []);

  return {
    burst,
    celebrate,
    sideCannons,
    fireworks,
    stars,
  };
}

// Milestone thresholds for automatic celebrations
export const SCORE_MILESTONES = [25, 50, 75, 100];
export const STREAK_MILESTONES = [7, 14, 30, 60, 100];
export const REVENUE_MILESTONES = [100, 1000, 5000, 10000, 50000, 100000];

/**
 * Check if a milestone was just crossed
 * Returns the milestone value if crossed, null otherwise
 */
export function shouldCelebrateMilestone(
  currentValue: number,
  previousValue: number,
  milestones: number[]
): number | null {
  for (const milestone of milestones) {
    if (previousValue < milestone && currentValue >= milestone) {
      return milestone;
    }
  }
  return null;
}
