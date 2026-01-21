"use client";

import { LottieAnimation } from "./lottie-animation";
import { inlineAnimations } from "./animations";

interface FireAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  loop?: boolean;
  autoplay?: boolean;
}

export function FireAnimation({
  className,
  size = "md",
  loop = true,
  autoplay = true,
}: FireAnimationProps) {
  return (
    <LottieAnimation
      animationData={inlineAnimations.simpleFlame}
      className={className}
      size={size}
      loop={loop}
      autoplay={autoplay}
    />
  );
}
