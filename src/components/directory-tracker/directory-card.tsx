"use client";

import { ChevronRight, ExternalLink, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DirectorySubmission, DIRECTORIES, SubmissionStatus } from "@/types";
import { Caption, Micro } from "@/components/ui/typography";

interface DirectoryCardProps {
  submission: DirectorySubmission;
  onClick: () => void;
  isSelected: boolean;
}

const statusConfig: Record<
  SubmissionStatus,
  { label: string; color: string; bgColor: string }
> = {
  not_started: {
    label: "Not Started",
    color: "text-gray-500 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-800",
  },
  preparing: {
    label: "Preparing",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/30",
  },
  submitted: {
    label: "Submitted",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
  },
  in_review: {
    label: "In Review",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
  },
  approved: {
    label: "Approved",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
  },
  live: {
    label: "Live",
    color: "text-primary",
    bgColor: "bg-gray-50 dark:bg-gray-900/30",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/30",
  },
};

export function DirectoryCard({
  submission,
  onClick,
  isSelected,
}: DirectoryCardProps) {
  const directoryInfo = DIRECTORIES.find((d) => d.name === submission.directory);
  if (!directoryInfo) return null;

  const status = statusConfig[submission.status];
  const completedCount = submission.requirements.filter((r) => r.completed).length;
  const totalCount = submission.requirements.length;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-xl p-4 transition-all duration-200",
        "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700",
        "border border-gray-200 dark:border-gray-700",
        "hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary border-primary dark:border-primary"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-2xl shadow-sm group-hover:scale-105 transition-transform">
          {directoryInfo.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <Caption className="font-semibold text-gray-900 dark:text-gray-50 truncate">
              {directoryInfo.displayName}
            </Caption>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                status.bgColor,
                status.color
              )}
            >
              {status.label}
            </span>
          </div>

          <Micro className="text-gray-500 dark:text-gray-400 mt-0.5">
            {submission.projectName}
          </Micro>

          {/* Progress bar */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <Micro className="text-gray-400 dark:text-gray-500">
                {completedCount}/{totalCount} requirements
              </Micro>
              {submission.listingUrl && (
                <a
                  href={submission.listingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  submission.status === "live"
                    ? "bg-primary"
                    : submission.status === "rejected"
                    ? "bg-red-500"
                    : "bg-primary"
                )}
                style={{ width: `${submission.progress}%` }}
              />
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-3 mt-2">
            {submission.submittedAt && (
              <Micro className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                <Clock className="h-3 w-3" />
                Submitted {formatRelativeDate(submission.submittedAt)}
              </Micro>
            )}
            {submission.status === "live" && submission.approvedAt && (
              <Micro className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                Live
              </Micro>
            )}
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </button>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}
