"use client";

import { cn } from "@/lib/utils";

export type MiniBadgeVariant = "new" | "hot" | "fire" | "star" | "crown" | "rocket";

interface MiniBadgeProps {
  variant: MiniBadgeVariant;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const badgeConfig: Record<MiniBadgeVariant, {
  label: string;
  emoji: string;
  gradient: string;
  textColor: string;
}> = {
  new: {
    label: "NEW",
    emoji: "✨",
    gradient: "from-lime-500 to-emerald-500",
    textColor: "text-emerald-950",
  },
  hot: {
    label: "HOT",
    emoji: "🔥",
    gradient: "from-coral-500 to-orange-500",
    textColor: "text-white",
  },
  fire: {
    label: "FIRE",
    emoji: "🔥",
    gradient: "from-orange-500 to-red-500",
    textColor: "text-white",
  },
  star: {
    label: "STAR",
    emoji: "⭐",
    gradient: "from-yellow-400 to-yellow-300",
    textColor: "text-yellow-950",
  },
  crown: {
    label: "TOP",
    emoji: "👑",
    gradient: "from-gold-500 to-yellow-500",
    textColor: "text-yellow-950",
  },
  rocket: {
    label: "SHIP",
    emoji: "🚀",
    gradient: "from-cyan-500 to-blue-500",
    textColor: "text-white",
  },
};

const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-2 right-2",
};

export function MiniBadge({ variant, className, position = "top-right" }: MiniBadgeProps) {
  const config = badgeConfig[variant];

  return (
    <div
      className={cn(
        "absolute z-10 flex items-center gap-1 px-2 py-0.5 rounded-md shadow-lg",
        "bg-gradient-to-r border border-white/20 animate-scale-pop font-fredoka",
        `bg-gradient-to-r ${config.gradient}`,
        config.textColor,
        positionClasses[position],
        className
      )}
    >
      <span className="text-xs">{config.emoji}</span>
      <span className="text-[10px] font-bold uppercase tracking-wide">{config.label}</span>
    </div>
  );
}

// Corner ribbon badge (alternative style)
interface CornerRibbonProps {
  text: string;
  variant?: "new" | "hot";
  className?: string;
}

export function CornerRibbon({ text, variant = "new", className }: CornerRibbonProps) {
  const isNew = variant === "new";

  return (
    <div
      className={cn(
        "absolute -top-1 -right-1 z-10",
        className
      )}
    >
      <div
        className={cn(
          "relative px-4 py-1 text-[10px] font-bold uppercase tracking-wider rotate-12 shadow-lg font-fredoka",
          "bg-gradient-to-r border border-white/20",
          isNew
            ? "from-lime-500 to-emerald-500 text-emerald-950"
            : "from-coral-500 to-orange-500 text-white"
        )}
        style={{
          clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
        }}
      >
        {text}
      </div>
    </div>
  );
}

// Floating badge for hover states
interface FloatingBadgeProps {
  icon: string;
  text: string;
  color?: "purple" | "cyan" | "pink" | "emerald" | "orange";
  className?: string;
}

export function FloatingBadge({ icon, text, color = "purple", className }: FloatingBadgeProps) {
  const colorClasses = {
    purple: "from-purple-500 to-pink-500",
    cyan: "from-cyan-500 to-blue-500",
    pink: "from-pink-500 to-rose-500",
    emerald: "from-emerald-500 to-teal-500",
    orange: "from-orange-500 to-red-500",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "bg-gradient-to-r shadow-lg border border-white/20",
        "text-white text-xs font-semibold",
        "animate-float-emoji font-fredoka",
        `bg-gradient-to-r ${colorClasses[color]}`,
        className
      )}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
