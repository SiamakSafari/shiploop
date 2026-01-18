// Directory Submission Tracker Types

export type DirectoryName =
  | "product_hunt"
  | "betalist"
  | "indie_hackers"
  | "hacker_news"
  | "futurepedia"
  | "there_is_an_ai"
  | "alternativeto"
  | "saas_hub"
  | "launching_next"
  | "beta_page";

export type SubmissionStatus =
  | "not_started"
  | "preparing"
  | "submitted"
  | "in_review"
  | "approved"
  | "live"
  | "rejected";

export interface DirectoryRequirement {
  id: string;
  label: string;
  completed: boolean;
  required: boolean;
}

export interface DirectorySubmission {
  id: string;
  directory: DirectoryName;
  projectId: string;
  projectName: string;
  status: SubmissionStatus;
  progress: number; // 0-100
  requirements: DirectoryRequirement[];
  submissionUrl?: string;
  listingUrl?: string;
  submittedAt?: Date;
  approvedAt?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DirectoryInfo {
  name: DirectoryName;
  displayName: string;
  description: string;
  url: string;
  icon: string; // emoji
  category: "launch" | "ai" | "saas" | "beta" | "general";
  avgReviewTime: string;
  requirements: DirectoryRequirement[];
}

// Default directory configurations
export const DIRECTORIES: DirectoryInfo[] = [
  {
    name: "product_hunt",
    displayName: "Product Hunt",
    description: "The best place to launch new products",
    url: "https://producthunt.com",
    icon: "rocket",
    category: "launch",
    avgReviewTime: "1-2 days",
    requirements: [
      { id: "ph-1", label: "Create maker profile", completed: false, required: true },
      { id: "ph-2", label: "Prepare tagline (60 chars)", completed: false, required: true },
      { id: "ph-3", label: "Write description", completed: false, required: true },
      { id: "ph-4", label: "Upload logo (240x240)", completed: false, required: true },
      { id: "ph-5", label: "Add gallery images", completed: false, required: true },
      { id: "ph-6", label: "Schedule launch date", completed: false, required: false },
      { id: "ph-7", label: "Prepare first comment", completed: false, required: false },
    ],
  },
  {
    name: "betalist",
    displayName: "BetaList",
    description: "Discover and get early access to startups",
    url: "https://betalist.com",
    icon: "target",
    category: "beta",
    avgReviewTime: "3-5 days",
    requirements: [
      { id: "bl-1", label: "Submit startup info", completed: false, required: true },
      { id: "bl-2", label: "Add landing page URL", completed: false, required: true },
      { id: "bl-3", label: "Write pitch (500 chars)", completed: false, required: true },
      { id: "bl-4", label: "Upload screenshot", completed: false, required: true },
      { id: "bl-5", label: "Set up email capture", completed: false, required: false },
    ],
  },
  {
    name: "indie_hackers",
    displayName: "Indie Hackers",
    description: "Community of founders building profitable businesses",
    url: "https://indiehackers.com",
    icon: "cpu",
    category: "general",
    avgReviewTime: "Instant",
    requirements: [
      { id: "ih-1", label: "Create product page", completed: false, required: true },
      { id: "ih-2", label: "Add revenue data", completed: false, required: false },
      { id: "ih-3", label: "Write product description", completed: false, required: true },
      { id: "ih-4", label: "Link social accounts", completed: false, required: false },
      { id: "ih-5", label: "Post introduction", completed: false, required: false },
    ],
  },
  {
    name: "hacker_news",
    displayName: "Hacker News",
    description: "Tech community for Show HN launches",
    url: "https://news.ycombinator.com",
    icon: "newspaper",
    category: "launch",
    avgReviewTime: "Instant",
    requirements: [
      { id: "hn-1", label: "Create HN account (aged)", completed: false, required: true },
      { id: "hn-2", label: "Prepare Show HN post", completed: false, required: true },
      { id: "hn-3", label: "Write technical details", completed: false, required: false },
      { id: "hn-4", label: "Plan launch timing", completed: false, required: false },
    ],
  },
  {
    name: "futurepedia",
    displayName: "Futurepedia",
    description: "Largest AI tools directory",
    url: "https://futurepedia.io",
    icon: "bot",
    category: "ai",
    avgReviewTime: "5-7 days",
    requirements: [
      { id: "fp-1", label: "Submit AI tool", completed: false, required: true },
      { id: "fp-2", label: "Select categories", completed: false, required: true },
      { id: "fp-3", label: "Add pricing info", completed: false, required: true },
      { id: "fp-4", label: "Write feature list", completed: false, required: true },
      { id: "fp-5", label: "Upload logo", completed: false, required: true },
    ],
  },
  {
    name: "there_is_an_ai",
    displayName: "There's An AI For That",
    description: "Comprehensive AI tools database",
    url: "https://theresanaiforthat.com",
    icon: "brain",
    category: "ai",
    avgReviewTime: "3-5 days",
    requirements: [
      { id: "tai-1", label: "Submit tool details", completed: false, required: true },
      { id: "tai-2", label: "Add use cases", completed: false, required: true },
      { id: "tai-3", label: "Specify pricing model", completed: false, required: true },
      { id: "tai-4", label: "Upload screenshots", completed: false, required: false },
    ],
  },
  {
    name: "alternativeto",
    displayName: "AlternativeTo",
    description: "Crowdsourced software recommendations",
    url: "https://alternativeto.net",
    icon: "refresh-cw",
    category: "general",
    avgReviewTime: "1-3 days",
    requirements: [
      { id: "at-1", label: "Add application", completed: false, required: true },
      { id: "at-2", label: "List alternatives to", completed: false, required: true },
      { id: "at-3", label: "Add tags", completed: false, required: true },
      { id: "at-4", label: "Write description", completed: false, required: true },
    ],
  },
  {
    name: "saas_hub",
    displayName: "SaaSHub",
    description: "Software alternatives and reviews",
    url: "https://saashub.com",
    icon: "cloud",
    category: "saas",
    avgReviewTime: "2-4 days",
    requirements: [
      { id: "sh-1", label: "Submit SaaS product", completed: false, required: true },
      { id: "sh-2", label: "Add pricing tiers", completed: false, required: true },
      { id: "sh-3", label: "List features", completed: false, required: true },
      { id: "sh-4", label: "Add integrations", completed: false, required: false },
    ],
  },
  {
    name: "launching_next",
    displayName: "Launching Next",
    description: "Startup launch platform",
    url: "https://launchingnext.com",
    icon: "clapperboard",
    category: "launch",
    avgReviewTime: "1-2 days",
    requirements: [
      { id: "ln-1", label: "Submit startup", completed: false, required: true },
      { id: "ln-2", label: "Add founder info", completed: false, required: true },
      { id: "ln-3", label: "Upload logo", completed: false, required: true },
      { id: "ln-4", label: "Write description", completed: false, required: true },
    ],
  },
  {
    name: "beta_page",
    displayName: "BetaPage",
    description: "Community for beta testers",
    url: "https://betapage.co",
    icon: "flask-conical",
    category: "beta",
    avgReviewTime: "2-3 days",
    requirements: [
      { id: "bp-1", label: "Create startup profile", completed: false, required: true },
      { id: "bp-2", label: "Add beta signup link", completed: false, required: true },
      { id: "bp-3", label: "Write pitch", completed: false, required: true },
      { id: "bp-4", label: "Upload media", completed: false, required: false },
    ],
  },
];
