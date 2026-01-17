"use client";

import { useState } from "react";
import { Rocket, Sparkles } from "lucide-react";
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
        <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-6">
          <Rocket className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">No Projects to Launch</h2>
        <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
          Start building a project to prepare for launch.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header with project selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Launch Hub</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Prepare your product for launch across all platforms.
          </p>
        </div>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="w-[200px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {launchableProjects.map((project) => (
              <SelectItem key={project.id} value={project.id} className="text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-700">
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
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
              <Sparkles className="h-4 w-4 text-primary" />
              Launch Platforms
            </h2>
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
              <div className="flex h-full items-center justify-center rounded-2xl glass border border-dashed border-slate-300 dark:border-slate-600 p-8">
                <p className="text-center text-slate-500 dark:text-slate-400">
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
