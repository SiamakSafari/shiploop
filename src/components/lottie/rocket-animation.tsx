"use client";

import { LottieAnimation } from "./lottie-animation";
import { inlineAnimations } from "./animations";

interface RocketAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  loop?: boolean;
  autoplay?: boolean;
}

export function RocketAnimation({
  className,
  size = "md",
  loop = true,
  autoplay = true,
}: RocketAnimationProps) {
  return (
    <LottieAnimation
      animationData={inlineAnimations.simpleRocket}
      className={className}
      size={size}
      loop={loop}
      autoplay={autoplay}
    />
  );
}
