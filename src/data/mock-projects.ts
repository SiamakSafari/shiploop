import { Project, Milestone, LaunchPlatformStatus } from "@/types";

const createMilestones = (completed: number[]): Milestone[] => [
  {
    id: "m1",
    title: "Landing page",
    completed: completed.includes(1),
    completedAt: completed.includes(1) ? new Date("2024-12-01") : undefined,
    order: 1,
  },
  {
    id: "m2",
    title: "Authentication",
    completed: completed.includes(2),
    completedAt: completed.includes(2) ? new Date("2024-12-05") : undefined,
    order: 2,
  },
  {
    id: "m3",
    title: "Core features",
    completed: completed.includes(3),
    completedAt: completed.includes(3) ? new Date("2024-12-15") : undefined,
    order: 3,
  },
  {
    id: "m4",
    title: "Payments",
    completed: completed.includes(4),
    completedAt: completed.includes(4) ? new Date("2024-12-20") : undefined,
    order: 4,
  },
  {
    id: "m5",
    title: "Launch",
    completed: completed.includes(5),
    order: 5,
  },
];

const createLaunchPlatforms = (progress: Record<string, number>): LaunchPlatformStatus[] => [
  {
    platform: "product_hunt",
    status: progress.product_hunt >= 100 ? "launched" : progress.product_hunt > 0 ? "in_progress" : "not_started",
    progress: progress.product_hunt || 0,
    checklist: [
      { id: "ph1", label: "Hunter secured", completed: progress.product_hunt >= 25, required: true },
      { id: "ph2", label: "Tagline ready", completed: progress.product_hunt >= 50, required: true },
      { id: "ph3", label: "Images prepared", completed: progress.product_hunt >= 75, required: true },
      { id: "ph4", label: "First comment drafted", completed: progress.product_hunt >= 100, required: false },
    ],
  },
  {
    platform: "indie_hackers",
    status: progress.indie_hackers >= 100 ? "launched" : progress.indie_hackers > 0 ? "in_progress" : "not_started",
    progress: progress.indie_hackers || 0,
    checklist: [
      { id: "ih1", label: "Post written", completed: progress.indie_hackers >= 33, required: true },
      { id: "ih2", label: "Engaged in community", completed: progress.indie_hackers >= 66, required: false },
      { id: "ih3", label: "Cross-promotion planned", completed: progress.indie_hackers >= 100, required: false },
    ],
  },
  {
    platform: "hacker_news",
    status: progress.hacker_news >= 100 ? "launched" : progress.hacker_news > 0 ? "in_progress" : "not_started",
    progress: progress.hacker_news || 0,
    checklist: [
      { id: "hn1", label: "Title optimized", completed: progress.hacker_news >= 50, required: true },
      { id: "hn2", label: "Show HN format ready", completed: progress.hacker_news >= 100, required: true },
    ],
  },
  {
    platform: "reddit",
    status: progress.reddit >= 100 ? "launched" : progress.reddit > 0 ? "in_progress" : "not_started",
    progress: progress.reddit || 0,
    checklist: [
      { id: "r1", label: "Subreddits identified", completed: progress.reddit >= 33, required: true },
      { id: "r2", label: "Karma requirements met", completed: progress.reddit >= 66, required: true },
      { id: "r3", label: "Post drafted", completed: progress.reddit >= 100, required: true },
    ],
  },
  {
    platform: "twitter",
    status: progress.twitter >= 100 ? "launched" : progress.twitter > 0 ? "in_progress" : "not_started",
    progress: progress.twitter || 0,
    checklist: [
      { id: "t1", label: "Thread written", completed: progress.twitter >= 33, required: true },
      { id: "t2", label: "Images created", completed: progress.twitter >= 66, required: false },
      { id: "t3", label: "Launch time scheduled", completed: progress.twitter >= 100, required: true },
    ],
  },
];

export const mockProjects: Project[] = [
  {
    id: "proj_1",
    name: "ShipFast",
    description: "The NextJS boilerplate with everything you need to ship fast.",
    url: "https://shipfast.dev",
    status: "live",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date(),
    metrics: {
      mrr: 4250,
      users: 892,
      growth: 15.3,
      velocity: 12,
      lastCommitAt: new Date(),
    },
    milestones: createMilestones([1, 2, 3, 4, 5]),
    launchPlatforms: createLaunchPlatforms({
      product_hunt: 100,
      indie_hackers: 100,
      hacker_news: 100,
      reddit: 100,
      twitter: 100,
    }),
  },
  {
    id: "proj_2",
    name: "DataFast",
    description: "Analytics dashboard for indie hackers. Track what matters.",
    url: "https://datafast.dev",
    status: "building",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date(),
    metrics: {
      mrr: 0,
      users: 0,
      growth: 0,
      velocity: 18,
      lastCommitAt: new Date(),
    },
    milestones: createMilestones([1, 2, 3]),
    launchPlatforms: createLaunchPlatforms({
      product_hunt: 75,
      indie_hackers: 66,
      hacker_news: 50,
      reddit: 33,
      twitter: 66,
    }),
  },
  {
    id: "proj_3",
    name: "TrustMRR",
    description: "Verified revenue badges for indie hackers. Build trust instantly.",
    status: "validating",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date(),
    metrics: {
      mrr: 0,
      users: 0,
      growth: 0,
      velocity: 5,
    },
    milestones: createMilestones([1]),
    launchPlatforms: createLaunchPlatforms({
      product_hunt: 0,
      indie_hackers: 0,
      hacker_news: 0,
      reddit: 0,
      twitter: 0,
    }),
  },
];
