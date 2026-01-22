"use client";

import { useState } from "react";
import { Calendar, Heart, MessageCircle, Share2, Trash2, Send, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PublicPost,
  PLATFORM_CONFIG,
  POST_TYPE_CONFIG,
  POST_STATUS_CONFIG,
  PostPlatform,
  PostType,
} from "@/types";

interface PostDetailProps {
  post: PublicPost;
  onUpdate: (updates: Partial<PublicPost>) => void;
  onSchedule: (date: Date) => void;
  onPublish: () => void;
  onDelete: () => void;
}

export function PostDetail({
  post,
  onUpdate,
  onSchedule,
  onPublish,
  onDelete,
}: PostDetailProps) {
  const platformConfig = PLATFORM_CONFIG[post.platform];
  const typeConfig = POST_TYPE_CONFIG[post.type];
  const statusConfig = POST_STATUS_CONFIG[post.status];

  const [content, setContent] = useState(post.content);
  const [title, setTitle] = useState(post.title || "");

  const charCount = content.length;
  const charLimit = platformConfig.charLimit;
  const isOverLimit = charCount > charLimit;
  const charPercentage = Math.min((charCount / charLimit) * 100, 100);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    onUpdate({ content: value });
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    onUpdate({ title: value });
  };

  const platforms: PostPlatform[] = ["twitter", "linkedin", "indiehackers", "reddit", "blog"];
  const types: PostType[] = ["milestone", "lesson", "metrics", "behind_scenes", "question"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-2xl border border-gray-200 dark:border-gray-700">
              {platformConfig.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                {post.title || `${platformConfig.label} Post`}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {post.projectName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
              statusConfig.color.includes("slate") && "bg-gray-100 dark:bg-gray-800",
              statusConfig.color.includes("blue") && "bg-blue-50 dark:bg-blue-900/30",
              statusConfig.color.includes("emerald") && "bg-emerald-50 dark:bg-emerald-900/30",
              statusConfig.color.includes("red") && "bg-red-50 dark:bg-red-900/30",
              statusConfig.color
            )}>
              {statusConfig.icon} {statusConfig.label}
            </span>
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Actions */}
        {post.status === "draft" && (
          <div className="flex gap-2">
            <button
              onClick={() => onSchedule(new Date(Date.now() + 24 * 60 * 60 * 1000))}
              className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Clock className="h-4 w-4" />
              Schedule
            </button>
            <button
              onClick={onPublish}
              disabled={isOverLimit}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              Mark Published
            </button>
          </div>
        )}

        {/* Engagement stats */}
        {post.engagement && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-red-500">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">{post.engagement.likes}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">likes</span>
            </div>
            <div className="flex items-center gap-2 text-[#7CB4C4]">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">{post.engagement.comments}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">comments</span>
            </div>
            <div className="flex items-center gap-2 text-[#6BBF8A]">
              <Share2 className="h-5 w-5" />
              <span className="font-semibold">{post.engagement.shares}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">shares</span>
            </div>
          </div>
        )}
      </div>

      {/* Platform & Type */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Platform
          </label>
          <select
            value={post.platform}
            onChange={(e) => onUpdate({ platform: e.target.value as PostPlatform })}
            disabled={post.status !== "draft"}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {PLATFORM_CONFIG[platform].icon} {PLATFORM_CONFIG[platform].label}
              </option>
            ))}
          </select>
        </div>

        <div className="glass rounded-xl p-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Post Type
          </label>
          <select
            value={post.type}
            onChange={(e) => onUpdate({ type: e.target.value as PostType })}
            disabled={post.status !== "draft"}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {POST_TYPE_CONFIG[type].icon} {POST_TYPE_CONFIG[type].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Title (for longer platforms) */}
      {(post.platform === "blog" || post.platform === "reddit" || post.platform === "indiehackers") && (
        <div className="glass rounded-xl p-4">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            disabled={post.status !== "draft"}
            placeholder="Enter post title..."
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>
      )}

      {/* Content Editor */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Content
          </label>
          <span className={cn(
            "text-xs font-medium",
            isOverLimit ? "text-red-600 dark:text-red-400" : "text-gray-400 dark:text-gray-500"
          )}>
            {charCount} / {charLimit}
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          disabled={post.status !== "draft"}
          placeholder={typeConfig.template}
          className={cn(
            "w-full rounded-lg bg-gray-50 dark:bg-gray-800 border px-3 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px] resize-none disabled:opacity-50",
            isOverLimit ? "border-red-500" : "border-gray-200 dark:border-gray-700"
          )}
        />
        {/* Character limit bar */}
        <div className="mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isOverLimit ? "bg-red-500" : charPercentage > 80 ? "bg-[#D4AF37]" : "bg-primary"
            )}
            style={{ width: `${charPercentage}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="glass rounded-xl p-4">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
          Tags
        </label>
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm text-gray-600 dark:text-gray-400"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length === 0 && (
            <span className="text-sm text-gray-400 dark:text-gray-500">No tags</span>
          )}
        </div>
      </div>

      {/* Schedule info */}
      {post.scheduledFor && (
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">
              Scheduled for {formatDate(post.scheduledFor)}
            </span>
          </div>
        </div>
      )}

      {/* Published info */}
      {post.publishedAt && (
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 text-[#6BBF8A]">
            <Send className="h-5 w-5" />
            <span className="text-sm font-medium">
              Published {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
