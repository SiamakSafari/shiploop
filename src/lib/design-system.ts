/**
 * ShipLoop Design System Utilities
 * Helpers for managing colors, animations, and gamification elements
 */

// Color Variants - Maps to CSS variables in globals.css
export const colors = {
  purpleVivid: 'var(--color-purple-vivid)',
  cyanVivid: 'var(--color-cyan-vivid)',
  pinkVivid: 'var(--color-pink-vivid)',
  orangeVivid: 'var(--color-orange-vivid)',
  emeraldVivid: 'var(--color-emerald-vivid)',
  sunshineYellow: 'var(--color-sunshine-yellow)',
  coral: 'var(--color-coral)',
  peach: 'var(--color-peach)',
  hotPink: 'var(--color-hot-pink)',
  skyBlue: 'var(--color-sky-blue)',
  mint: 'var(--color-mint)',
  lavender: 'var(--color-lavender)',
  aqua: 'var(--color-aqua)',
  lime: 'var(--color-lime)',
  rose: 'var(--color-rose)',
  indigo: 'var(--color-indigo)',
  teal: 'var(--color-teal)',
  gold: 'var(--color-gold)',
  silver: 'var(--color-silver)',
  bronze: 'var(--color-bronze)',
  xpBlue: 'var(--color-xp-blue)',
} as const

// Card Tint Classes
export const cardTints = [
  'card-tint-purple',
  'card-tint-cyan',
  'card-tint-pink',
  'card-tint-emerald',
  'card-tint-gold',
  'card-tint-coral',
] as const

export type CardTint = typeof cardTints[number]

// Get a card tint by index (cycles through available tints)
export function getCardTint(index: number): CardTint {
  return cardTints[index % cardTints.length]
}

// Stat Card Color Assignments
export const statCardColors = {
  mrr: {
    primary: colors.emeraldVivid,
    secondary: colors.gold,
    tint: 'card-tint-emerald' as const,
    glow: 'rgba(52, 211, 153, 0.3)',
  },
  users: {
    primary: colors.cyanVivid,
    secondary: colors.skyBlue,
    tint: 'card-tint-cyan' as const,
    glow: 'rgba(34, 211, 238, 0.3)',
  },
  velocity: {
    primary: colors.purpleVivid,
    secondary: colors.lavender,
    tint: 'card-tint-purple' as const,
    glow: 'rgba(167, 139, 250, 0.3)',
  },
  rank: {
    primary: colors.pinkVivid,
    secondary: colors.hotPink,
    tint: 'card-tint-pink' as const,
    glow: 'rgba(244, 114, 182, 0.3)',
  },
} as const

export type StatCardType = keyof typeof statCardColors

// Activity Feed Color Mapping
export const activityColors = {
  commit: {
    color: colors.indigo,
    emoji: '💻',
    label: 'Commit',
  },
  revenue: {
    color: colors.mint,
    emoji: '💰',
    label: 'Revenue',
  },
  launch: {
    color: colors.coral,
    emoji: '🚀',
    label: 'Launch',
  },
  milestone: {
    color: colors.hotPink,
    emoji: '🎉',
    label: 'Milestone',
  },
  idea: {
    color: colors.sunshineYellow,
    emoji: '💡',
    label: 'Idea',
  },
  user: {
    color: colors.skyBlue,
    emoji: '👥',
    label: 'User',
  },
} as const

export type ActivityType = keyof typeof activityColors

// Project Gradient Pairs (6 unique combinations that cycle)
export const projectGradients = [
  {
    from: colors.purpleVivid,
    to: colors.cyanVivid,
    class: 'from-purple-500 to-cyan-500',
  },
  {
    from: colors.pinkVivid,
    to: colors.orangeVivid,
    class: 'from-pink-500 to-orange-500',
  },
  {
    from: colors.emeraldVivid,
    to: colors.teal,
    class: 'from-emerald-500 to-teal-500',
  },
  {
    from: colors.indigo,
    to: colors.purpleVivid,
    class: 'from-indigo-500 to-purple-500',
  },
  {
    from: colors.coral,
    to: colors.hotPink,
    class: 'from-red-500 to-pink-500',
  },
  {
    from: colors.sunshineYellow,
    to: colors.orangeVivid,
    class: 'from-yellow-500 to-orange-500',
  },
] as const

export function getProjectGradient(index: number) {
  return projectGradients[index % projectGradients.length]
}

// Badge Tier System
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export const badgeTierConfig = {
  bronze: {
    color: colors.bronze,
    gradient: 'from-amber-700 to-orange-600',
    glow: 'rgba(205, 127, 50, 0.5)',
    icon: '🥉',
  },
  silver: {
    color: colors.silver,
    gradient: 'from-gray-400 to-gray-300',
    glow: 'rgba(192, 192, 192, 0.5)',
    icon: '🥈',
  },
  gold: {
    color: colors.gold,
    gradient: 'from-yellow-400 to-yellow-300',
    glow: 'rgba(255, 215, 0, 0.5)',
    icon: '🥇',
  },
  platinum: {
    color: colors.aqua,
    gradient: 'from-cyan-300 to-blue-300',
    glow: 'rgba(94, 234, 212, 0.5)',
    icon: '💎',
  },
} as const

// Badge Category Colors
export type BadgeCategory = 'streak' | 'revenue' | 'launch' | 'community' | 'velocity'

export const badgeCategoryConfig = {
  streak: {
    gradient: 'from-orange-500 to-red-500',
    color: colors.orangeVivid,
    emoji: '🔥',
  },
  revenue: {
    gradient: 'from-emerald-500 to-yellow-500',
    color: colors.emeraldVivid,
    emoji: '💰',
  },
  launch: {
    gradient: 'from-cyan-500 to-blue-500',
    color: colors.cyanVivid,
    emoji: '🚀',
  },
  community: {
    gradient: 'from-pink-500 to-purple-500',
    color: colors.pinkVivid,
    emoji: '👥',
  },
  velocity: {
    gradient: 'from-yellow-500 to-orange-500',
    color: colors.sunshineYellow,
    emoji: '⚡',
  },
} as const

// Animation Utilities
export const animations = {
  firePulse: 'animate-fire-pulse',
  pulseGlow: 'animate-pulse-glow',
  shimmer: 'animate-shimmer',
  bounceIn: 'animate-bounce-in',
  slideUp: 'animate-slide-up',
  fadeIn: 'animate-fade-in',
  bounceGentle: 'animate-bounce-gentle',
  wiggle: 'animate-wiggle',
  shimmerRainbow: 'animate-shimmer-rainbow',
  scalePop: 'animate-scale-pop',
  glowPulseRainbow: 'animate-glow-pulse-rainbow',
  floatEmoji: 'animate-float-emoji',
} as const

// Shape Utilities
export const shapes = {
  blob: 'shape-blob',
  tilted: 'shape-tilted',
  pill: 'shape-pill',
  hexagon: 'shape-hexagon',
  sticker: 'shape-sticker',
} as const

// Hover Effects
export const hoverEffects = {
  lift: 'hover-lift',
  glow: 'hover-glow',
  wiggle: 'hover-wiggle',
  bounce: 'hover-bounce',
} as const

// Level Calculation (Ship Score to Level)
export function calculateLevel(shipScore: number): number {
  // Every 100 points = 1 level
  return Math.floor(shipScore / 100)
}

// XP Progress (within current level)
export function calculateXPProgress(shipScore: number): {
  current: number
  needed: number
  percentage: number
} {
  const current = shipScore % 100
  const needed = 100
  const percentage = (current / needed) * 100

  return { current, needed, percentage }
}

// Streak Milestone Checker
export function getStreakMilestone(days: number): {
  milestone: number
  isNew: boolean
  next: number
} | null {
  const milestones = [7, 30, 60, 100, 365]
  const reached = milestones.filter(m => days >= m)
  const current = reached[reached.length - 1] || 0
  const next = milestones.find(m => m > days) || milestones[milestones.length - 1]

  return {
    milestone: current,
    isNew: current === days,
    next,
  }
}

// Format Number with Abbreviations
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

// Format Currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Generate Random Confetti Colors
export function getConfettiColors(count: number = 5): string[] {
  const colorValues = [
    '#a78bfa', // purple
    '#22d3ee', // cyan
    '#f472b6', // pink
    '#fb923c', // orange
    '#34d399', // emerald
    '#fbbf24', // yellow
    '#ff6b6b', // coral
    '#7dd3fc', // sky blue
  ]

  // Return random selection
  return colorValues.sort(() => Math.random() - 0.5).slice(0, count)
}

// Stagger Animation Delay
export function getStaggerDelay(index: number, baseDelay: number = 50): string {
  return `${index * baseDelay}ms`
}
