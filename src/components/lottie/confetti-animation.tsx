"use client";

import { LottieAnimation } from "./lottie-animation";

// Inline confetti celebration animation
const confettiAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Confetti",
  ddd: 0,
  assets: [],
  layers: [
    // Multiple confetti pieces
    ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
      ddd: 0,
      ind: i + 1,
      ty: 4,
      nm: `Confetti ${i}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [100] }, { t: 50, s: [100] }, { t: 60, s: [0] }] },
        p: {
          a: 1,
          k: [
            { t: 0, s: [50 + (i - 4) * 8, 50] },
            { t: 60, s: [50 + (i - 4) * 15, 20 + Math.random() * 30] },
          ],
        },
        s: { a: 0, k: [100, 100] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [180 + Math.random() * 180] }] },
      },
      shapes: [
        {
          ty: "rc",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [6, 3] },
          r: { a: 0, k: 1 },
        },
        {
          ty: "fl",
          c: {
            a: 0,
            k: i % 3 === 0
              ? [0.96, 0.76, 0.08, 1] // Gold
              : i % 3 === 1
              ? [0.3, 0.8, 0.4, 1] // Green
              : [0.78, 0.71, 0.42, 1], // Primary
          },
          o: { a: 0, k: 100 },
        },
      ],
    })),
  ],
};

interface ConfettiAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  loop?: boolean;
  autoplay?: boolean;
}

export function ConfettiAnimation({
  className,
  size = "lg",
  loop = false,
  autoplay = true,
}: ConfettiAnimationProps) {
  return (
    <LottieAnimation
      animationData={confettiAnimationData}
      className={className}
      size={size}
      loop={loop}
      autoplay={autoplay}
    />
  );
}
