"use client";

import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { useProjectsStore } from "@/stores";
import { getPlatformDisplayName, cn } from "@/lib/utils";
import { LaunchPlatform } from "@/types";

const platformLabels: Record<LaunchPlatform, string> = {
  product_hunt: "PH",
  indie_hackers: "IH",
  hacker_news: "HN",
  reddit: "RD",
  twitter: "TW",
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
        <div className="p-4 border-b border-gray-200">
          <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Rocket className="h-4 w-4 text-primary" />
            Launch Status
          </h3>
        </div>
        <div className="p-4">
          <div className="py-4 text-center">
            <p className="text-sm text-gray-500 mb-2">No projects ready for launch.</p>
            <Link
              href="/dashboard/projects"
              className="text-sm text-primary hover:text-gray-800 transition-colors"
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
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
          <Rocket className="h-5 w-5 text-primary animate-bounce-gentle" />
          Launch Status
        </h3>
        <Link
          href="/launch-hub"
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 transition-colors group"
        >
          Open Hub <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-900">{projectToLaunch.name}</span>
            <span className="text-primary font-medium">
              {Math.round(overallProgress)}% ready
            </span>
          </div>
          {/* Custom progress bar */}
          <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-200 border border-gray-300">
            <div
              className="relative h-full transition-all duration-700 rounded-full overflow-hidden"
              style={{ width: `${overallProgress}%`, backgroundColor: '#171717' }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {projectToLaunch.launchPlatforms.slice(0, 4).map((lp) => (
            <div
              key={lp.platform}
              className="flex items-center gap-2 text-sm rounded-lg bg-gray-50 p-2 hover:bg-gray-100 hover:scale-[1.01] hover:shadow-sm active:scale-[0.99] transition-all border border-gray-200"
            >
              <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded">{platformLabels[lp.platform]}</span>
              <span className="flex-1 text-gray-600">
                {getPlatformDisplayName(lp.platform)}
              </span>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  lp.progress >= 100
                    ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900"
                    : lp.progress > 0
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
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
