"use client";

import { features } from "@/data/landing-data";
import { FeatureCard } from "./feature-card";

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">
              Everything you need to ship
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            Your Indie Hacker Command Center
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Six powerful modules that work together to track your progress,
            celebrate your wins, and keep you shipping.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              iconColor={feature.iconColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
