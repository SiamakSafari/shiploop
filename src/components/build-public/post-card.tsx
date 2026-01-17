"use client";

import { ChevronRight, Calendar, Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PublicPost, PLATFORM_CONFIG, POST_TYPE_CONFIG, POST_STATUS_CONFIG } from "@/types";
import { Caption, Micro } from "@/components/ui/typography";

interface PostCardProps {
  post: PublicPost;
  onClick: () => void;
  isSelected: boolean;
}

export function PostCard({ post, onClick, isSelected }: PostCardProps) {
  const platformConfig = PLATFORM_CONFIG[post.platform];
  const typeConfig = POST_TYPE_CONFIG[post.type];
  const statusConfig = POST_STATUS_CONFIG[post.status];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const formatRelativeDate = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 0) return `in ${Math.abs(diffDays)}d`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const charCount = post.content.length;
  const charLimit = platformConfig.charLimit;
  const isOverLimit = charCount > charLimit;

  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left rounded-xl p-4 transition-all duration-200",
        "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700",
        "border border-slate-200 dark:border-slate-700",
        "hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary border-primary dark:border-primary"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Platform Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-xl shrink-0 border border-slate-200 dark:border-slate-700">
          {platformConfig.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <Caption className="font-semibold text-slate-900 dark:text-slate-50">
                {platformConfig.label}
              </Caption>
              <span className="text-sm">{typeConfig.icon}</span>
            </div>
            <span className={cn(
              "shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              statusConfig.color.includes("slate") && "bg-slate-100 dark:bg-slate-800",
              statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
              statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
              statusConfig.color.includes("red") && "bg-red-50 dark:bg-red-900/30",
              statusConfig.color
            )}>
              {statusConfig.label}
            </span>
          </div>

          {post.title && (
            <Caption className="font-medium text-slate-900 dark:text-slate-50 truncate mb-1">
              {post.title}
            </Caption>
          )}

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
            {truncateContent(post.content)}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-3 flex-wrap">
            <Micro className="text-slate-500 dark:text-slate-400">
              {post.projectName}
            </Micro>
            <Micro className={cn(
              isOverLimit ? "text-red-600 dark:text-red-400" : "text-slate-400 dark:text-slate-500"
            )}>
              {charCount}/{charLimit}
            </Micro>
            {post.scheduledFor && (
              <Micro className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Calendar className="h-3 w-3" />
                {formatDate(post.scheduledFor)}
              </Micro>
            )}
            {post.publishedAt && (
              <Micro className="text-slate-400 dark:text-slate-500">
                {formatRelativeDate(post.publishedAt)}
              </Micro>
            )}
          </div>

          {/* Engagement */}
          {post.engagement && (
            <div className="flex items-center gap-3 mt-2">
              <Micro className="flex items-center gap-1 text-red-500">
                <Heart className="h-3 w-3" />
                {post.engagement.likes}
              </Micro>
              <Micro className="flex items-center gap-1 text-blue-500">
                <MessageCircle className="h-3 w-3" />
                {post.engagement.comments}
              </Micro>
              <Micro className="flex items-center gap-1 text-emerald-500">
                <Share2 className="h-3 w-3" />
                {post.engagement.shares}
              </Micro>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 dark:bg-slate-700 px-2 py-0.5 text-xs text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Chevron */}
        <ChevronRight className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </button>
  );
}
