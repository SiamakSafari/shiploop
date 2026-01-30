"use client";

import { useState } from "react";
import { MessageSquare, Megaphone, Plus, Sparkles, Filter } from "lucide-react";
import { toast } from "sonner";
import { FeedbackCard, FeedbackDetail } from "@/components/feedback";
import { PostCard, PostDetail } from "@/components/build-public";
import { useFeedbackStore, useBuildPublicStore } from "@/stores";
import {
  FeedbackSource,
  SOURCE_CONFIG,
  PostPlatform,
  PLATFORM_CONFIG,
} from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const feedbackStatusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "actionable", label: "Actionable" },
  { value: "reviewed", label: "Reviewed" },
  { value: "resolved", label: "Resolved" },
];

const postStatusFilters: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "draft", label: "Drafts" },
  { value: "scheduled", label: "Scheduled" },
  { value: "published", label: "Published" },
];

export default function EngagePage() {
  const [activeTab, setActiveTab] = useState("feedback");

  // Feedback store
  const {
    feedbacks,
    selectedFeedbackId,
    selectFeedback,
    updateStatus: updateFeedbackStatus,
    categorize,
    setNotes,
    deleteFeedback,
  } = useFeedbackStore();

  // Build public store
  const {
    posts,
    selectedPostId,
    selectPost,
    updatePost,
    schedulePost,
    markPublished,
    deletePost,
  } = useBuildPublicStore();

  const [feedbackFilter, setFeedbackFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [postFilter, setPostFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const selectedFeedback = feedbacks.find((f) => f.id === selectedFeedbackId);
  const selectedPost = posts.find((p) => p.id === selectedPostId);

  // Filter feedbacks
  const filteredFeedbacks = feedbacks.filter((f) => {
    const statusMatch = feedbackFilter === "all" || f.status === feedbackFilter;
    const sourceMatch = sourceFilter === "all" || f.source === sourceFilter;
    return statusMatch && sourceMatch;
  });

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const statusMatch = postFilter === "all" || p.status === postFilter;
    const platformMatch = platformFilter === "all" || p.platform === platformFilter;
    return statusMatch && platformMatch;
  });

  // Feedback stats
  const feedbackStats = {
    total: feedbacks.length,
    positiveRate: feedbacks.length > 0
      ? Math.round((feedbacks.filter((f) => f.sentiment === "positive").length / feedbacks.length) * 100)
      : 0,
    featureRequests: feedbacks.filter((f) => f.category === "feature_request").length,
    bugs: feedbacks.filter((f) => f.category === "bug_report").length,
  };

  // Post stats
  const postStats = {
    drafts: posts.filter((p) => p.status === "draft").length,
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

  const sources: FeedbackSource[] = ["email", "twitter", "chat", "survey", "review", "support"];
  const platforms: PostPlatform[] = ["twitter", "linkedin", "indiehackers", "reddit", "blog"];

  // Toast-wrapped handlers for Feedback
  const handleUpdateFeedbackStatus = (feedbackId: string, status: string) => {
    updateFeedbackStatus(feedbackId, status as "new" | "actionable" | "reviewed" | "resolved");
    toast.success("Status Updated", {
      description: `Feedback marked as ${status}`,
    });
  };

  const handleCategorizeFeedback = (feedbackId: string, category: string) => {
    categorize(feedbackId, category as "feature_request" | "bug_report" | "praise" | "question" | "complaint");
    toast.success("Categorized", {
      description: `Feedback categorized as ${category.replace("_", " ")}`,
    });
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    deleteFeedback(feedbackId);
    selectFeedback(null);
    toast("Feedback Deleted", {
      description: "The feedback item has been removed",
    });
  };

  // Toast-wrapped handlers for Posts
  const handleSchedulePost = (postId: string, date: Date) => {
    schedulePost(postId, date);
    toast.success("Post Scheduled", {
      description: `Post scheduled for ${date.toLocaleDateString()}`,
    });
  };

  const handlePublishPost = (postId: string) => {
    markPublished(postId);
    toast.success("Post Published!", {
      description: "Your content is now live",
    });
  };

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
    selectPost(null);
    toast("Post Deleted", {
      description: "The post has been removed",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Engage</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Manage customer feedback and build in public content.
        </p>
      </div>

      {/* Main tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 dark:bg-gray-800 border border-border">
          <TabsTrigger
            value="feedback"
            className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Customer Feedback
          </TabsTrigger>
          <TabsTrigger
            value="build-public"
            className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm gap-2"
          >
            <Megaphone className="h-4 w-4" />
            Build in Public
          </TabsTrigger>
        </TabsList>

        {/* Feedback Tab Content */}
        <TabsContent value="feedback" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="Total" value={feedbackStats.total.toString()} color="text-gray-900 dark:text-gray-50" />
            <StatBox label="Positive" value={`${feedbackStats.positiveRate}%`} color="text-emerald-600 dark:text-emerald-400" />
            <StatBox label="Feature Requests" value={feedbackStats.featureRequests.toString()} color="text-blue-600 dark:text-blue-400" />
            <StatBox label="Bug Reports" value={feedbackStats.bugs.toString()} color="text-red-600 dark:text-red-400" />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
                <Plus className="h-4 w-4" />
                Add Feedback
              </button>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <Tabs value={feedbackFilter} onValueChange={setFeedbackFilter} className="flex-1">
                <TabsList className="bg-gray-100 dark:bg-gray-800 border border-border">
                  {feedbackStatusFilters.map((status) => (
                    <TabsTrigger
                      key={status.value}
                      value={status.value}
                      className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm"
                    >
                      {status.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-[180px] border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-border">
                  <SelectItem value="all" className="text-gray-900 dark:text-gray-50">
                    All Sources
                  </SelectItem>
                  {sources.map((source) => (
                    <SelectItem
                      key={source}
                      value={source}
                      className="text-gray-900 dark:text-gray-50"
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
          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] items-start">
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
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
                    <div className="rounded-2xl bg-gray-100 dark:bg-gray-900/30 p-4">
                      <MessageSquare className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
                      No Feedback Found
                    </h3>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                      Start collecting customer feedback!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              {selectedFeedback ? (
                <FeedbackDetail
                  feedback={selectedFeedback}
                  onUpdateStatus={(status) => handleUpdateFeedbackStatus(selectedFeedback.id, status)}
                  onCategorize={(category) => handleCategorizeFeedback(selectedFeedback.id, category)}
                  onSetNotes={(notes) => setNotes(selectedFeedback.id, notes)}
                  onDelete={() => handleDeleteFeedback(selectedFeedback.id)}
                />
              ) : (
                <div className="glass rounded-2xl">
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Select feedback to view details and take action
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Build in Public Tab Content */}
        <TabsContent value="build-public" className="space-y-6 mt-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="Drafts" value={postStats.drafts.toString()} color="text-gray-900 dark:text-gray-50" />
            <StatBox label="Scheduled" value={postStats.scheduled.toString()} color="text-blue-600 dark:text-blue-400" />
            <StatBox label="Published" value={postStats.published.toString()} color="text-emerald-600 dark:text-emerald-400" />
            <StatBox label="Avg Engagement" value={postStats.avgEngagement.toString()} color="text-primary" />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:scale-105 active:scale-[0.97]">
                <Plus className="h-4 w-4" />
                New Draft
              </button>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <Tabs value={postFilter} onValueChange={setPostFilter} className="flex-1">
                <TabsList className="bg-gray-100 dark:bg-gray-800 border border-border">
                  {postStatusFilters.map((status) => (
                    <TabsTrigger
                      key={status.value}
                      value={status.value}
                      className="text-gray-500 dark:text-gray-400 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-50 data-[state=active]:shadow-sm"
                    >
                      {status.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[180px] border-border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-border">
                  <SelectItem value="all" className="text-gray-900 dark:text-gray-50">
                    All Platforms
                  </SelectItem>
                  {platforms.map((platform) => (
                    <SelectItem
                      key={platform}
                      value={platform}
                      className="text-gray-900 dark:text-gray-50"
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
          </div>

          {/* Content */}
          <div className="grid gap-6 lg:grid-cols-[1fr_2fr] items-start">
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
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
                    <div className="rounded-2xl bg-gray-100 dark:bg-gray-900/30 p-4">
                      <Megaphone className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
                      No Posts Found
                    </h3>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                      Start building in public!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              {selectedPost ? (
                <PostDetail
                  post={selectedPost}
                  onUpdate={(updates) => updatePost(selectedPost.id, updates)}
                  onSchedule={(date) => handleSchedulePost(selectedPost.id, date)}
                  onPublish={() => handlePublishPost(selectedPost.id)}
                  onDelete={() => handleDeletePost(selectedPost.id)}
                />
              ) : (
                <div className="glass rounded-2xl">
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Select a post to edit or view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
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
    <div className="glass rounded-xl p-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className={cn("text-xl font-bold font-space-grotesk", color)}>
        {value}
      </p>
    </div>
  );
}
