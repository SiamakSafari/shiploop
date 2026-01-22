"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

export type MiniBadgeVariant = "new" | "hot" | "fire" | "star" | "crown" | "rocket";

interface MiniBadgeProps {
  variant: MiniBadgeVariant;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const badgeConfig: Record<MiniBadgeVariant, {
  label: string;
  icon: string;
  gradient: string;
  textColor: string;
}> = {
  new: {
    label: "NEW",
    icon: "sparkles",
    gradient: "from-[#6BBF8A] to-[#4AABA8]", /* SwingAI green to teal */
    textColor: "text-white",
  },
  hot: {
    label: "HOT",
    icon: "flame",
    gradient: "from-[#E8945A] to-[#F0A878]", /* SwingAI orange to pink */
    textColor: "text-white",
  },
  fire: {
    label: "FIRE",
    icon: "flame",
    gradient: "from-[#E8945A] to-[#D4783A]", /* SwingAI orange gradient */
    textColor: "text-white",
  },
  star: {
    label: "STAR",
    icon: "star",
    gradient: "from-[#D4AF37] to-[#E8945A]", /* SwingAI gold to orange */
    textColor: "text-[#1A1F2E]",
  },
  crown: {
    label: "TOP",
    icon: "crown",
    gradient: "from-[#D4AF37] to-[#F0A878]", /* SwingAI gold to pink */
    textColor: "text-[#1A1F2E]",
  },
  rocket: {
    label: "SHIP",
    icon: "rocket",
    gradient: "from-[#242A3A] to-[#1A1F2E]", /* SwingAI dark backgrounds */
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
      <Icon name={config.icon} size={12} />
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
            ? "from-[#6BBF8A] to-[#4AABA8] text-white"
            : "from-[#E8945A] to-[#F0A878] text-white"
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

export function FloatingBadge({ icon, text, color = "orange", className }: FloatingBadgeProps) {
  const colorClasses = {
    purple: "from-[#242A3A] to-[#1A1F2E]",
    cyan: "from-[#7CB4C4] to-[#4AABA8]",
    pink: "from-[#F0A878] to-[#E8945A]",
    emerald: "from-[#6BBF8A] to-[#4AABA8]",
    orange: "from-[#E8945A] to-[#D4783A]",
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
      <Icon name={icon} size={14} />
      <span>{text}</span>
    </div>
  );
}
