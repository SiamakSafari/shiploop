"use client";

import { LottieAnimation } from "./lottie-animation";
import { inlineAnimations } from "./animations";

interface SuccessAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  loop?: boolean;
  autoplay?: boolean;
}

export function SuccessAnimation({
  className,
  size = "md",
  loop = false,
  autoplay = true,
}: SuccessAnimationProps) {
  return (
    <LottieAnimation
      animationData={inlineAnimations.checkmark}
      className={className}
      size={size}
      loop={loop}
      autoplay={autoplay}
    />
  );
}
