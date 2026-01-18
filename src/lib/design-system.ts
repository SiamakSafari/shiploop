/**
 * ShipLoop Design System Utilities
 * Helpers for managing colors, animations, and gamification elements
 */

// Color Variants - Pure Monochrome Palette
export const colors = {
  // Grayscale (10 shades)
  gray950: '#0a0a0a',
  gray900: '#171717',
  gray800: '#262626',
  gray700: '#404040',
  gray600: '#525252',
  gray500: '#737373',
  gray400: '#a3a3a3',
  gray300: '#d4d4d4',
  gray200: '#e5e5e5',
  gray100: '#f5f5f5',
  gray50: '#fafafa',
  white: '#ffffff',

  // Primary is now dark gray
  primary: '#171717',

  // Functional (minimal use)
  success: '#16a34a',
  warning: '#ca8a04',
  error: '#dc2626',
} as const

// Card Tint Classes - Pure Monochrome
export const cardTints = [
  'card-tint-dark',
  'card-tint-gray',
  'card-tint-light',
  'card-tint-white',
] as const

export type CardTint = typeof cardTints[number]

// Get a card tint by index (cycles through available tints)
export function getCardTint(index: number): CardTint {
  return cardTints[index % cardTints.length]
}

// Stat Card Color Assignments - Pure Monochrome
export const statCardColors = {
  mrr: {
    primary: colors.gray900,
    secondary: colors.gray100,
    tint: 'card-tint-dark' as const,
    glow: 'rgba(23, 23, 23, 0.15)',
  },
  users: {
    primary: colors.gray700,
    secondary: colors.gray100,
    tint: 'card-tint-gray' as const,
    glow: 'rgba(64, 64, 64, 0.15)',
  },
  velocity: {
    primary: colors.gray500,
    secondary: colors.gray100,
    tint: 'card-tint-light' as const,
    glow: 'rgba(115, 115, 115, 0.15)',
  },
  rank: {
    primary: colors.gray900,
    secondary: colors.gray100,
    tint: 'card-tint-dark' as const,
    glow: 'rgba(23, 23, 23, 0.15)',
  },
} as const

export type StatCardType = keyof typeof statCardColors

// Activity Feed Color Mapping - Pure Monochrome
export const activityColors = {
  commit: {
    color: colors.gray700,
    label: 'Commit',
  },
  revenue: {
    color: colors.gray900,
    label: 'Revenue',
  },
  launch: {
    color: colors.gray900,
    label: 'Launch',
  },
  milestone: {
    color: colors.gray800,
    label: 'Milestone',
  },
  idea: {
    color: colors.gray500,
    label: 'Idea',
  },
  user: {
    color: colors.gray600,
    label: 'User',
  },
} as const

export type ActivityType = keyof typeof activityColors

// Project Solid Colors - Pure Monochrome
export const projectColors = [
  { color: '#171717', bg: '#fafafa', name: 'dark' },
  { color: '#404040', bg: '#fafafa', name: 'gray700' },
  { color: '#525252', bg: '#fafafa', name: 'gray600' },
  { color: '#737373', bg: '#fafafa', name: 'gray500' },
  { color: '#a3a3a3', bg: '#f5f5f5', name: 'gray400' },
  { color: '#0a0a0a', bg: '#fafafa', name: 'black' },
] as const

export function getProjectColor(index: number) {
  return projectColors[index % projectColors.length]
}

// Badge Tier System
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export const badgeTierConfig = {
  bronze: {
    color: colors.gray400,
    glow: 'rgba(163, 163, 163, 0.2)',
    gradient: 'from-gray-400 to-gray-500',
    icon: '3',
  },
  silver: {
    color: colors.gray500,
    glow: 'rgba(115, 115, 115, 0.2)',
    gradient: 'from-gray-300 to-gray-400',
    icon: '2',
  },
  gold: {
    color: colors.gray700,
    glow: 'rgba(64, 64, 64, 0.2)',
    gradient: 'from-gray-600 to-gray-700',
    icon: '1',
  },
  platinum: {
    color: colors.gray900,
    glow: 'rgba(23, 23, 23, 0.2)',
    gradient: 'from-gray-800 to-gray-900',
    icon: '*',
  },
} as const

// Badge Category Colors
export type BadgeCategory = 'streak' | 'revenue' | 'launch' | 'community' | 'velocity'

export const badgeCategoryConfig = {
  streak: {
    color: colors.gray900,
    gradient: 'from-gray-800 to-gray-900',
  },
  revenue: {
    color: colors.gray800,
    gradient: 'from-gray-700 to-gray-800',
  },
  launch: {
    color: colors.gray700,
    gradient: 'from-gray-600 to-gray-700',
  },
  community: {
    color: colors.gray600,
    gradient: 'from-gray-500 to-gray-600',
  },
  velocity: {
    color: colors.gray500,
    gradient: 'from-gray-400 to-gray-500',
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
  // Keyframe animations
  firePulse: 'animate-fire-pulse',
  pulseGlow: 'animate-pulse-glow',
  shimmer: 'animate-shimmer',
  bounceIn: 'animate-bounce-in',
  slideUp: 'animate-slide-up',
  fadeIn: 'animate-fade-in',
  bounceGentle: 'animate-bounce-gentle',
  wiggle: 'animate-wiggle',
  shimmerMono: 'animate-shimmer-mono',
  scalePop: 'animate-scale-pop',
  glowPulseMono: 'animate-glow-pulse-mono',

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

// Confetti Colors - Pure Monochrome
export const confettiColors = [
  '#171717',
  '#262626',
  '#404040',
  '#525252',
  '#737373',
  '#a3a3a3',
  '#d4d4d4',
  '#e5e5e5',
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
