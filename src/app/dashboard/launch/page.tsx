"use client";

import { useState } from "react";
import {
  Rocket,
  Globe,
  Plus,
  Sparkles,
  Target,
  Cpu,
  Newspaper,
  Bot,
  Brain,
  RefreshCw,
  Cloud,
  Clapperboard,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  CountdownTimer,
  PlatformCard,
  PlatformChecklist,
} from "@/components/launch-hub";
import { DirectoryCard, SubmissionDetail } from "@/components/directory-tracker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectsStore, useDirectoriesStore } from "@/stores";
import { LaunchPlatform, DIRECTORIES, DirectoryName } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  target: Target,
  cpu: Cpu,
  newspaper: Newspaper,
  bot: Bot,
  brain: Brain,
  "refresh-cw": RefreshCw,
  cloud: Cloud,
  clapperboard: Clapperboard,
  "flask-conical": FlaskConical,
};

const statusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "not_started", label: "Not Started" },
  { value: "preparing", label: "Preparing" },
  { value: "submitted", label: "Submitted" },
  { value: "live", label: "Live" },
];

export default function LaunchPage() {
  const { projects, updateChecklistItem } = useProjectsStore();
  const {
    submissions,
    selectedSubmissionId,
    selectSubmission,
    addSubmission,
    deleteSubmission,
    toggleRequirement,
    updateStatus,
    setSubmissionUrl,
    setListingUrl,
  } = useDirectoriesStore();

  // Filter to projects that are building or validating
  const launchableProjects = projects.filter(
    (p) => p.status === "building" || p.status === "validating"
  );

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    launchableProjects[0]?.id || ""
  );
  const [selectedPlatform, setSelectedPlatform] = useState<LaunchPlatform | null>(null);
  const [directoryFilter, setDirectoryFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSubmissionProject, setNewSubmissionProject] = useState<string>("");
  const [newSubmissionDirectory, setNewSubmissionDirectory] = useState<DirectoryName | "">("");

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const selectedSubmission = submissions.find((s) => s.id === selectedSubmissionId);

  // Calculate launch date (e.g., 7 days from now for demo)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 7);

  // Filter submissions
  const filteredSubmissions =
    directoryFilter === "all"
      ? submissions
      : submissions.filter((s) => s.status === directoryFilter);

  // Directory stats
  const directoryStats = {
    total: submissions.length,
    live: submissions.filter((s) => s.status === "live").length,
    inProgress: submissions.filter((s) =>
      ["preparing", "submitted", "in_review"].includes(s.status)
    ).length,
  };

  // Calculate overall readiness
  const calculateReadiness = () => {
    if (!selectedProject) return 0;
    const allItems = selectedProject.launchPlatforms.flatMap((p) => p.checklist);
    const completed = allItems.filter((item) => item.completed).length;
    return allItems.length > 0 ? Math.round((completed / allItems.length) * 100) : 0;
  };

  const handleToggleItem = (platform: LaunchPlatform, itemId: string) => {
    if (selectedProjectId) {
      updateChecklistItem(selectedProjectId, platform, itemId);
      toast.success("Checklist Updated", {
        description: "Your launch progress has been saved",
      });
    }
  };

  // Get directories not yet added for a project
  const getAvailableDirectories = (projectId: string) => {
    const usedDirectories = submissions
      .filter((s) => s.projectId === projectId)
      .map((s) => s.directory);
    return DIRECTORIES.filter((d) => !usedDirectories.includes(d.name));
  };

  const handleAddSubmission = () => {
    if (!newSubmissionProject || !newSubmissionDirectory) return;
    const project = projects.find((p) => p.id === newSubmissionProject);
    if (!project) return;

    addSubmission(newSubmissionProject, project.name, newSubmissionDirectory as DirectoryName);
    setAddDialogOpen(false);
    setNewSubmissionProject("");
    setNewSubmissionDirectory("");
    toast.success("Directory Added", {
      description: `${newSubmissionDirectory} added to your tracker`,
    });
  };

  const handleUpdateStatus = (submissionId: string, status: string) => {
    updateStatus(submissionId, status as "not_started" | "preparing" | "submitted" | "in_review" | "live" | "rejected");
    toast.success("Status Updated", {
      description: `Submission status changed to ${status.replace("_", " ")}`,
    });
  };

  const handleDeleteSubmission = (submissionId: string) => {
    deleteSubmission(submissionId);
    selectSubmission(null);
    toast("Submission Removed", {
      description: "Directory submission has been deleted",
    });
  };

  if (launchableProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="rounded-2xl bg-gray-100 dark:bg-gray-900/30 p-6">
          <Rocket className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-50">No Projects to Launch</h2>
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
          Start building a project to prepare for launch.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header with project selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Launch</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Prepare and track your product launches across all platforms.
          </p>
        </div>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="w-[200px] border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-border">
            {launchableProjects.map((project) => (
              <SelectItem key={project.id} value={project.id} className="text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700">
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Section A: Launch Countdown */}
      {selectedProject && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CountdownTimer
              targetDate={launchDate}
              projectName={selectedProject.name}
            />
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Readiness</h3>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-4xl font-bold text-primary font-space-grotesk">
                {calculateReadiness()}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 mb-1">complete</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${calculateReadiness()}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Section B: Platform Checklists */}
      {selectedProject && (
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Platform Checklists
          </h2>
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] items-start">
            {/* Platform list */}
            <div className="space-y-2">
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
                <div className="flex min-h-[200px] items-center justify-center rounded-2xl glass border border-dashed border-gray-300 dark:border-gray-600 p-8">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Select a platform to view its checklist
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section C: Directory Submissions */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
            <Globe className="h-4 w-4 text-primary" />
            Directory Submissions
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 text-sm">
              <span className="text-gray-500 dark:text-gray-400">{directoryStats.live} Live</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-gray-500 dark:text-gray-400">{directoryStats.inProgress} In Progress</span>
            </div>
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90">
                  <Plus className="h-3 w-3" />
                  Add Directory
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-900 border-border">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-gray-50">
                    Add Directory Submission
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Project
                    </label>
                    <Select
                      value={newSubmissionProject}
                      onValueChange={setNewSubmissionProject}
                    >
                      <SelectTrigger className="border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-border">
                        {projects.map((project) => (
                          <SelectItem
                            key={project.id}
                            value={project.id}
                            className="text-gray-900 dark:text-gray-50"
                          >
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {newSubmissionProject && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Directory
                      </label>
                      <Select
                        value={newSubmissionDirectory}
                        onValueChange={(v) => setNewSubmissionDirectory(v as DirectoryName)}
                      >
                        <SelectTrigger className="border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                          <SelectValue placeholder="Select a directory" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-border">
                          {getAvailableDirectories(newSubmissionProject).map((dir) => (
                            <SelectItem
                              key={dir.name}
                              value={dir.name}
                              className="text-gray-900 dark:text-gray-50"
                            >
                              <span className="flex items-center gap-2">
                                {(() => { const Icon = iconMap[dir.icon]; return Icon ? <Icon className="h-4 w-4 text-primary" /> : <span>{dir.icon}</span>; })()}
                                <span>{dir.displayName}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <button
                    onClick={handleAddSubmission}
                    disabled={!newSubmissionProject || !newSubmissionDirectory}
                    className="w-full rounded-xl bg-primary px-4 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Tracker
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Directory filters */}
        <Tabs value={directoryFilter} onValueChange={setDirectoryFilter}>
          <TabsList className="bg-gray-100 dark:bg-gray-800 border border-border">
            {statusFilters.map((status) => (
              <TabsTrigger
                key={status.value}
                value={status.value}
                className={cn(
                  "text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm"
                )}
              >
                {status.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Directory content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] items-start">
          <div className="space-y-2">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => (
                <DirectoryCard
                  key={submission.id}
                  submission={submission}
                  onClick={() => selectSubmission(submission.id)}
                  isSelected={selectedSubmissionId === submission.id}
                />
              ))
            ) : (
              <div className="glass rounded-2xl">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-2xl bg-gray-100 dark:bg-gray-900/30 p-4">
                    <Globe className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
                    No Submissions Found
                  </h3>
                  <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    Start tracking your directory submissions!
                  </p>
                </div>
              </div>
            )}
          </div>

          <div>
            {selectedSubmission ? (
              <SubmissionDetail
                submission={selectedSubmission}
                onToggleRequirement={(reqId) =>
                  toggleRequirement(selectedSubmission.id, reqId)
                }
                onUpdateStatus={(status) =>
                  handleUpdateStatus(selectedSubmission.id, status)
                }
                onSetSubmissionUrl={(url) =>
                  setSubmissionUrl(selectedSubmission.id, url)
                }
                onSetListingUrl={(url) =>
                  setListingUrl(selectedSubmission.id, url)
                }
                onDelete={() => handleDeleteSubmission(selectedSubmission.id)}
              />
            ) : (
              <div className="glass rounded-2xl">
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Select a submission to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
