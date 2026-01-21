"use client";

import { LottieAnimation } from "./lottie-animation";

// Inline trophy animation - gold star/medal style
const trophyAnimationData = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "Trophy",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Star",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        p: { a: 0, k: [50, 50] },
        s: { a: 1, k: [{ t: 0, s: [100, 100] }, { t: 15, s: [105, 105] }, { t: 30, s: [100, 100] }, { t: 45, s: [105, 105] }, { t: 60, s: [100, 100] }] },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [10] }] },
      },
      shapes: [
        {
          ty: "sh",
          ks: {
            a: 0,
            k: {
              c: true,
              v: [[0, -25], [6, -8], [24, -8], [10, 3], [15, 20], [0, 10], [-15, 20], [-10, 3], [-24, -8], [-6, -8]],
              i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
              o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
            },
          },
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.96, 0.76, 0.08, 1] }, // Gold color
          o: { a: 0, k: 100 },
        },
      ],
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Glow",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [50] }, { t: 30, s: [80] }, { t: 60, s: [50] }] },
        p: { a: 0, k: [50, 50] },
        s: { a: 1, k: [{ t: 0, s: [120, 120] }, { t: 30, s: [140, 140] }, { t: 60, s: [120, 120] }] },
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [30, 30] },
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.96, 0.76, 0.08, 0.3] },
          o: { a: 0, k: 50 },
        },
      ],
    },
  ],
};

interface TrophyAnimationProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  loop?: boolean;
  autoplay?: boolean;
}

export function TrophyAnimation({
  className,
  size = "md",
  loop = true,
  autoplay = true,
}: TrophyAnimationProps) {
  return (
    <LottieAnimation
      animationData={trophyAnimationData}
      className={className}
      size={size}
      loop={loop}
      autoplay={autoplay}
    />
  );
}
