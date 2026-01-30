"use client";

import { useState, useEffect } from "react";
import { X, Info, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoBannerProps {
  className?: string;
}

export function DemoBanner({ className }: DemoBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if dev bypass is enabled
    const devBypass = process.env.NEXT_PUBLIC_DEV_BYPASS === "true";
    setIsDevMode(devBypass);

    // Check if banner was previously dismissed this session
    const dismissed = sessionStorage.getItem("demo-banner-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem("demo-banner-dismissed", "true");
  };

  if (!isDevMode || isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-4 px-4 py-2.5",
        "bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10",
        "border-b border-amber-500/20",
        "animate-fade-in",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20">
          <Info className="h-3.5 w-3.5 text-amber-500" />
        </div>
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <span className="font-semibold">Demo Mode</span>
          <span className="mx-2 text-amber-500/50">|</span>
          <span className="text-amber-600 dark:text-amber-400">
            You&apos;re viewing ShipLoop with sample data. Sign up to track your real projects!
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="/"
          className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-500/30"
        >
          <ExternalLink className="h-3 w-3" />
          Join Waitlist
        </a>
        <button
          onClick={handleDismiss}
          className="flex h-6 w-6 items-center justify-center rounded-full text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-500/20"
          aria-label="Dismiss demo banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
