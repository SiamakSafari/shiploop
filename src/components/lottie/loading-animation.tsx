"use client";

import { LottieAnimation } from "./lottie-animation";
import { inlineAnimations } from "./animations";

interface LoadingAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  variant?: "pulse" | "dots";
}

export function LoadingAnimation({
  className,
  size = "md",
  variant = "dots",
}: LoadingAnimationProps) {
  const animationData = variant === "pulse"
    ? inlineAnimations.pulseLoader
    : inlineAnimations.dotsLoading;

  return (
    <LottieAnimation
      animationData={animationData}
      className={className}
      size={size}
      loop={true}
      autoplay={true}
    />
  );
}
