"use client";

import { useState } from "react";
import { Plus, FolderKanban, Lightbulb, Target } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatBox } from "@/components/ui/stat-box";
import { ProjectCard } from "@/components/projects";
import { IdeaInput, IdeaCard, ValidationScores } from "@/components/ideas";
import { GoalCard, GoalDetail } from "@/components/goals";
import { useProjectsStore, useIdeasStore, useGoalsStore } from "@/stores";
import { cn } from "@/lib/utils";

const projectStatusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "live", label: "Live" },
  { value: "building", label: "Building" },
  { value: "validating", label: "Validating" },
  { value: "paused", label: "Paused" },
];

const goalStatusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "on_track", label: "On Track" },
  { value: "at_risk", label: "At Risk" },
  { value: "completed", label: "Completed" },
];

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState("projects");

  // Projects store
  const { projects, deleteProject, updateProject } = useProjectsStore();
  const [projectFilter, setProjectFilter] = useState("all");

  // Ideas store
  const {
    ideas,
    selectedIdeaId,
    addIdea,
    deleteIdea,
    validateIdea,
    selectIdea,
  } = useIdeasStore();

  // Goals store
  const {
    goals,
    selectedGoalId,
    selectGoal,
    completeMilestone,
  } = useGoalsStore();
  const [goalFilter, setGoalFilter] = useState("all");

  const selectedIdea = ideas.find((idea) => idea.id === selectedIdeaId);
  const selectedGoal = goals.find((g) => g.id === selectedGoalId);

  // Filter projects
  const filteredProjects =
    projectFilter === "all"
      ? projects
      : projects.filter((p) => p.status === projectFilter);

  // Filter goals
  const filteredGoals = goalFilter === "all"
    ? goals
    : goals.filter((g) => g.status === goalFilter);

  const handlePause = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      updateProject(id, {
        status: project.status === "paused" ? "building" : "paused",
      });
    }
  };

  const handleIdeaSubmit = (title: string, description: string) => {
    addIdea({
      title,
      description,
      scores: { demand: 0, competition: 0, feasibility: 0, overall: 0 },
      status: "pending",
    });
  };

  const handleConvert = (ideaId: string) => {
    alert("This would create a new project from the idea!");
  };

  // Goal stats
  const goalStats = {
    total: goals.length,
    onTrack: goals.filter((g) => g.status === "on_track").length,
    atRisk: goals.filter((g) => g.status === "at_risk").length,
    completed: goals.filter((g) => g.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects, ideas, and goals in one place.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Section tabs */}
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger
            value="projects"
            className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm gap-2"
          >
            <FolderKanban className="h-4 w-4" />
            Active Projects
          </TabsTrigger>
          <TabsTrigger
            value="ideas"
            className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Ideas Pipeline
          </TabsTrigger>
          <TabsTrigger
            value="goals"
            className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm gap-2"
          >
            <Target className="h-4 w-4" />
            Goals
          </TabsTrigger>
        </TabsList>

        {/* Active Projects Section */}
        <TabsContent value="projects" className="space-y-6 mt-6">
          {/* Status filters */}
          <Tabs value={projectFilter} onValueChange={setProjectFilter}>
            <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {projectStatusFilters.map((status) => (
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

          {/* Projects grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-card-enter"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard
                    project={project}
                    onDelete={deleteProject}
                    onPause={handlePause}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-gray-100 dark:bg-gray-900/30 p-4 animate-bounce-gentle">
                  <FolderKanban className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">No Projects Found</h3>
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                  {projectFilter === "all"
                    ? "You don't have any projects yet. Create your first one!"
                    : `No projects with status "${projectFilter}".`}
                </p>
                <button className="mt-4 flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-white shadow-md active:scale-[0.97]">
                  <Plus className="h-4 w-4" />
                  Create Project
                </button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* Ideas Pipeline Section */}
        <TabsContent value="ideas" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left column - Input and cards */}
            <div className="space-y-6 lg:col-span-2">
              {/* Idea input */}
              <IdeaInput onSubmit={handleIdeaSubmit} />

              {/* Ideas list */}
              <div className="space-y-4">
                <h2 className="text-lg font-display font-medium text-foreground">
                  Your Ideas ({ideas.length})
                </h2>
                {ideas.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {ideas.map((idea) => (
                      <IdeaCard
                        key={idea.id}
                        idea={idea}
                        onDelete={deleteIdea}
                        onRevalidate={validateIdea}
                        onConvert={handleConvert}
                        isSelected={selectedIdeaId === idea.id}
                        onSelect={selectIdea}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="glass rounded-2xl">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-2xl bg-amber-100 dark:bg-amber-900/30 p-4 animate-bounce-gentle">
                        <Lightbulb className="h-12 w-12 text-amber-500" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">No Ideas Yet</h3>
                      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        Enter an idea above to get started with validation.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Selected idea details */}
            <div>
              {selectedIdea ? (
                <div className="glass hover-lift sticky top-20 rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">{selectedIdea.title}</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedIdea.description}
                    </p>
                    <ValidationScores scores={selectedIdea.scores} />
                    {selectedIdea.notes && (
                      <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                          Notes
                        </p>
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{selectedIdea.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="glass rounded-2xl">
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Select an idea to view detailed validation scores
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Goals Section */}
        <TabsContent value="goals" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="Total Goals" value={goalStats.total} variant="default" staggerIndex={1} />
            <StatBox label="On Track" value={goalStats.onTrack} variant="success" staggerIndex={2} />
            <StatBox label="At Risk" value={goalStats.atRisk} variant="warning" staggerIndex={3} />
            <StatBox label="Completed" value={goalStats.completed} color="text-primary" staggerIndex={4} />
          </div>

          {/* Goal filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={goalFilter} onValueChange={setGoalFilter}>
              <TabsList className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {goalStatusFilters.map((status) => (
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
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          </div>

          {/* Goals content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Goals list */}
            <div className="space-y-4">
              <h2 className="text-lg font-display font-medium text-foreground">
                Goals ({filteredGoals.length})
              </h2>
              {filteredGoals.length > 0 ? (
                <div className="space-y-3">
                  {filteredGoals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onClick={() => selectGoal(goal.id)}
                      isSelected={selectedGoalId === goal.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass rounded-2xl">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-2xl bg-gray-100 dark:bg-gray-900/30 p-4 animate-bounce-gentle">
                      <Target className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
                      No Goals Found
                    </h3>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                      {goalFilter === "all"
                        ? "Start setting SMART goals for your projects!"
                        : `No goals with status "${goalFilter}".`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Detail panel */}
            <div>
              {selectedGoal ? (
                <GoalDetail
                  goal={selectedGoal}
                  onCompleteMilestone={(milestoneId) =>
                    completeMilestone(selectedGoal.id, milestoneId)
                  }
                />
              ) : (
                <div className="glass rounded-2xl">
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Select a goal to view details, milestones, and check-ins
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
