"use client";

import { useState } from "react";
import { Rocket } from "lucide-react";
import {
  CountdownTimer,
  PlatformCard,
  PlatformChecklist,
} from "@/components/launch-hub";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectsStore } from "@/stores";
import { LaunchPlatform } from "@/types";

export default function LaunchHubPage() {
  const { projects, updateChecklistItem } = useProjectsStore();

  // Filter to projects that are building or validating
  const launchableProjects = projects.filter(
    (p) => p.status === "building" || p.status === "validating"
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    launchableProjects[0]?.id || ""
  );
  const [selectedPlatform, setSelectedPlatform] = useState<LaunchPlatform | null>(
    null
  );

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // Calculate launch date (e.g., 7 days from now for demo)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 7);

  const handleToggleItem = (platform: LaunchPlatform, itemId: string) => {
    if (selectedProjectId) {
      updateChecklistItem(selectedProjectId, platform, itemId);
    }
  };

  if (launchableProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Rocket className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">No Projects to Launch</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Start building a project to prepare for launch.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header with project selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Launch Hub</h1>
          <p className="text-muted-foreground">
            Prepare your product for launch across all platforms.
          </p>
        </div>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {launchableProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Countdown */}
      {selectedProject && (
        <CountdownTimer
          targetDate={launchDate}
          projectName={selectedProject.name}
        />
      )}

      {/* Platform cards and checklist */}
      {selectedProject && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Platform list */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Launch Platforms</h2>
            {selectedProject.launchPlatforms.map((platform) => (
              <PlatformCard
                key={platform.platform}
                platform={platform}
                onClick={() => setSelectedPlatform(platform.platform)}
                isSelected={selectedPlatform === platform.platform}
              />
            ))}
          </div>

          {/* Selected platform checklist */}
          <div>
            {selectedPlatform ? (
              <PlatformChecklist
                platform={
                  selectedProject.launchPlatforms.find(
                    (p) => p.platform === selectedPlatform
                  )!
                }
                onToggleItem={(itemId) =>
                  handleToggleItem(selectedPlatform, itemId)
                }
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-8">
                <p className="text-center text-muted-foreground">
                  Select a platform to view its checklist
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
