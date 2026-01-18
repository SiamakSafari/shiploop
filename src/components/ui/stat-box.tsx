"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useAnimatedCounter } from "@/hooks";

type StatBoxVariant = "default" | "success" | "warning" | "danger" | "info";

interface StatBoxProps {
  label: string;
  value: number | string;
  color?: string;
  variant?: StatBoxVariant;
  format?: "number" | "currency" | "percent";
  animated?: boolean;
  animationDelay?: number;
  className?: string;
  staggerIndex?: number;
}

const variantStyles: Record<StatBoxVariant, { text: string; glow: string }> = {
  default: {
    text: "text-gray-900 dark:text-gray-50",
    glow: "",
  },
  success: {
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "hover:shadow-emerald-500/10",
  },
  warning: {
    text: "text-amber-600 dark:text-amber-400",
    glow: "hover:shadow-amber-500/10",
  },
  danger: {
    text: "text-red-600 dark:text-red-400",
    glow: "hover:shadow-red-500/10",
  },
  info: {
    text: "text-blue-600 dark:text-blue-400",
    glow: "hover:shadow-blue-500/10",
  },
};

function StatBox({
  label,
  value,
  color,
  variant = "default",
  format = "number",
  animated = true,
  animationDelay = 0,
  className,
  staggerIndex,
}: StatBoxProps) {
  const numericValue = typeof value === "number" ? value : parseFloat(value) || 0;
  const isNumeric = typeof value === "number" || !isNaN(parseFloat(value as string));

  const { value: animatedValue } = useAnimatedCounter(
    isNumeric ? numericValue : 0,
    {
      duration: 1200,
      delay: animationDelay + (staggerIndex ? staggerIndex * 100 : 0),
    }
  );

  const displayValue = (() => {
    if (!isNumeric || !animated) {
      return value;
    }
    const roundedValue = Math.round(animatedValue);
    switch (format) {
      case "currency":
        return `$${roundedValue.toLocaleString()}`;
      case "percent":
        return `${roundedValue}%`;
      default:
        return roundedValue.toLocaleString();
    }
  })();

  const styles = variantStyles[variant];
  const textColor = color || styles.text;

  return (
    <div
      className={cn(
        "glass rounded-xl p-4 group relative overflow-hidden transition-all duration-300",
        "hover-lift hover:shadow-lg",
        styles.glow,
        "animate-card-enter",
        staggerIndex && `stagger-${Math.min(staggerIndex, 5)}`,
        className
      )}
      style={{
        animationDelay: `${animationDelay + (staggerIndex ? staggerIndex * 100 : 0)}ms`,
      }}
    >
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="relative">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p
          className={cn(
            "text-2xl number-display mt-1 counter-animate",
            textColor
          )}
        >
          {displayValue}
        </p>
      </div>
    </div>
  );
}

export { StatBox };
export type { StatBoxProps, StatBoxVariant };
