/**
 * GitHub Integration Types
 */

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  private: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: string;
  };
  html_url: string;
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
}

export interface GitHubCommitActivity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // Contribution level for visualization
}

export interface GitHubWebhookPayload {
  action?: string;
  ref?: string;
  repository: {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
  };
  sender: {
    id: number;
    login: string;
    avatar_url: string;
  };
  commits?: Array<{
    id: string;
    message: string;
    timestamp: string;
    author: {
      name: string;
      email: string;
      username: string;
    };
    added: string[];
    removed: string[];
    modified: string[];
  }>;
  head_commit?: {
    id: string;
    message: string;
    timestamp: string;
  };
}

export interface GitHubConnectionStatus {
  connected: boolean;
  username?: string;
  avatar?: string;
  connectedAt?: string;
  lastSync?: string;
}

export interface CommitStats {
  totalCommits: number;
  totalAdditions: number;
  totalDeletions: number;
  lastCommitDate: string | null;
  commitsToday: number;
  commitsThisWeek: number;
  activeRepos: number;
}
