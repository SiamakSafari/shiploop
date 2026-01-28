"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PRICING, FEATURES } from "@/lib/pricing";
import { Check, X, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  onSelectPlan?: (plan: "free" | "monthly" | "annual") => void;
  currentPlan?: "free" | "pro";
}

export function PricingCards({ onSelectPlan, currentPlan }: PricingCardProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const annualSavings = Math.round((1 - PRICING.annual / (PRICING.monthly * 12)) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            billingCycle === "monthly"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("annual")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            billingCycle === "annual"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Annual
          <span className="ml-2 text-xs text-green-400">Save {annualSavings}%</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Free */}
        <div className="relative rounded-2xl border border-border bg-card p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="text-sm text-muted-foreground">Get started shipping</p>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted-foreground">/forever</span>
          </div>

          <Button
            variant="outline"
            className="w-full mb-6"
            onClick={() => onSelectPlan?.("free")}
            disabled={currentPlan === "free"}
          >
            {currentPlan === "free" ? "Current Plan" : "Get Started"}
          </Button>

          <ul className="space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature.name} className="flex items-center gap-3 text-sm">
                {feature.free ? (
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <X className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
                <span className={cn(!feature.free && "text-muted-foreground")}>
                  {feature.name}
                  {typeof feature.free === "string" && (
                    <span className="text-muted-foreground"> ({feature.free})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="relative rounded-2xl border-2 border-primary bg-card p-6">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Most Popular
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              Pro
              <Zap className="w-4 h-4 text-yellow-500" />
            </h3>
            <p className="text-sm text-muted-foreground">Ship faster, track everything</p>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold">
              ${billingCycle === "annual" ? Math.round(PRICING.annual / 12) : PRICING.monthly}
            </span>
            <span className="text-muted-foreground">/month</span>
            {billingCycle === "annual" && (
              <p className="text-sm text-muted-foreground">
                ${PRICING.annual} billed annually
              </p>
            )}
          </div>

          <Button
            className="w-full mb-6 bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90"
            onClick={() => onSelectPlan?.(billingCycle)}
            disabled={currentPlan === "pro"}
          >
            {currentPlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
          </Button>

          <ul className="space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature.name} className="flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 text-green-500 shrink-0" />
                <span>
                  {feature.name}
                  {typeof feature.pro === "string" && (
                    <span className="text-muted-foreground"> ({feature.pro})</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
