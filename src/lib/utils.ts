import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNow, format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format number with K/M suffix
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"
  }
  return num.toString()
}

// Format percentage
export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}

// Format relative time
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

// Format date
export function formatDate(date: Date, pattern: string = "MMM d, yyyy"): string {
  return format(date, pattern)
}

// Calculate ship score from breakdown
export function calculateShipScore(breakdown: {
  commits: number
  launches: number
  revenue: number
  growth: number
}): number {
  return breakdown.commits + breakdown.launches + breakdown.revenue + breakdown.growth
}

// Get tier from percentile
export function getTierFromPercentile(percentile: number): "diamond" | "gold" | "silver" | "bronze" {
  if (percentile <= 5) return "diamond"
  if (percentile <= 15) return "gold"
  if (percentile <= 35) return "silver"
  return "bronze"
}

// Get tier color
export function getTierColor(tier: "diamond" | "gold" | "silver" | "bronze"): string {
  switch (tier) {
    case "diamond":
      return "text-cyan-400"
    case "gold":
      return "text-yellow-400"
    case "silver":
      return "text-gray-400"
    case "bronze":
      return "text-orange-400"
  }
}

// Platform display names
export function getPlatformDisplayName(platform: string): string {
  const names: Record<string, string> = {
    product_hunt: "Product Hunt",
    indie_hackers: "Indie Hackers",
    hacker_news: "Hacker News",
    reddit: "Reddit",
    twitter: "Twitter/X",
  }
  return names[platform] || platform
}
