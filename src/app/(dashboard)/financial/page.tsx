"use client";

import { useState } from "react";
import { DollarSign, Plus, Sparkles } from "lucide-react";
import { HealthScoreCard, FinancialDetail } from "@/components/financial";
import { useFinancialStore, useProjectsStore } from "@/stores";
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

export default function FinancialPage() {
  const {
    healthRecords,
    selectedRecordId,
    selectRecord,
    addRecord,
  } = useFinancialStore();

  const { projects } = useProjectsStore();
  const [filter, setFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newRecordProject, setNewRecordProject] = useState<string>("");

  const selectedRecord = healthRecords.find((r) => r.id === selectedRecordId);

  // Filter records
  const filteredRecords = filter === "all"
    ? healthRecords
    : healthRecords.filter((r) => {
        if (filter === "healthy") return r.healthScore >= 70;
        if (filter === "attention") return r.healthScore < 70 && r.healthScore >= 40;
        if (filter === "critical") return r.healthScore < 40;
        return true;
      });

  // Stats
  const stats = {
    avgHealth: healthRecords.length > 0
      ? Math.round(healthRecords.reduce((sum, r) => sum + r.healthScore, 0) / healthRecords.length)
      : 0,
    totalMrr: healthRecords.reduce((sum, r) => sum + r.mrr, 0),
    avgRunway: healthRecords.length > 0
      ? Math.round(healthRecords.filter(r => r.runway < 999).reduce((sum, r) => sum + r.runway, 0) / healthRecords.filter(r => r.runway < 999).length) || 0
      : 0,
    avgGrowth: healthRecords.length > 0
      ? (healthRecords.reduce((sum, r) => sum + r.growthRate, 0) / healthRecords.length).toFixed(1)
      : 0,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

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
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Financial Health
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Track runway, MRR, and financial health across your projects.
          </p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-900 dark:text-slate-50">
                Track Project Financials
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Project
                </label>
                <Select
                  value={newRecordProject}
                  onValueChange={setNewRecordProject}
                >
                  <SelectTrigger className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    {getAvailableProjects().map((project) => (
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

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Avg Health" value={stats.avgHealth.toString()} color="text-primary" suffix="/100" />
        <StatBox label="Total MRR" value={formatCurrency(stats.totalMrr)} color="text-emerald-600 dark:text-emerald-400" />
        <StatBox label="Avg Runway" value={stats.avgRunway.toString()} color="text-blue-600 dark:text-blue-400" suffix=" mo" />
        <StatBox label="Avg Growth" value={`${stats.avgGrowth}%`} color="text-purple-600 dark:text-purple-400" />
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <TabsTrigger
            value="all"
            className="text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="healthy"
            className="text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Healthy
          </TabsTrigger>
          <TabsTrigger
            value="attention"
            className="text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Needs Attention
          </TabsTrigger>
          <TabsTrigger
            value="critical"
            className="text-slate-500 dark:text-slate-400 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm"
          >
            Critical
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Records list */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Projects ({filteredRecords.length})
          </h2>
          {filteredRecords.length > 0 ? (
            <div className="space-y-3">
              {filteredRecords.map((record) => (
                <HealthScoreCard
                  key={record.id}
                  health={record}
                  onClick={() => selectRecord(record.id)}
                  isSelected={selectedRecordId === record.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-4">
                  <DollarSign className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  No Projects Found
                </h3>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                  Start tracking your financial health!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedRecord ? (
            <FinancialDetail health={selectedRecord} />
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select a project to view financial details
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
  suffix = "",
}: {
  label: string;
  value: string;
  color: string;
  suffix?: string;
}) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className={cn("text-2xl font-bold font-space-grotesk", color)}>
        {value}{suffix}
      </p>
    </div>
  );
}
