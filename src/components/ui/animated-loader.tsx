"use client";

import { cn } from "@/lib/utils";
import { LoadingAnimation, RocketAnimation } from "@/components/lottie";
import { Micro } from "@/components/ui/typography";

interface AnimatedLoaderProps {
  className?: string;
  variant?: "dots" | "pulse" | "rocket";
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeMap = {
  sm: "xs" as const,
  md: "md" as const,
  lg: "xl" as const,
};

export function AnimatedLoader({
  className,
  variant = "dots",
  size = "md",
  text,
}: AnimatedLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      {variant === "rocket" ? (
        <RocketAnimation size={sizeMap[size]} />
      ) : (
        <LoadingAnimation
          size={sizeMap[size]}
          variant={variant === "pulse" ? "pulse" : "dots"}
        />
      )}
      {text && (
        <Micro className="text-muted-foreground animate-pulse">{text}</Micro>
      )}
    </div>
  );
}

// Full page loader with centered animation
export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <RocketAnimation size="2xl" />
        <Micro className="text-muted-foreground font-medium animate-pulse">{text}</Micro>
      </div>
    </div>
  );
}

// Inline loader for buttons, cards, etc.
export function InlineLoader({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <LoadingAnimation size="xs" variant="dots" />
    </div>
  );
}
