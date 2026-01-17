"use client";

import { useState } from "react";
import { Megaphone, Plus, Sparkles, Filter } from "lucide-react";
import { PostCard, PostDetail } from "@/components/build-public";
import { useBuildPublicStore, useProjectsStore } from "@/stores";
import { PostPlatform, PostStatus, PLATFORM_CONFIG, POST_STATUS_CONFIG } from "@/types";
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
  { value: "draft", label: "Drafts" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export default function BuildPublicPage() {
  const {
    posts,
    selectedPostId,
    selectPost,
    updatePost,
    schedulePost,
    markPublished,
    deletePost,
  } = useBuildPublicStore();

  const [filter, setFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const statusMatch = filter === "all" || p.status === filter;
    const platformMatch = platformFilter === "all" || p.platform === platformFilter;
    return statusMatch && platformMatch;
  });

  // Stats
  const stats = {
    totalDrafts: posts.filter((p) => p.status === "draft").length,
    scheduled: posts.filter((p) => p.status === "scheduled").length,
    published: posts.filter((p) => p.status === "published").length,
    avgEngagement: (() => {
      const publishedPosts = posts.filter((p) => p.engagement);
      if (publishedPosts.length === 0) return 0;
      const total = publishedPosts.reduce(
        (sum, p) => sum + (p.engagement?.likes || 0) + (p.engagement?.comments || 0) + (p.engagement?.shares || 0),
        0
      );
      return Math.round(total / publishedPosts.length);
    })(),
  };

  const platforms: PostPlatform[] = ["twitter", "linkedin", "indiehackers", "reddit", "blog"];

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Build in Public
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Draft and share your building journey across platforms.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
          <Plus className="h-4 w-4" />
          New Draft
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="Drafts" value={stats.totalDrafts.toString()} color="text-slate-900 dark:text-slate-50" />
        <StatBox label="Scheduled" value={stats.scheduled.toString()} color="text-blue-600 dark:text-blue-400" />
        <StatBox label="Published" value={stats.published.toString()} color="text-emerald-600 dark:text-emerald-400" />
        <StatBox label="Avg Engagement" value={stats.avgEngagement.toString()} color="text-primary" />
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

        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="w-[180px] border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="all" className="text-slate-900 dark:text-slate-50">
              All Platforms
            </SelectItem>
            {platforms.map((platform) => (
              <SelectItem
                key={platform}
                value={platform}
                className="text-slate-900 dark:text-slate-50"
              >
                <span className="flex items-center gap-2">
                  <span>{PLATFORM_CONFIG[platform].icon}</span>
                  <span>{PLATFORM_CONFIG[platform].label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Posts list */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
            <Sparkles className="h-4 w-4 text-primary" />
            Posts ({filteredPosts.length})
          </h2>
          {filteredPosts.length > 0 ? (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => selectPost(post.id)}
                  isSelected={selectedPostId === post.id}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-2xl bg-teal-100 dark:bg-teal-900/30 p-4">
                  <Megaphone className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                  No Posts Found
                </h3>
                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                  {filter === "all"
                    ? "Start building in public!"
                    : `No posts with status "${filter}".`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div>
          {selectedPost ? (
            <PostDetail
              post={selectedPost}
              onUpdate={(updates) => updatePost(selectedPost.id, updates)}
              onSchedule={(date) => schedulePost(selectedPost.id, date)}
              onPublish={() => markPublished(selectedPost.id)}
              onDelete={() => {
                deletePost(selectedPost.id);
                selectPost(null);
              }}
            />
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select a post to edit or view details
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
