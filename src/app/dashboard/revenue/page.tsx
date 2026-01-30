"use client";

import { useState } from "react";
import { DollarSign, Users, TrendingUp, BarChart3, FlaskConical, Plus, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/dashboard";
import {
  RevenueChart,
  RevenueBreakdown,
  TrafficSources,
  AttributionCard,
} from "@/components/analytics";
import { HealthScoreCard, FinancialDetail } from "@/components/financial";
import { ExperimentCard, ExperimentDetail } from "@/components/pricing";
import { useFinancialStore, useProjectsStore, usePricingStore } from "@/stores";
import { mockAnalytics } from "@/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function RevenuePage() {
  const { revenue, traffic, overview } = mockAnalytics;

  // Financial store
  const {
    healthRecords,
    selectedRecordId,
    selectRecord,
    addRecord,
  } = useFinancialStore();
  const { projects } = useProjectsStore();

  // Pricing store
  const {
    experiments,
    selectedExperimentId,
    selectExperiment,
    startExperiment,
    pauseExperiment,
    declareWinner,
    deleteExperiment,
  } = usePricingStore();

  const [financialOpen, setFinancialOpen] = useState(true);
  const [pricingOpen, setPricingOpen] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newRecordProject, setNewRecordProject] = useState<string>("");
  const [experimentFilter, setExperimentFilter] = useState("all");

  const selectedRecord = healthRecords.find((r) => r.id === selectedRecordId);
  const selectedExperiment = experiments.find((e) => e.id === selectedExperimentId);

  // Calculate stats
  const avgHealth = healthRecords.length > 0
    ? Math.round(healthRecords.reduce((sum, r) => sum + r.healthScore, 0) / healthRecords.length)
    : 0;
  const avgRunway = healthRecords.length > 0
    ? Math.round(healthRecords.filter(r => r.runway < 999).reduce((sum, r) => sum + r.runway, 0) / healthRecords.filter(r => r.runway < 999).length) || 0
    : 0;

  // Filter experiments
  const filteredExperiments = experimentFilter === "all"
    ? experiments
    : experiments.filter((e) => {
        if (experimentFilter === "completed") {
          return e.status === "completed" || e.status === "winner_declared";
        }
        return e.status === experimentFilter;
      });

  // Get projects not yet added
  const getAvailableProjects = () => {
    const usedProjectIds = healthRecords.map((r) => r.projectId);
    return projects.filter((p) => !usedProjectIds.includes(p.id));
  };

  const handleAddRecord = () => {
    if (!newRecordProject) return;
    const project = projects.find((p) => p.id === newRecordProject);
    if (!project) return;

    addRecord(newRecordProject, project.name);
    setAddDialogOpen(false);
    setNewRecordProject("");
    toast.success("Project Added", {
      description: `Now tracking financial health for ${project.name}`,
    });
  };

  const handleStartExperiment = (experimentId: string) => {
    startExperiment(experimentId);
    toast.success("Experiment Started", {
      description: "Your pricing experiment is now live",
    });
  };

  const handlePauseExperiment = (experimentId: string) => {
    pauseExperiment(experimentId);
    toast("Experiment Paused", {
      description: "You can resume this experiment anytime",
    });
  };

  const handleDeclareWinner = (experimentId: string, variantId: string) => {
    declareWinner(experimentId, variantId);
    toast.success("Winner Declared!", {
      description: "The winning variant has been selected",
    });
  };

  const handleDeleteExperiment = (experimentId: string) => {
    deleteExperiment(experimentId);
    selectExperiment(null);
    toast("Experiment Deleted", {
      description: "The experiment has been removed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Revenue</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Track your revenue, financial health, and pricing experiments.
        </p>
      </div>

      {/* Section A: Overview stats */}
      <div className="bento-grid">
        <StatCard
          title="Total MRR"
          value={overview.totalMRR}
          icon={DollarSign}
          format="currency"
          trend={overview.avgGrowth}
          accentColor="dark"
        />
        <StatCard
          title="Growth Rate"
          value={overview.avgGrowth}
          icon={TrendingUp}
          format="percent"
          trend={2.1}
          accentColor="gray1"
        />
        <StatCard
          title="Avg Runway"
          value={avgRunway}
          icon={BarChart3}
          format="number"
          trend={0}
          accentColor="dark"
        />
        <StatCard
          title="Health Score"
          value={avgHealth}
          icon={Users}
          format="number"
          trend={5}
          accentColor="gray2"
        />
      </div>

      {/* Section B: Revenue Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={revenue.timeline} />
        <RevenueBreakdown data={revenue.byProduct} />
      </div>

      {/* Traffic and attribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficSources sources={traffic.sources} />
        </div>
        <AttributionCard sources={traffic.sources} />
      </div>

      {/* Section C: Financial Health (Expandable) */}
      <div className="glass rounded-2xl overflow-hidden">
        <div
          className="w-full flex items-center justify-between p-4 border-b border-border hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
        >
          <button
            onClick={() => setFinancialOpen(!financialOpen)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50 bg-transparent border-none cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            Financial Health
            {financialOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500 ml-2" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <button
                  className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
                >
                  <Plus className="h-3 w-3" />
                  Add Project
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-gray-900 border-border">
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-gray-50">
                    Track Project Financials
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Project
                    </label>
                    <Select
                      value={newRecordProject}
                      onValueChange={setNewRecordProject}
                    >
                      <SelectTrigger className="border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-border">
                        {getAvailableProjects().map((project) => (
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
                  <button
                    onClick={handleAddRecord}
                    disabled={!newRecordProject}
                    className="w-full rounded-xl bg-primary px-4 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Tracking
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {financialOpen && (
          <div className="p-4">
            {healthRecords.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-[1fr_2fr] items-start">
                <div className="space-y-3">
                  {healthRecords.map((record) => (
                    <HealthScoreCard
                      key={record.id}
                      health={record}
                      onClick={() => selectRecord(record.id)}
                      isSelected={selectedRecordId === record.id}
                    />
                  ))}
                </div>
                <div>
                  {selectedRecord ? (
                    <FinancialDetail health={selectedRecord} />
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-8">
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Select a project to view financial details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  No projects tracked yet. Add a project to start monitoring financial health.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Section D: Pricing Experiments (Expandable) */}
      <div className="glass rounded-2xl overflow-hidden">
        <div
          className="w-full flex items-center justify-between p-4 border-b border-border hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
        >
          <button
            onClick={() => setPricingOpen(!pricingOpen)}
            className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50 bg-transparent border-none cursor-pointer"
          >
            <FlaskConical className="h-4 w-4 text-primary" />
            Pricing Experiments
            {pricingOpen ? (
              <ChevronUp className="h-5 w-5 text-gray-500 ml-2" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 ml-2" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90"
            >
              <Plus className="h-3 w-3" />
              New Experiment
            </button>
          </div>
        </div>
        {pricingOpen && (
          <div className="p-4 space-y-4">
            {/* Experiment filters */}
            <Tabs value={experimentFilter} onValueChange={setExperimentFilter}>
              <TabsList className="bg-gray-100 dark:bg-gray-800 border border-border">
                <TabsTrigger value="all" className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50">All</TabsTrigger>
                <TabsTrigger value="running" className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50">Running</TabsTrigger>
                <TabsTrigger value="draft" className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50">Draft</TabsTrigger>
                <TabsTrigger value="completed" className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            {filteredExperiments.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-[1fr_2fr] items-start">
                <div className="space-y-3">
                  {filteredExperiments.map((experiment) => (
                    <ExperimentCard
                      key={experiment.id}
                      experiment={experiment}
                      onClick={() => selectExperiment(experiment.id)}
                      isSelected={selectedExperimentId === experiment.id}
                    />
                  ))}
                </div>
                <div>
                  {selectedExperiment ? (
                    <ExperimentDetail
                      experiment={selectedExperiment}
                      onStart={() => handleStartExperiment(selectedExperiment.id)}
                      onPause={() => handlePauseExperiment(selectedExperiment.id)}
                      onDeclareWinner={(variantId) => handleDeclareWinner(selectedExperiment.id, variantId)}
                      onDelete={() => handleDeleteExperiment(selectedExperiment.id)}
                    />
                  ) : (
                    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-8">
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Select an experiment to view details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  No experiments found. Start your first pricing experiment!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
