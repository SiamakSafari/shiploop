"use client";

import Lottie, { LottieComponentProps } from "lottie-react";
import { cn } from "@/lib/utils";

interface LottieAnimationProps extends Omit<LottieComponentProps, "animationData"> {
  animationData: object;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const sizeClasses = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  "2xl": "w-32 h-32",
  full: "w-full h-full",
};

export function LottieAnimation({
  animationData,
  className,
  size = "md",
  loop = true,
  autoplay = true,
  ...props
}: LottieAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}
