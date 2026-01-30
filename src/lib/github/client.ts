import { Octokit } from "octokit";
import type { GitHubUser, GitHubRepo, GitHubCommit, CommitStats } from "./types";

/**
 * Create an authenticated Octokit instance
 */
export function createGitHubClient(accessToken: string): Octokit {
  return new Octokit({
    auth: accessToken,
  });
}

/**
 * Get authenticated user info
 */
export async function getUser(octokit: Octokit): Promise<GitHubUser> {
  const { data } = await octokit.rest.users.getAuthenticated();
  return {
    id: data.id,
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
    html_url: data.html_url,
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  };
}

/**
 * Get user's repositories
 */
export async function getRepos(
  octokit: Octokit,
  options: {
    perPage?: number;
    page?: number;
    sort?: "created" | "updated" | "pushed" | "full_name";
  } = {}
): Promise<GitHubRepo[]> {
  const { perPage = 30, page = 1, sort = "pushed" } = options;

  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: perPage,
    page,
    sort,
    direction: "desc",
  });

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    private: repo.private,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    pushed_at: repo.pushed_at || "",
    created_at: repo.created_at || "",
    updated_at: repo.updated_at || "",
  }));
}

/**
 * Get commits for a repository
 */
export async function getCommits(
  octokit: Octokit,
  owner: string,
  repo: string,
  options: {
    perPage?: number;
    page?: number;
    since?: string;
    until?: string;
  } = {}
): Promise<GitHubCommit[]> {
  const { perPage = 30, page = 1, since, until } = options;

  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
    per_page: perPage,
    page,
    since,
    until,
  });

  return data.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message,
    author: {
      name: commit.commit.author?.name || "Unknown",
      email: commit.commit.author?.email || "",
      date: commit.commit.author?.date || "",
    },
    committer: {
      name: commit.commit.committer?.name || "Unknown",
      email: commit.commit.committer?.email || "",
      date: commit.commit.committer?.date || "",
    },
    html_url: commit.html_url,
    stats: commit.stats
      ? {
          additions: commit.stats.additions || 0,
          deletions: commit.stats.deletions || 0,
          total: commit.stats.total || 0,
        }
      : undefined,
  }));
}

/**
 * Get commit activity for a user across all their repos
 */
export async function getUserCommitStats(
  octokit: Octokit,
  username: string
): Promise<CommitStats> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  // Get user's events (includes push events with commits)
  const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
    username,
    per_page: 100,
  });

  let totalCommits = 0;
  let totalAdditions = 0;
  let totalDeletions = 0;
  let lastCommitDate: string | null = null;
  let commitsToday = 0;
  let commitsThisWeek = 0;
  const activeRepoSet = new Set<string>();

  for (const event of events) {
    if (event.type === "PushEvent") {
      const payload = event.payload as { commits?: Array<{ sha: string }>; size?: number };
      const commitCount = payload.commits?.length || payload.size || 0;
      totalCommits += commitCount;

      if (event.repo?.name) {
        activeRepoSet.add(event.repo.name);
      }

      const eventDate = new Date(event.created_at || "");

      if (!lastCommitDate || eventDate > new Date(lastCommitDate)) {
        lastCommitDate = event.created_at || null;
      }

      if (eventDate >= todayStart) {
        commitsToday += commitCount;
      }

      if (eventDate >= weekStart) {
        commitsThisWeek += commitCount;
      }
    }
  }

  return {
    totalCommits,
    totalAdditions,
    totalDeletions,
    lastCommitDate,
    commitsToday,
    commitsThisWeek,
    activeRepos: activeRepoSet.size,
  };
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }

  const crypto = require("crypto");
  const expectedSignature =
    "sha256=" +
    crypto.createHmac("sha256", secret).update(payload).digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Get GitHub OAuth authorization URL
 */
export function getAuthorizationUrl(clientId: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "read:user repo",
    allow_signup: "true",
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange code for access token
 */
export async function exchangeCodeForToken(
  code: string,
  clientId: string,
  clientSecret: string
): Promise<string> {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error_description || "Failed to exchange code for token");
  }

  return data.access_token;
}
