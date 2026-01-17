/**
 * ShipLoop Design System Utilities
 * Helpers for managing colors, animations, and gamification elements
 */

// Color Variants - Monochrome + Teal Palette
export const colors = {
  // Grayscale
  black: '#000000',
  gray1: '#171717',
  gray2: '#404040',
  gray3: '#737373',
  gray4: '#a3a3a3',
  gray5: '#d4d4d4',
  gray6: '#e5e5e5',
  gray7: '#f5f5f5',
  white: '#ffffff',

  // Teal Accent
  primary: '#0f766e',

  // Functional (minimal use)
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
} as const

// Card Tint Classes - Monochrome + Teal
export const cardTints = [
  'card-tint-teal',
  'card-tint-gray',
  'card-tint-gray-light',
  'card-tint-white',
] as const

export type CardTint = typeof cardTints[number]

// Get a card tint by index (cycles through available tints)
export function getCardTint(index: number): CardTint {
  return cardTints[index % cardTints.length]
}

// Stat Card Color Assignments - Monochrome + Teal
export const statCardColors = {
  mrr: {
    primary: colors.primary,      // Teal for revenue
    secondary: colors.gray7,
    tint: 'card-tint-gray' as const,
    glow: 'rgba(15, 118, 110, 0.3)',
  },
  users: {
    primary: colors.gray2,        // Dark gray
    secondary: colors.gray7,
    tint: 'card-tint-gray' as const,
    glow: 'rgba(64, 64, 64, 0.3)',
  },
  velocity: {
    primary: colors.gray3,        // Medium gray
    secondary: colors.gray7,
    tint: 'card-tint-gray' as const,
    glow: 'rgba(115, 115, 115, 0.3)',
  },
  rank: {
    primary: colors.primary,      // Teal for rank
    secondary: colors.gray7,
    tint: 'card-tint-gray' as const,
    glow: 'rgba(15, 118, 110, 0.3)',
  },
} as const

export type StatCardType = keyof typeof statCardColors

// Activity Feed Color Mapping - Monochrome + Purple
export const activityColors = {
  commit: {
    color: colors.gray2,
    label: 'Commit',
  },
  revenue: {
    color: colors.primary,
    label: 'Revenue',
  },
  launch: {
    color: colors.primary,
    label: 'Launch',
  },
  milestone: {
    color: colors.primary,
    label: 'Milestone',
  },
  idea: {
    color: colors.gray3,
    label: 'Idea',
  },
  user: {
    color: colors.gray2,
    label: 'User',
  },
} as const

export type ActivityType = keyof typeof activityColors

// Project Solid Colors - Monochrome + Teal
export const projectColors = [
  { color: '#0f766e', bg: '#fafafa', name: 'teal' },     // Teal accent
  { color: '#404040', bg: '#fafafa', name: 'gray1' },    // Dark gray
  { color: '#737373', bg: '#fafafa', name: 'gray2' },    // Medium gray
  { color: '#000000', bg: '#fafafa', name: 'black' },    // Black
  { color: '#a3a3a3', bg: '#fafafa', name: 'gray3' },    // Light gray
  { color: '#14b8a6', bg: '#f5f5f5', name: 'teal2' },    // Teal alternate (teal-500)
] as const

export function getProjectColor(index: number) {
  return projectColors[index % projectColors.length]
}

// Badge Tier System
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export const badgeTierConfig = {
  bronze: {
    color: colors.gray4,
    glow: 'rgba(163, 163, 163, 0.4)',
    gradient: 'from-gray-400 to-gray-500',
    icon: '🥉',
  },
  silver: {
    color: colors.gray3,
    glow: 'rgba(115, 115, 115, 0.4)',
    gradient: 'from-gray-300 to-gray-400',
    icon: '🥈',
  },
  gold: {
    color: colors.warning,
    glow: 'rgba(245, 158, 11, 0.4)',
    gradient: 'from-amber-400 to-amber-500',
    icon: '🥇',
  },
  platinum: {
    color: colors.primary,
    glow: 'rgba(15, 118, 110, 0.4)',
    gradient: 'from-teal-500 to-teal-600',
    icon: '💎',
  },
} as const

// Badge Category Colors
export type BadgeCategory = 'streak' | 'revenue' | 'launch' | 'community' | 'velocity'

export const badgeCategoryConfig = {
  streak: {
    color: colors.primary,
    gradient: 'from-teal-500 to-teal-600',
  },
  revenue: {
    color: colors.success,
    gradient: 'from-emerald-500 to-emerald-600',
  },
  launch: {
    color: colors.primary,
    gradient: 'from-teal-400 to-teal-500',
  },
  community: {
    color: colors.info,
    gradient: 'from-cyan-500 to-cyan-600',
  },
  velocity: {
    color: colors.gray2,
    gradient: 'from-gray-600 to-gray-700',
  },
} as const

// Typography System
export const typography = {
  display: { size: 'text-5xl', weight: 'font-bold', lineHeight: 'leading-tight', letterSpacing: 'tracking-tight' },
  h1: { size: 'text-3xl', weight: 'font-bold', lineHeight: 'leading-tight', letterSpacing: 'tracking-tight' },
  h2: { size: 'text-2xl', weight: 'font-semibold', lineHeight: 'leading-snug', letterSpacing: 'tracking-tight' },
  h3: { size: 'text-lg', weight: 'font-semibold', lineHeight: 'leading-snug' },
  h4: { size: 'text-base', weight: 'font-semibold', lineHeight: 'leading-normal' },
  body: { size: 'text-base', weight: 'font-normal', lineHeight: 'leading-relaxed' },
  bodySmall: { size: 'text-sm', weight: 'font-normal', lineHeight: 'leading-relaxed' },
  caption: { size: 'text-sm', weight: 'font-medium', lineHeight: 'leading-normal' },
  overline: { size: 'text-xs', weight: 'font-medium', lineHeight: 'leading-tight', letterSpacing: 'tracking-wide', transform: 'uppercase' },
  micro: { size: 'text-xs', weight: 'font-normal', lineHeight: 'leading-tight' },
  numberLarge: { size: 'text-5xl', weight: 'font-bold', family: 'font-space-grotesk', lineHeight: 'leading-none', letterSpacing: 'tracking-tight' },
  numberMedium: { size: 'text-3xl', weight: 'font-bold', family: 'font-space-grotesk', lineHeight: 'leading-none' },
  numberSmall: { size: 'text-xl', weight: 'font-bold', family: 'font-space-grotesk', lineHeight: 'leading-none' },
} as const

export function getTypography(variant: keyof typeof typography): string {
  const style = typography[variant]
  return Object.values(style).join(' ')
}

// Spacing System
export const spacing = {
  component: {
    padding: { xs: 'p-3', sm: 'p-4', md: 'p-5', lg: 'p-6' },
    gap: { xs: 'gap-2', sm: 'gap-3', md: 'gap-4', lg: 'gap-6' },
  },
  layout: {
    section: 'space-y-6',
    page: 'space-y-4',
    card: 'space-y-3',
  },
  grid: {
    tight: 'gap-4',
    normal: 'gap-6',
    loose: 'gap-8',
  },
} as const

// Icon Sizes
export const iconSizes = {
  xs: 'h-3 w-3',   // 12px - Tiny indicators
  sm: 'h-4 w-4',   // 16px - Inline with text, buttons
  md: 'h-5 w-5',   // 20px - Section headers
  lg: 'h-6 w-6',   // 24px - Card icons, emphasis
  xl: 'h-8 w-8',   // 32px - Large actions
} as const

// Animation Utilities
export const animations = {
  // Existing keyframe animations
  firePulse: 'animate-fire-pulse',
  pulseGlow: 'animate-pulse-glow',
  shimmer: 'animate-shimmer',
  bounceIn: 'animate-bounce-in',
  slideUp: 'animate-slide-up',
  fadeIn: 'animate-fade-in',
  bounceGentle: 'animate-bounce-gentle',
  wiggle: 'animate-wiggle',
  shimmerTeal: 'animate-shimmer-teal',
  scalePop: 'animate-scale-pop',
  glowPulseTeal: 'animate-glow-pulse-teal',

  // Duration utilities
  duration: { fast: 'duration-150', normal: 'duration-250', slow: 'duration-400' },

  // Easing utilities
  ease: { default: 'ease-out', bounce: 'ease-in-out' },

  // Transition presets
  hover: 'transition-all duration-150 ease-out',
  fade: 'transition-opacity duration-250 ease-out',
  slide: 'transition-transform duration-250 ease-out',
  scale: 'transition-transform duration-150 ease-out',
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

// Confetti Colors - Monochrome + Teal
export const confettiColors = [
  '#0f766e', // Dark teal
  '#14b8a6', // Teal-500
  '#5eead4', // Light teal
  '#404040', // Dark gray
  '#737373', // Medium gray
  '#a3a3a3', // Light gray
  '#d4d4d4', // Lighter gray
  '#000000', // Black
]

// Generate Random Confetti Colors
export function getConfettiColors(count: number = 5): string[] {
  // Return random selection
  return confettiColors.sort(() => Math.random() - 0.5).slice(0, count)
}

// Stagger Animation Delay
export function getStaggerDelay(index: number, baseDelay: number = 50): string {
  return `${index * baseDelay}ms`
}

// Consolidated Design System Export
export const designSystem = {
  typography,
  spacing,
  animations,
  iconSizes,
  colors,
  cardTints,
  statCardColors,
  activityColors,
  projectColors,
  badgeTierConfig,
  badgeCategoryConfig,
  shapes,
  hoverEffects,
} as const
