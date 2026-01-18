import { Flame, Trophy, Kanban, Rocket, DollarSign, Share2 } from "lucide-react";

// Features data
export const features = [
  {
    id: "shipping-streak",
    title: "Shipping Streak",
    description: "Track your daily shipping consistency. Build momentum with milestone badges and never break the chain.",
    icon: Flame,
    gradient: "from-orange-500/20 to-red-500/10",
    iconColor: "text-orange-500",
  },
  {
    id: "global-leaderboard",
    title: "Global Leaderboard",
    description: "Compete with 2,800+ indie hackers worldwide. Climb the ranks and celebrate your wins.",
    icon: Trophy,
    gradient: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-500",
  },
  {
    id: "project-pipeline",
    title: "Project Pipeline",
    description: "From idea validation to launch day. Track every project through your custom pipeline stages.",
    icon: Kanban,
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: "launch-command",
    title: "Launch Command Center",
    description: "Product Hunt, Indie Hackers, Hacker News checklists. Never miss a launch step again.",
    icon: Rocket,
    gradient: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: "revenue-dashboard",
    title: "Revenue Dashboard",
    description: "MRR tracking, runway calculator, pricing experiments. All your financial metrics in one place.",
    icon: DollarSign,
    gradient: "from-emerald-500/20 to-green-500/10",
    iconColor: "text-emerald-500",
  },
  {
    id: "build-public",
    title: "Build in Public",
    description: "Schedule content, track engagement, grow your audience. Turn shipping into storytelling.",
    icon: Share2,
    gradient: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-500",
  },
];

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahbuilds",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    quote: "ShipLoop turned my chaotic side projects into a real business. The Ship Score gamification actually makes me want to ship every day.",
    product: "DesignKit Pro",
    shipScore: 87,
    mrr: "$4.2k",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    username: "@marcusdev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
    quote: "I've tried every productivity tool out there. ShipLoop is the first one that actually understands indie hackers. The leaderboard keeps me motivated.",
    product: "APIFlow",
    shipScore: 92,
    mrr: "$8.7k",
  },
  {
    id: 3,
    name: "Emma Thompson",
    username: "@emmahacks",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    quote: "From 0 to $2k MRR in 3 months. The launch checklists and streak tracking made all the difference. Can't imagine building without it now.",
    product: "FormBuilder",
    shipScore: 78,
    mrr: "$2.1k",
  },
];

// FAQ data
export const faqs = [
  {
    id: "ship-score",
    question: "How is Ship Score calculated?",
    answer: "Ship Score is calculated from four components: Commits (25 pts) - your daily code contributions, Launches (25 pts) - products and features you ship, Revenue (25 pts) - your MRR growth, and Growth (25 pts) - user acquisition and engagement metrics. Each component is updated in real-time as you connect your tools.",
  },
  {
    id: "integrations",
    question: "What integrations do you support?",
    answer: "We integrate with GitHub for commit tracking, Stripe for revenue metrics, Twitter/X for social engagement, Product Hunt for launch tracking, and Google Analytics for growth metrics. More integrations like Lemonsqueezy, Gumroad, and Paddle are coming soon.",
  },
  {
    id: "security",
    question: "Is my revenue data secure?",
    answer: "Absolutely. We use bank-level encryption (AES-256) for all data at rest and TLS 1.3 for data in transit. We never store raw financial data - only aggregated metrics. You can also choose to hide your revenue from the public leaderboard.",
  },
  {
    id: "multiple-projects",
    question: "Can I use ShipLoop for multiple projects?",
    answer: "Yes! ShipLoop is designed for indie hackers with multiple projects. You can track unlimited projects, each with their own pipeline stages, revenue metrics, and launch checklists. Your Ship Score aggregates across all your projects.",
  },
  {
    id: "free-plan",
    question: "Is there a free plan?",
    answer: "Yes, we offer a generous free tier that includes up to 3 projects, basic Ship Score tracking, and access to the global leaderboard. Premium plans unlock unlimited projects, advanced analytics, and priority integrations.",
  },
];

// Social proof stats
export const stats = {
  indieHackers: 2847,
  mrrTracked: 4200000,
  commits: 127000,
  bestStreak: 847,
};

// Top 3 leaderboard preview
export const topLeaderboard = [
  {
    rank: 1,
    name: "Alex Kim",
    username: "alexbuilds",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    shipScore: 98,
    mrr: 24500,
    streak: 312,
  },
  {
    rank: 2,
    name: "Jessica Liu",
    username: "jessicacodes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
    shipScore: 95,
    mrr: 18200,
    streak: 284,
  },
  {
    rank: 3,
    name: "David Park",
    username: "davidships",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    shipScore: 93,
    mrr: 15800,
    streak: 256,
  },
];

// How it works steps
export const howItWorks = [
  {
    step: 1,
    title: "Connect",
    description: "Link your GitHub, Stripe, and socials in under 2 minutes. We handle the rest.",
    icon: "plug",
  },
  {
    step: 2,
    title: "Ship",
    description: "Build and launch as you normally would. We auto-track commits, launches, and sales.",
    icon: "rocket",
  },
  {
    step: 3,
    title: "Compete",
    description: "Watch your Ship Score climb. Earn badges, hit streaks, and climb the leaderboard.",
    icon: "trophy",
  },
];

// Early access benefits
export const earlyAccessBenefits = [
  "Lifetime discount on premium plans",
  "Priority access to new features",
  "Founding member badge on leaderboard",
  "Direct line to the founding team",
];
