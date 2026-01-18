"use client";

import { Plug, Rocket, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: 1,
    title: "Connect",
    description: "Link your GitHub, Stripe, and socials in under 2 minutes. We handle the rest.",
    icon: Plug,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    step: 2,
    title: "Ship",
    description: "Build and launch as you normally would. We auto-track commits, launches, and sales.",
    icon: Rocket,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    step: 3,
    title: "Compete",
    description: "Watch your Ship Score climb. Earn badges, hit streaks, and climb the leaderboard.",
    icon: Trophy,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">
              Simple as 1-2-3
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get up and running in minutes, not hours. Connect your tools and start
            tracking your indie hacker journey immediately.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-primary/30" />

          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative animate-card-enter"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step card */}
              <div className="glass-premium rounded-2xl p-8 text-center hover-lift group">
                {/* Step number */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 relative",
                    item.bgColor,
                    "border",
                    item.borderColor
                  )}
                >
                  <item.icon className={cn("h-8 w-8", item.color)} />

                  {/* Floating step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>

              {/* Arrow connector (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/50 rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Ready to start your journey?{" "}
            <a href="#waitlist" className="text-primary font-medium hover:underline">
              Join the waitlist
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
