"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "gold" | "purple" | "blue" | "green";
  delay?: number;
  duration?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-96 h-96",
};

const colorClasses = {
  gold: "bg-gradient-to-br from-amber-400/20 to-yellow-600/10",
  purple: "bg-gradient-to-br from-purple-400/20 to-pink-600/10",
  blue: "bg-gradient-to-br from-blue-400/20 to-cyan-600/10",
  green: "bg-gradient-to-br from-emerald-400/20 to-teal-600/10",
};

export function FloatingOrb({
  className,
  size = "md",
  color = "gold",
  delay = 0,
  duration = 8,
  position,
}: FloatingOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full blur-3xl opacity-50 animate-float pointer-events-none",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        ...position,
      }}
    />
  );
}

interface AnimatedBackgroundProps {
  variant?: "default" | "minimal" | "vibrant";
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedBackground({
  variant = "default",
  className,
  children,
}: AnimatedBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Gradient mesh background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-background" />

        {/* Gradient orbs */}
        {variant !== "minimal" && (
          <>
            <FloatingOrb
              size="xl"
              color="gold"
              position={{ top: "-10%", right: "-5%" }}
              delay={0}
              duration={10}
            />
            <FloatingOrb
              size="lg"
              color="gold"
              position={{ bottom: "10%", left: "-10%" }}
              delay={2}
              duration={12}
            />
            {variant === "vibrant" && (
              <>
                <FloatingOrb
                  size="md"
                  color="purple"
                  position={{ top: "40%", right: "10%" }}
                  delay={4}
                  duration={8}
                />
                <FloatingOrb
                  size="sm"
                  color="blue"
                  position={{ bottom: "30%", left: "20%" }}
                  delay={1}
                  duration={9}
                />
              </>
            )}
          </>
        )}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_70%)]" />
      </div>

      {children}
    </div>
  );
}

// Cursor spotlight effect hook
export function useSpotlight(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      element.style.setProperty("--mouse-x", `${x}%`);
      element.style.setProperty("--mouse-y", `${y}%`);
    };

    element.addEventListener("mousemove", handleMouseMove);
    return () => element.removeEventListener("mousemove", handleMouseMove);
  }, [ref]);
}

// Spotlight card wrapper
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  useSpotlight(cardRef);

  return (
    <div
      ref={cardRef}
      className={cn(
        "spotlight relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-primary/30 hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

// Floating particles component
export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/40 particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Gradient text component
export function GradientText({
  children,
  className,
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-primary via-amber-500 to-primary bg-[length:200%_auto]",
        animate && "animate-gradient-shift",
        className
      )}
    >
      {children}
    </span>
  );
}

// Glow effect wrapper
export function GlowWrapper({
  children,
  className,
  color = "gold",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "gold" | "blue" | "green" | "purple";
}) {
  const glowColors = {
    gold: "shadow-[0_0_60px_-15px_rgba(201,166,107,0.5)]",
    blue: "shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)]",
    green: "shadow-[0_0_60px_-15px_rgba(34,197,94,0.5)]",
    purple: "shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)]",
  };

  return (
    <div className={cn("relative", glowColors[color], className)}>
      {children}
    </div>
  );
}
