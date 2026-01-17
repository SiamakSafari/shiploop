"use client";

import { useState } from "react";
import { Globe, Plus, Sparkles, Filter } from "lucide-react";
import { DirectoryCard, SubmissionDetail } from "@/components/directory-tracker";
import { useDirectoriesStore, useProjectsStore } from "@/stores";
import { DIRECTORIES, DirectoryName, SubmissionStatus } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { cn } from "@/lib/utils";

const statusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "not_started", label: "Not Started" },
  { value: "preparing", label: "Preparing" },
  { value: "submitted", label: "Submitted" },
  { value: "in_review", label: "In Review" },
  { value: "live", label: "Live" },
];

export default function DirectoriesPage() {
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

  const { projects } = useProjectsStore();
  const [filter, setFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newSubmissionProject, setNewSubmissionProject] = useState<string>("");
  const [newSubmissionDirectory, setNewSubmissionDirectory] = useState<DirectoryName | "">("");

  const selectedSubmission = submissions.find((s) => s.id === selectedSubmissionId);

  const filteredSubmissions =
    filter === "all"
      ? submissions
      : submissions.filter((s) => s.status === filter);

  // Group submissions by status for stats
  const stats = {
    total: submissions.length,
    live: submissions.filter((s) => s.status === "live").length,
    inProgress: submissions.filter((s) =>
      ["preparing", "submitted", "in_review"].includes(s.status)
    ).length,
    notStarted: submissions.filter((s) => s.status === "not_started").length,
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
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Directory Tracker
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Track your submissions to startup directories and get discovered.
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
              <Plus className="h-4 w-4" />
              Add Directory
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-slate-50">
                Add Directory Submission
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Project
                </label>
                <Select
                  value={newSubmissionProject}
                  onValueChange={setNewSubmissionProject}
                >
                  <SelectTrigger className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    {projects.map((project) => (
                      <SelectItem
                        key={project.id}
                        value={project.id}
                        className="text-slate-900 dark:text-slate-50"
                      >
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newSubmissionProject && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Directory
                  </label>
                  <Select
                    value={newSubmissionDirectory}
                    onValueChange={(v) => setNewSubmissionDirectory(v as DirectoryName)}
                  >
                    <SelectTrigger className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
                      <SelectValue placeholder="Select a directory" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                      {getAvailableDirectories(newSubmissionProject).map((dir) => (
                        <SelectItem
                          key={dir.name}
                          value={dir.name}
                          className="text-slate-900 dark:text-slate-50"
                        >
                          <span className="flex items-center gap-2">
                            <span>{dir.icon}</span>
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Total" value={stats.total} color="text-slate-900 dark:text-slate-50" />
        <StatBox label="Live" value={stats.live} color="text-primary" />
        <StatBox label="In Progress" value={stats.inProgress} color="text-amber-600 dark:text-amber-400" />
        <StatBox label="Not Started" value={stats.notStarted} color="text-slate-500 dark:text-slate-400" />
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {statusFilters.map((status) => (
            <TabsTrigger
              key={status.value}
              value={status.value}
              className={cn(
                "text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
              )}
            >
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Submissions list */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Submissions ({filteredSubmissions.length})
          </h2>
          {filteredSubmissions.length > 0 ? (
            <div className="space-y-3">
              {filteredSubmissions.map((submission) => (
                <DirectoryCard
                  key={submission.id}
                  submission={submission}
                  onClick={() => selectSubmission(submission.id)}
                  isSelected={selectedSubmissionId === submission.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-4">
                  <Globe className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  No Submissions Found
                </h3>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                  {filter === "all"
                    ? "Start tracking your directory submissions!"
                    : `No submissions with status "${filter}".`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedSubmission ? (
            <SubmissionDetail
              submission={selectedSubmission}
              onToggleRequirement={(reqId) =>
                toggleRequirement(selectedSubmission.id, reqId)
              }
              onUpdateStatus={(status) =>
                updateStatus(selectedSubmission.id, status)
              }
              onSetSubmissionUrl={(url) =>
                setSubmissionUrl(selectedSubmission.id, url)
              }
              onSetListingUrl={(url) =>
                setListingUrl(selectedSubmission.id, url)
              }
              onDelete={() => {
                deleteSubmission(selectedSubmission.id);
                selectSubmission(null);
              }}
            />
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select a submission to view details and track requirements
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className={cn("text-2xl font-bold font-space-grotesk", color)}>
        {value}
      </p>
    </div>
  );
}
