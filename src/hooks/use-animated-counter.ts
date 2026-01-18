"use client";

import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterOptions {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

// Easing functions
const easings = {
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  linear: (t: number) => t,
};

export function useAnimatedCounter(
  targetValue: number,
  options: UseAnimatedCounterOptions = {}
) {
  const {
    duration = 1000,
    delay = 0,
    easing = easings.easeOut,
    decimals = 0,
    prefix = "",
    suffix = "",
  } = options;

  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only animate on first render or when target changes
    if (hasAnimated.current && previousValue.current === targetValue) {
      return;
    }

    const startValue = previousValue.current;
    const startTime = performance.now() + delay;

    const animate = (currentTime: number) => {
      if (currentTime < startTime) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const currentValue = startValue + (targetValue - startValue) * easedProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        setIsAnimating(true);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setDisplayValue(targetValue);
        previousValue.current = targetValue;
        hasAnimated.current = true;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, delay, easing]);

  const formattedValue = `${prefix}${displayValue.toFixed(decimals)}${suffix}`;
  const rawValue = Number(displayValue.toFixed(decimals));

  return {
    value: rawValue,
    formattedValue,
    isAnimating,
    displayValue,
  };
}

// Hook for formatting currency with animation
export function useAnimatedCurrency(value: number, options?: Omit<UseAnimatedCounterOptions, 'prefix' | 'decimals'>) {
  return useAnimatedCounter(value, {
    ...options,
    prefix: "$",
    decimals: 0,
  });
}

// Hook for formatting percentages with animation
export function useAnimatedPercent(value: number, options?: Omit<UseAnimatedCounterOptions, 'suffix' | 'decimals'>) {
  return useAnimatedCounter(value, {
    ...options,
    suffix: "%",
    decimals: 1,
  });
}

export { easings };
