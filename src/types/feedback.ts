// Customer Feedback Aggregation Types

export type FeedbackSource = "email" | "twitter" | "chat" | "survey" | "review" | "support";
export type FeedbackSentiment = "positive" | "neutral" | "negative";
export type FeedbackCategory = "feature_request" | "bug_report" | "praise" | "complaint" | "question";
export type FeedbackStatus = "new" | "reviewed" | "actionable" | "resolved" | "archived";

export interface CustomerFeedback {
  id: string;
  projectId: string;
  projectName: string;
  source: FeedbackSource;
  sentiment: FeedbackSentiment;
  category: FeedbackCategory;
  status: FeedbackStatus;
  content: string;
  customerName?: string;
  customerEmail?: string;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SOURCE_CONFIG: Record<FeedbackSource, { icon: string; label: string }> = {
  email: { icon: "📧", label: "Email" },
  twitter: { icon: "🐦", label: "Twitter/X" },
  chat: { icon: "💬", label: "Live Chat" },
  survey: { icon: "📋", label: "Survey" },
  review: { icon: "⭐", label: "Review" },
  support: { icon: "🎫", label: "Support Ticket" },
};

export const SENTIMENT_CONFIG: Record<FeedbackSentiment, { icon: string; label: string; color: string }> = {
  positive: { icon: "😊", label: "Positive", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30" },
  neutral: { icon: "😐", label: "Neutral", color: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800" },
  negative: { icon: "😞", label: "Negative", color: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30" },
};

export const CATEGORY_CONFIG: Record<FeedbackCategory, { icon: string; label: string }> = {
  feature_request: { icon: "💡", label: "Feature Request" },
  bug_report: { icon: "🐛", label: "Bug Report" },
  praise: { icon: "🎉", label: "Praise" },
  complaint: { icon: "😤", label: "Complaint" },
  question: { icon: "❓", label: "Question" },
};

export const STATUS_CONFIG: Record<FeedbackStatus, { icon: string; label: string; color: string }> = {
  new: { icon: "🆕", label: "New", color: "text-blue-600 dark:text-blue-400" },
  reviewed: { icon: "👀", label: "Reviewed", color: "text-slate-600 dark:text-slate-400" },
  actionable: { icon: "🎯", label: "Actionable", color: "text-amber-600 dark:text-amber-400" },
  resolved: { icon: "✅", label: "Resolved", color: "text-emerald-600 dark:text-emerald-400" },
  archived: { icon: "📦", label: "Archived", color: "text-slate-500 dark:text-slate-500" },
};
