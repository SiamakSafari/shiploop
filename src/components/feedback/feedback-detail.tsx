"use client";

import { Clock, User, Mail, Tag, MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CustomerFeedback,
  SOURCE_CONFIG,
  SENTIMENT_CONFIG,
  CATEGORY_CONFIG,
  STATUS_CONFIG,
  FeedbackStatus,
  FeedbackCategory,
} from "@/types";
import { Icon } from "@/components/ui/icon";

interface FeedbackDetailProps {
  feedback: CustomerFeedback;
  onUpdateStatus: (status: FeedbackStatus) => void;
  onCategorize: (category: FeedbackCategory) => void;
  onSetNotes: (notes: string) => void;
  onDelete: () => void;
}

export function FeedbackDetail({
  feedback,
  onUpdateStatus,
  onCategorize,
  onSetNotes,
  onDelete,
}: FeedbackDetailProps) {
  const sourceConfig = SOURCE_CONFIG[feedback.source];
  const sentimentConfig = SENTIMENT_CONFIG[feedback.sentiment];
  const categoryConfig = CATEGORY_CONFIG[feedback.category];
  const statusConfig = STATUS_CONFIG[feedback.status];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusOptions: FeedbackStatus[] = ["new", "reviewed", "actionable", "resolved", "archived"];
  const categoryOptions: FeedbackCategory[] = ["feature_request", "bug_report", "praise", "complaint", "question"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
              sentimentConfig.color
            )}>
              {sentimentConfig.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                {feedback.customerName || "Anonymous"}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Icon name={sourceConfig.icon} size={14} />
                  {sourceConfig.label}
                </span>
                <span>from {feedback.projectName}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 mb-4">
          <p className="text-gray-900 dark:text-gray-50 whitespace-pre-wrap">
            {feedback.content}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {feedback.customerEmail && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{feedback.customerEmail}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDate(feedback.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Status & Category */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Status
          </label>
          <select
            value={feedback.status}
            onChange={(e) => onUpdateStatus(e.target.value as FeedbackStatus)}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {STATUS_CONFIG[status].icon} {STATUS_CONFIG[status].label}
              </option>
            ))}
          </select>
        </div>

        <div className="glass rounded-xl p-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Category
          </label>
          <select
            value={feedback.category}
            onChange={(e) => onCategorize(e.target.value as FeedbackCategory)}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_CONFIG[category].icon} {CATEGORY_CONFIG[category].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags */}
      <div className="glass rounded-xl p-4">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
          Tags
        </label>
        <div className="flex gap-2 flex-wrap">
          {feedback.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm text-gray-600 dark:text-gray-400"
            >
              {tag}
            </span>
          ))}
          {feedback.tags.length === 0 && (
            <span className="text-sm text-gray-400 dark:text-gray-500">No tags</span>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="glass rounded-xl p-4">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
          Internal Notes
        </label>
        <textarea
          value={feedback.notes || ""}
          onChange={(e) => onSetNotes(e.target.value)}
          placeholder="Add internal notes..."
          className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
        />
      </div>
    </div>
  );
}
