"use client";

import { useEffect, useState, useRef } from "react";
import { Users, DollarSign, GitCommit, Flame } from "lucide-react";
import { useAnimatedCounter } from "@/hooks";
import { stats } from "@/data/landing-data";

function AnimatedStat({
  value,
  label,
  icon: Icon,
  prefix = "",
  suffix = "",
  format = "number",
}: {
  value: number;
  label: string;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
  format?: "number" | "currency" | "compact";
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const { value: animatedValue } = useAnimatedCounter(isVisible ? value : 0, {
    duration: 2000,
    delay: 200,
  });

  const formatValue = () => {
    const val = Math.round(animatedValue);
    if (format === "currency") {
      return `${prefix}$${(val / 1000000).toFixed(1)}M${suffix}`;
    }
    if (format === "compact") {
      if (val >= 1000) {
        return `${prefix}${(val / 1000).toFixed(0)}K${suffix}`;
      }
      return `${prefix}${val.toLocaleString()}${suffix}`;
    }
    return `${prefix}${val.toLocaleString()}${suffix}`;
  };

  return (
    <div ref={ref} className="flex items-center gap-3 group">
      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="text-2xl font-bold text-foreground number-display">
          {formatValue()}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export function SocialProofBar() {
  return (
    <section className="relative py-12 bg-muted/30 border-y border-border overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-gradient-shift" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimatedStat
            value={stats.indieHackers}
            label="Indie Hackers"
            icon={Users}
            suffix="+"
          />
          <AnimatedStat
            value={stats.mrrTracked}
            label="MRR Tracked"
            icon={DollarSign}
            format="currency"
            suffix="+"
          />
          <AnimatedStat
            value={stats.commits}
            label="Commits"
            icon={GitCommit}
            format="compact"
            suffix="+"
          />
          <AnimatedStat
            value={stats.bestStreak}
            label="Best Streak"
            icon={Flame}
            suffix=" days"
          />
        </div>
      </div>
    </section>
  );
}
