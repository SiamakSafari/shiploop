"use client";

import { useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/projects";
import { useProjectsStore } from "@/stores";
import { cn } from "@/lib/utils";

const statusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "building", label: "Building" },
  { value: "validating", label: "Validating" },
  { value: "paused", label: "Paused" },
];

export default function ProjectsPage() {
  const { projects, deleteProject, updateProject } = useProjectsStore();
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter);

  const handlePause = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      updateProject(id, {
        status: project.status === "paused" ? "building" : "paused",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-6 w-6 text-purple-400" />
            <h1 className="text-3xl font-bold text-gradient">Projects</h1>
          </div>
          <p className="text-white/60 text-lg">
            Manage all your indie hacker projects in one place.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-105">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="glass border-white/10 bg-white/5">
          {statusFilters.map((status) => (
            <TabsTrigger
              key={status.value}
              value={status.value}
              className={cn(
                "text-white/60 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white"
              )}
            >
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Projects grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={deleteProject}
              onPause={handlePause}
            />
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-2xl bg-purple-500/20 p-4">
              <FolderKanban className="h-12 w-12 text-purple-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">No Projects Found</h3>
            <p className="mt-2 text-center text-sm text-white/50">
              {filter === "all"
                ? "You don't have any projects yet. Create your first one!"
                : `No projects with status "${filter}".`}
            </p>
            <button className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 font-medium text-white shadow-lg shadow-purple-500/25">
              <Plus className="h-4 w-4" />
              Create Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
