"use client";

import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Rocket className="h-4 w-4" />
            Launch Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-4 text-center text-sm text-muted-foreground">
            No projects ready for launch.
            <br />
            <Link href="/projects" className="text-primary hover:underline">
              Start building
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const overallProgress =
    projectToLaunch.launchPlatforms.reduce((sum, lp) => sum + lp.progress, 0) /
    projectToLaunch.launchPlatforms.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Rocket className="h-4 w-4" />
          Launch Status
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/launch-hub" className="gap-1 text-xs">
            Open Hub <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{projectToLaunch.name}</span>
            <span className="text-muted-foreground">
              {Math.round(overallProgress)}% ready
            </span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="space-y-2">
          {projectToLaunch.launchPlatforms.slice(0, 4).map((lp) => (
            <div key={lp.platform} className="flex items-center gap-2 text-sm">
              <span>{platformIcons[lp.platform]}</span>
              <span className="flex-1 text-muted-foreground">
                {getPlatformDisplayName(lp.platform)}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  lp.progress >= 100
                    ? "text-green-500"
                    : lp.progress > 0
                    ? "text-yellow-500"
                    : "text-muted-foreground"
                )}
              >
                {lp.progress}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
