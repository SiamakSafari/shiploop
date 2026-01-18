"use client";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  iconColor: string;
  size?: "sm" | "md" | "lg";
  index?: number;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  gradient,
  iconColor,
  size = "sm",
  index = 0,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "glass-premium rounded-2xl p-6 hover-lift group relative overflow-hidden animate-card-enter",
        size === "lg" && "md:col-span-2 md:row-span-2",
        size === "md" && "md:col-span-2"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
          gradient
        )}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={cn(
            "inline-flex p-3 rounded-xl mb-4 transition-all duration-300",
            "bg-muted group-hover:scale-110"
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
