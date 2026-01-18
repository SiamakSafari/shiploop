"use client";

import * as React from "react";
import {
  Mail,
  Twitter,
  MessageCircle,
  ClipboardList,
  Star,
  Ticket,
  Smile,
  Meh,
  Frown,
  Lightbulb,
  Bug,
  PartyPopper,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Eye,
  Target,
  CheckCircle,
  Archive,
  Briefcase,
  Rocket,
  Bot,
  FileText,
  Calendar,
  XCircle,
  Clapperboard,
  BarChart3,
  DollarSign,
  TrendingDown,
  Plane,
  TrendingUp,
  RefreshCw,
  Pause,
  Trophy,
  AlertTriangle,
  Flame,
  Crown,
  Medal,
  Newspaper,
  Link,
  Cpu,
  Brain,
  TestTube,
  FlaskConical,
  Globe,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon name to Lucide component mapping
const iconMap: Record<string, LucideIcon> = {
  // Communication & Sources
  mail: Mail,
  twitter: Twitter,
  "message-circle": MessageCircle,
  "clipboard-list": ClipboardList,
  star: Star,
  ticket: Ticket,

  // Sentiment
  smile: Smile,
  meh: Meh,
  frown: Frown,

  // Categories
  lightbulb: Lightbulb,
  bug: Bug,
  "party-popper": PartyPopper,
  "alert-circle": AlertCircle,
  "help-circle": HelpCircle,

  // Status
  sparkles: Sparkles,
  eye: Eye,
  target: Target,
  "check-circle": CheckCircle,
  archive: Archive,
  "x-circle": XCircle,
  calendar: Calendar,

  // Platforms
  briefcase: Briefcase,
  rocket: Rocket,
  bot: Bot,
  "file-text": FileText,
  newspaper: Newspaper,
  link: Link,

  // Post types
  clapperboard: Clapperboard,
  "bar-chart": BarChart3,

  // Financial
  "dollar-sign": DollarSign,
  "trending-down": TrendingDown,
  plane: Plane,
  "trending-up": TrendingUp,

  // Experiment status
  "refresh-cw": RefreshCw,
  pause: Pause,
  trophy: Trophy,

  // Goals
  "alert-triangle": AlertTriangle,

  // Gamification
  flame: Flame,
  crown: Crown,
  medal: Medal,

  // Directory
  cpu: Cpu,
  brain: Brain,
  "test-tube": TestTube,
  "flask-conical": FlaskConical,
  globe: Globe,
  cloud: Cloud,
};

export type IconName = keyof typeof iconMap;

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 16 }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback to a default icon if not found
    return <HelpCircle className={cn("shrink-0", className)} size={size} />;
  }

  return <IconComponent className={cn("shrink-0", className)} size={size} />;
}

// Export the icon map for direct usage if needed
export { iconMap };

// Helper to get icon component by name
export function getIcon(name: string): LucideIcon | null {
  return iconMap[name] || null;
}
