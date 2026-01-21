"use client";

import { LottieAnimation } from "./lottie-animation";
import { inlineAnimations } from "./animations";

interface EmptyStateAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function EmptyStateAnimation({
  className,
  size = "xl",
}: EmptyStateAnimationProps) {
  return (
    <LottieAnimation
      animationData={inlineAnimations.simpleRocket}
      className={className}
      size={size}
      loop={true}
      autoplay={true}
    />
  );
}
