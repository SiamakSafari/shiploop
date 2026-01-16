import { ActivityItem } from "@/types";

export const mockActivity: ActivityItem[] = [
  {
    id: "act_1",
    type: "commit",
    title: "Pushed 3 commits",
    description: "feat: add dark mode toggle",
    projectId: "proj_2",
    projectName: "DataFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    metadata: { commits: 3 },
  },
  {
    id: "act_2",
    type: "revenue",
    title: "+$99 new sale",
    description: "ShipFast lifetime deal",
    projectId: "proj_1",
    projectName: "ShipFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    metadata: { amount: 99 },
  },
  {
    id: "act_3",
    type: "signup",
    title: "5 new signups",
    description: "From Product Hunt traffic",
    projectId: "proj_1",
    projectName: "ShipFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    metadata: { count: 5, source: "product_hunt" },
  },
  {
    id: "act_4",
    type: "milestone",
    title: "Milestone completed",
    description: "Core features done",
    projectId: "proj_2",
    projectName: "DataFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    metadata: { milestone: "Core features" },
  },
  {
    id: "act_5",
    type: "commit",
    title: "Pushed 7 commits",
    description: "refactor: improve performance",
    projectId: "proj_2",
    projectName: "DataFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    metadata: { commits: 7 },
  },
  {
    id: "act_6",
    type: "idea_validated",
    title: "Idea validated",
    description: "TrustMRR - Score: 88/100",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    metadata: { ideaId: "idea_4", score: 88 },
  },
  {
    id: "act_7",
    type: "revenue",
    title: "+$199 new sale",
    description: "ShipFast team license",
    projectId: "proj_1",
    projectName: "ShipFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28), // 28 hours ago
    metadata: { amount: 199 },
  },
  {
    id: "act_8",
    type: "launch",
    title: "Launched on Reddit",
    description: "r/SideProject and r/indiehackers",
    projectId: "proj_1",
    projectName: "ShipFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    metadata: { platform: "reddit", subreddits: ["SideProject", "indiehackers"] },
  },
  {
    id: "act_9",
    type: "signup",
    title: "12 new signups",
    description: "From Twitter thread",
    projectId: "proj_1",
    projectName: "ShipFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 52), // 52 hours ago
    metadata: { count: 12, source: "twitter" },
  },
  {
    id: "act_10",
    type: "commit",
    title: "Pushed 2 commits",
    description: "fix: auth redirect issue",
    projectId: "proj_1",
    projectName: "ShipFast",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    metadata: { commits: 2 },
  },
];
