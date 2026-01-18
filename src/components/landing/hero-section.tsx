"use client";

import { ArrowRight, Play, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShipScorePreview } from "./ship-score-preview";
import { stats } from "@/data/landing-data";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">
                The Indie Hacker Operating System
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground mb-6 animate-slide-up">
              Stop Building in the Dark.{" "}
              <span className="text-primary">Ship with Confidence.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up stagger-1">
              The operating system that turns your indie hacker journey into a game.
              Track your Ship Score, compete on the leaderboard, and never lose momentum.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-slide-up stagger-2">
              <a href="#waitlist">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-base">
                  Join the Waitlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base">
                  <Play className="h-4 w-4" />
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground animate-fade-in stagger-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  <strong className="text-foreground">{stats.indieHackers.toLocaleString()}+</strong> indie hackers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>
                  <strong className="text-foreground">${(stats.mrrTracked / 1000000).toFixed(1)}M+</strong> MRR tracked
                </span>
              </div>
            </div>
          </div>

          {/* Right column - Ship Score preview */}
          <div className="relative lg:pl-8">
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

            <div className="relative">
              <ShipScorePreview />

              {/* Mini floating cards */}
              <div className="absolute -top-4 -left-4 glass-premium rounded-lg p-3 animate-bounce-gentle shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-sm">+$</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">New Sale!</p>
                    <p className="text-xs text-muted-foreground">$49 MRR</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 glass-premium rounded-lg p-3 animate-bounce-gentle shadow-lg" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">Streak!</p>
                    <p className="text-xs text-muted-foreground">47 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
