export type ValidationStatus = "pending" | "validated" | "rejected" | "needs_research";

export interface Idea {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  scores: IdeaScores;
  status: ValidationStatus;
  notes?: string;
  convertedToProject?: string; // project ID if converted
}

export interface IdeaScores {
  demand: number; // 0-100
  competition: number; // 0-100 (lower is better)
  feasibility: number; // 0-100
  overall: number; // calculated average
}
