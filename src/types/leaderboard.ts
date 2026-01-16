export interface LeaderboardEntry {
  rank: number;
  user: LeaderboardUser;
  shipScore: number;
  streak: number;
  mrr: number;
  isCurrentUser: boolean;
  change: number; // rank change from yesterday
}

export interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface ShareableRankCard {
  rank: number;
  percentile: number;
  shipScore: number;
  streak: number;
  username: string;
  generatedAt: Date;
}
