"use client";

import { ArrowRight, Rocket, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />

      {/* Grid pattern */}
      <div className="absolute inset-0 pattern-grid opacity-10" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-8 animate-bounce-gentle">
          <Flame className="h-8 w-8 text-primary" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
          Your Shipping Streak{" "}
          <span className="text-primary">Starts Now</span>
        </h2>

        {/* Subheadline */}
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
          Join thousands of indie hackers who have transformed their building journey.
          Stop shipping alone. Start shipping with confidence.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#waitlist">
            <Button
              size="lg"
              className="text-lg px-8 py-6 gap-2 animate-glow-pulse-accent relative overflow-hidden group"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <Rocket className="h-5 w-5" />
              <span className="relative z-10">Join the Waitlist</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </a>
        </div>

        {/* Trust text */}
        <p className="mt-6 text-sm text-gray-500">
          Free to join. No credit card required.
        </p>
      </div>
    </section>
  );
}
