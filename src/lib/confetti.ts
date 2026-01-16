/**
 * ShipLoop Confetti Celebration Utilities
 * Celebration effects for achievements, milestones, and special moments
 */

import confetti from 'canvas-confetti'
import { getConfettiColors } from './design-system'

// Default confetti configuration
const defaultConfig: confetti.Options = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  disableForReducedMotion: true,
}

/**
 * Achievement Unlock Celebration
 * Burst of confetti with customizable colors
 */
export function celebrateAchievement(colors?: string[]) {
  const celebrationColors = colors || getConfettiColors(5)

  confetti({
    ...defaultConfig,
    particleCount: 150,
    spread: 100,
    colors: celebrationColors,
  })
}

/**
 * Streak Milestone Celebration
 * Fire-themed celebration for streak achievements
 */
export function celebrateStreak(days: number) {
  const fireColors = ['#fbbf24', '#fb923c', '#f97316', '#ef4444']

  // Burst from center
  confetti({
    ...defaultConfig,
    particleCount: 200,
    spread: 120,
    colors: fireColors,
    startVelocity: 45,
  })

  // Add sparkles after a delay
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: fireColors,
    })
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: fireColors,
    })
  }, 200)
}

/**
 * Level Up Celebration
 * Rainbow confetti explosion
 */
export function celebrateLevelUp(level: number) {
  const rainbowColors = [
    '#a78bfa', // purple
    '#22d3ee', // cyan
    '#f472b6', // pink
    '#fbbf24', // yellow
    '#34d399', // emerald
    '#fb923c', // orange
  ]

  // Center burst
  confetti({
    ...defaultConfig,
    particleCount: 150,
    spread: 100,
    colors: rainbowColors,
    startVelocity: 50,
  })

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: rainbowColors,
    })
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: rainbowColors,
    })
  }, 250)
}

/**
 * Revenue Milestone Celebration
 * Gold/money-themed confetti
 */
export function celebrateRevenue(amount: number) {
  const moneyColors = ['#ffd700', '#34d399', '#10b981', '#fbbf24']

  confetti({
    ...defaultConfig,
    particleCount: 200,
    spread: 100,
    colors: moneyColors,
    shapes: ['circle', 'square'],
    scalar: 1.2,
  })
}

/**
 * Product Launch Celebration
 * Rocket-themed celebration
 */
export function celebrateLaunch() {
  const rocketColors = ['#22d3ee', '#7dd3fc', '#a78bfa', '#f472b6']

  // Main burst
  confetti({
    ...defaultConfig,
    particleCount: 150,
    spread: 90,
    colors: rocketColors,
    startVelocity: 60,
  })

  // Follow-up bursts
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 90,
      spread: 45,
      origin: { x: 0.3, y: 0.8 },
      colors: rocketColors,
    })
  }, 200)

  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 90,
      spread: 45,
      origin: { x: 0.7, y: 0.8 },
      colors: rocketColors,
    })
  }, 400)
}

/**
 * Continuous Celebration
 * Confetti rain effect (use sparingly)
 */
export function celebrationRain(duration: number = 3000) {
  const colors = getConfettiColors(6)
  const end = Date.now() + duration

  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval)
      return
    }

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0 },
      colors,
      disableForReducedMotion: true,
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0 },
      colors,
      disableForReducedMotion: true,
    })
  }, 100)
}

/**
 * Simple Celebration
 * Quick, simple confetti burst
 */
export function celebrateQuick() {
  confetti({
    ...defaultConfig,
    particleCount: 80,
    spread: 60,
    colors: getConfettiColors(4),
  })
}

/**
 * Clear all confetti
 */
export function clearConfetti() {
  confetti.reset()
}

/**
 * Custom confetti with full control
 */
export function celebrateCustom(options: confetti.Options) {
  confetti({
    ...defaultConfig,
    ...options,
  })
}
