import { Idea } from "@/types";

export const mockIdeas: Idea[] = [
  {
    id: "idea_1",
    title: "AI Code Review Tool",
    description: "An AI-powered tool that reviews pull requests and suggests improvements. Integrates with GitHub and GitLab.",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
    scores: {
      demand: 85,
      competition: 72, // High competition
      feasibility: 78,
      overall: 64, // Lower due to competition
    },
    status: "validated",
    notes: "Strong demand but crowded market. Need unique angle.",
  },
  {
    id: "idea_2",
    title: "Micro-SaaS Analytics",
    description: "Simple, privacy-focused analytics specifically for indie hackers and micro-SaaS products. One-time purchase.",
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-05"),
    scores: {
      demand: 78,
      competition: 45,
      feasibility: 88,
      overall: 78,
    },
    status: "validated",
    notes: "Good opportunity. Plausible alternative with indie focus.",
  },
  {
    id: "idea_3",
    title: "Newsletter Monetization Platform",
    description: "Help newsletter creators monetize through sponsorships, paid subscriptions, and affiliate links in one dashboard.",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10"),
    scores: {
      demand: 72,
      competition: 55,
      feasibility: 65,
      overall: 68,
    },
    status: "needs_research",
    notes: "Need to research newsletter creator pain points more.",
  },
  {
    id: "idea_4",
    title: "Stripe Revenue Verification",
    description: "Verified revenue badges for indie hackers. Connect Stripe to display authenticated MRR on your profile.",
    createdAt: new Date("2024-12-12"),
    updatedAt: new Date("2024-12-12"),
    scores: {
      demand: 82,
      competition: 25,
      feasibility: 92,
      overall: 88,
    },
    status: "validated",
    notes: "Low competition, high demand. Already started building as TrustMRR.",
    convertedToProject: "proj_3",
  },
  {
    id: "idea_5",
    title: "Indie Hacker Job Board",
    description: "Job board specifically for indie hackers looking for part-time technical co-founders or freelance help.",
    createdAt: new Date("2024-12-14"),
    updatedAt: new Date("2024-12-14"),
    scores: {
      demand: 55,
      competition: 60,
      feasibility: 85,
      overall: 58,
    },
    status: "rejected",
    notes: "Market too small. Existing solutions sufficient.",
  },
];
