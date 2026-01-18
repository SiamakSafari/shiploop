"use client";

import { ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomerFeedback, SOURCE_CONFIG, SENTIMENT_CONFIG, CATEGORY_CONFIG, STATUS_CONFIG } from "@/types";
import { Caption, Micro } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";

interface FeedbackCardProps {
  feedback: CustomerFeedback;
  onClick: () => void;
  isSelected: boolean;
}

export function FeedbackCard({ feedback, onClick, isSelected }: FeedbackCardProps) {
  const sourceConfig = SOURCE_CONFIG[feedback.source];
  const sentimentConfig = SENTIMENT_CONFIG[feedback.sentiment];
  const categoryConfig = CATEGORY_CONFIG[feedback.category];
  const statusConfig = STATUS_CONFIG[feedback.status];

  const formatRelativeDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

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
        {/* Sentiment Icon */}
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl text-xl shrink-0",
          sentimentConfig.color
        )}>
          {sentimentConfig.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <Caption className="font-semibold text-gray-900 dark:text-gray-50">
                {feedback.customerName || "Anonymous"}
              </Caption>
              <Icon name={sourceConfig.icon} size={14} className="text-gray-500" />
            </div>
            <span className={cn(
              "shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
              statusConfig.color.includes("slate") && "bg-gray-100 dark:bg-gray-800",
              statusConfig.color.includes("amber") && "bg-amber-50 dark:bg-amber-900/30",
              statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
              statusConfig.color
            )}>
              {statusConfig.label}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {truncateContent(feedback.content)}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Micro className={cn("flex items-center gap-1", categoryConfig ? "text-gray-500 dark:text-gray-400" : "")}>
              <Icon name={categoryConfig.icon} size={12} />
              <span>{categoryConfig.label}</span>
            </Micro>
            <Micro className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
              <Clock className="h-3 w-3" />
              {formatRelativeDate(feedback.createdAt)}
            </Micro>
          </div>

          {/* Tags */}
          {feedback.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {feedback.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
              {feedback.tags.length > 3 && (
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  +{feedback.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </button>
  );
}
