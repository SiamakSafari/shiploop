"use client";

import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { useProjectsStore } from "@/stores";
import { getPlatformDisplayName, cn } from "@/lib/utils";
import { LaunchPlatform } from "@/types";

const platformIcons: Record<LaunchPlatform, string> = {
  product_hunt: "🚀",
  indie_hackers: "💡",
  hacker_news: "📰",
  reddit: "🔗",
  twitter: "🐦",
};

export function LaunchStatus() {
  const projects = useProjectsStore((state) => state.projects);

  // Find the project closest to launch (building status with most progress)
  const projectToLaunch = projects
    .filter((p) => p.status === "building")
    .sort((a, b) => {
      const aProgress =
        a.launchPlatforms.reduce((sum, lp) => sum + lp.progress, 0) /
        a.launchPlatforms.length;
      const bProgress =
        b.launchPlatforms.reduce((sum, lp) => sum + lp.progress, 0) /
        b.launchPlatforms.length;
      return bProgress - aProgress;
    })[0];

  if (!projectToLaunch) {
    return (
      <div className="glass hover-lift rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="flex items-center gap-2 text-base font-semibold text-white">
            <Rocket className="h-4 w-4 text-orange-400" />
            Launch Status
          </h3>
        </div>
        <div className="p-4">
          <div className="py-4 text-center">
            <p className="text-sm text-white/50 mb-2">No projects ready for launch.</p>
            <Link
              href="/projects"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Start building
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const overallProgress =
    projectToLaunch.launchPlatforms.reduce((sum, lp) => sum + lp.progress, 0) /
    projectToLaunch.launchPlatforms.length;

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <Rocket className="h-5 w-5 text-orange-400 animate-bounce-gentle" />
          🚀 Launch Status
        </h3>
        <Link
          href="/launch-hub"
          className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors group"
        >
          Open Hub <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-white">{projectToLaunch.name}</span>
            <span className="text-gradient font-medium">
              {Math.round(overallProgress)}% ready
            </span>
          </div>
          {/* Custom progress bar */}
          <div className="relative h-2.5 overflow-hidden rounded-full bg-white/10 border border-white/5">
            <div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 blur-sm opacity-50"
              style={{ width: `${overallProgress}%` }}
            />
            <div
              className="relative h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 transition-all duration-700 rounded-full overflow-hidden"
              style={{ width: `${overallProgress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {projectToLaunch.launchPlatforms.slice(0, 4).map((lp) => (
            <div
              key={lp.platform}
              className="flex items-center gap-2 text-sm rounded-lg bg-white/5 p-2 hover:bg-white/10 transition-colors"
            >
              <span className="text-lg">{platformIcons[lp.platform]}</span>
              <span className="flex-1 text-white/60">
                {getPlatformDisplayName(lp.platform)}
              </span>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  lp.progress >= 100
                    ? "bg-emerald-500/20 text-emerald-400"
                    : lp.progress > 0
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-white/10 text-white/40"
                )}
              >
                {lp.progress}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
