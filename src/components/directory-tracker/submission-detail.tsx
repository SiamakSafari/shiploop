"use client";

import {
  ExternalLink,
  Clock,
  CheckCircle2,
  Circle,
  Link as LinkIcon,
  Trash2,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DirectorySubmission,
  DIRECTORIES,
  SubmissionStatus,
} from "@/types";
import { Caption, Micro, Heading } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SubmissionDetailProps {
  submission: DirectorySubmission;
  onToggleRequirement: (requirementId: string) => void;
  onUpdateStatus: (status: SubmissionStatus) => void;
  onSetSubmissionUrl: (url: string) => void;
  onSetListingUrl: (url: string) => void;
  onDelete: () => void;
}

const statusOptions: { value: SubmissionStatus; label: string }[] = [
  { value: "not_started", label: "Not Started" },
  { value: "preparing", label: "Preparing" },
  { value: "submitted", label: "Submitted" },
  { value: "in_review", label: "In Review" },
  { value: "approved", label: "Approved" },
  { value: "live", label: "Live" },
  { value: "rejected", label: "Rejected" },
];

export function SubmissionDetail({
  submission,
  onToggleRequirement,
  onUpdateStatus,
  onSetSubmissionUrl,
  onSetListingUrl,
  onDelete,
}: SubmissionDetailProps) {
  const directoryInfo = DIRECTORIES.find((d) => d.name === submission.directory);
  const [submissionUrl, setSubmissionUrl] = useState(submission.submissionUrl || "");
  const [listingUrl, setListingUrl] = useState(submission.listingUrl || "");

  if (!directoryInfo) return null;

  const requiredItems = submission.requirements.filter((r) => r.required);
  const optionalItems = submission.requirements.filter((r) => !r.required);
  const completedRequired = requiredItems.filter((r) => r.completed).length;

  return (
    <div className="glass hover-lift sticky top-20 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-xl">
            {directoryInfo.icon}
          </div>
          <div className="flex-1">
            <Heading level={4} className="text-gray-900 dark:text-gray-50">
              {directoryInfo.displayName}
            </Heading>
            <Micro className="text-gray-500 dark:text-gray-400">
              {directoryInfo.description}
            </Micro>
          </div>
          <a
            href={directoryInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Status selector */}
        <div className="space-y-2">
          <Caption className="text-gray-600 dark:text-gray-300 font-medium">
            Status
          </Caption>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onUpdateStatus(option.value)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  submission.status === option.value
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Avg. review: {directoryInfo.avgReviewTime}</span>
          </div>
          {submission.submittedAt && (
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Send className="h-4 w-4" />
              <span>Submitted {formatDate(submission.submittedAt)}</span>
            </div>
          )}
        </div>

        {/* Requirements checklist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Caption className="text-gray-600 dark:text-gray-300 font-medium">
              Requirements
            </Caption>
            <Micro className="text-gray-400 dark:text-gray-500">
              {completedRequired}/{requiredItems.length} required done
            </Micro>
          </div>

          <div className="space-y-2">
            {requiredItems.map((req) => (
              <RequirementItem
                key={req.id}
                label={req.label}
                completed={req.completed}
                required={true}
                onToggle={() => onToggleRequirement(req.id)}
              />
            ))}
          </div>

          {optionalItems.length > 0 && (
            <>
              <Micro className="text-gray-400 dark:text-gray-500 pt-2">
                Optional
              </Micro>
              <div className="space-y-2">
                {optionalItems.map((req) => (
                  <RequirementItem
                    key={req.id}
                    label={req.label}
                    completed={req.completed}
                    required={false}
                    onToggle={() => onToggleRequirement(req.id)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* URLs */}
        <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <Caption className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1.5">
              <LinkIcon className="h-3 w-3" />
              Submission URL
            </Caption>
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={submissionUrl}
                onChange={(e) => setSubmissionUrl(e.target.value)}
                className="flex-1 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSetSubmissionUrl(submissionUrl)}
                className="shrink-0"
              >
                Save
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Caption className="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1.5">
              <ExternalLink className="h-3 w-3" />
              Live Listing URL
            </Caption>
            <div className="flex gap-2">
              <Input
                placeholder="https://..."
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                className="flex-1 text-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSetListingUrl(listingUrl)}
                className="shrink-0"
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Delete */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Remove from tracker
          </button>
        </div>
      </div>
    </div>
  );
}

function RequirementItem({
  label,
  completed,
  required,
  onToggle,
}: {
  label: string;
  completed: boolean;
  required: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-3 rounded-lg p-2.5 text-left transition-all",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        completed && "bg-gray-50 dark:bg-gray-800/50"
      )}
    >
      {completed ? (
        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
      ) : (
        <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600 shrink-0" />
      )}
      <span
        className={cn(
          "text-sm flex-1",
          completed
            ? "text-gray-500 dark:text-gray-400 line-through"
            : "text-gray-700 dark:text-gray-200"
        )}
      >
        {label}
      </span>
      {required && !completed && (
        <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
          Required
        </span>
      )}
    </button>
  );
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
