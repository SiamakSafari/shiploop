"use client";

import { useState } from "react";
import { MessageSquare, Plus, Sparkles, Filter } from "lucide-react";
import { FeedbackCard, FeedbackDetail } from "@/components/feedback";
import { useFeedbackStore } from "@/stores";
import { FeedbackStatus, FeedbackSource, SOURCE_CONFIG, SENTIMENT_CONFIG } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const statusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "actionable", label: "Actionable" },
  { value: "reviewed", label: "Reviewed" },
  { value: "resolved", label: "Resolved" },
];

export default function FeedbackPage() {
  const {
    feedbacks,
    selectedFeedbackId,
    selectFeedback,
    updateStatus,
    categorize,
    setNotes,
    deleteFeedback,
  } = useFeedbackStore();

  const [filter, setFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const selectedFeedback = feedbacks.find((f) => f.id === selectedFeedbackId);

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter((f) => {
    const statusMatch = filter === "all" || f.status === filter;
    const sourceMatch = sourceFilter === "all" || f.source === sourceFilter;
    return statusMatch && sourceMatch;
  });

  // Stats
  const stats = {
    total: feedbacks.length,
    positiveRate: feedbacks.length > 0
      ? Math.round((feedbacks.filter((f) => f.sentiment === "positive").length / feedbacks.length) * 100)
      : 0,
    featureRequests: feedbacks.filter((f) => f.category === "feature_request").length,
    bugs: feedbacks.filter((f) => f.category === "bug_report").length,
  };

  const sources: FeedbackSource[] = ["email", "twitter", "chat", "survey", "review", "support"];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Customer Feedback
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Aggregate and categorize feedback from all sources.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
          <Plus className="h-4 w-4" />
          Add Feedback
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Total" value={stats.total.toString()} color="text-slate-900 dark:text-slate-50" />
        <StatBox label="Positive" value={`${stats.positiveRate}%`} color="text-emerald-600 dark:text-emerald-400" />
        <StatBox label="Feature Requests" value={stats.featureRequests.toString()} color="text-blue-600 dark:text-blue-400" />
        <StatBox label="Bug Reports" value={stats.bugs.toString()} color="text-red-600 dark:text-red-400" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Tabs value={filter} onValueChange={setFilter} className="flex-1">
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

        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[180px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="all" className="text-slate-900 dark:text-slate-50">
              All Sources
            </SelectItem>
            {sources.map((source) => (
              <SelectItem
                key={source}
                value={source}
                className="text-slate-900 dark:text-slate-50"
              >
                <span className="flex items-center gap-2">
                  <span>{SOURCE_CONFIG[source].icon}</span>
                  <span>{SOURCE_CONFIG[source].label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Feedback list */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Feedback ({filteredFeedbacks.length})
          </h2>
          {filteredFeedbacks.length > 0 ? (
            <div className="space-y-3">
              {filteredFeedbacks.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  onClick={() => selectFeedback(feedback.id)}
                  isSelected={selectedFeedbackId === feedback.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-4">
                  <MessageSquare className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  No Feedback Found
                </h3>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                  Start collecting customer feedback!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedFeedback ? (
            <FeedbackDetail
              feedback={selectedFeedback}
              onUpdateStatus={(status) => updateStatus(selectedFeedback.id, status)}
              onCategorize={(category) => categorize(selectedFeedback.id, category)}
              onSetNotes={(notes) => setNotes(selectedFeedback.id, notes)}
              onDelete={() => {
                deleteFeedback(selectedFeedback.id);
                selectFeedback(null);
              }}
            />
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select feedback to view details and take action
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
  value: string;
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
