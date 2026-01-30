import { NextRequest, NextResponse } from "next/server";
import { createGitHubClient, getCommits, getUser, getUserCommitStats } from "@/lib/github";

export async function GET(request: NextRequest) {
  try {
    const accessToken = request.headers.get("x-github-token");

    if (!accessToken) {
      return NextResponse.json(
        { error: "GitHub access token required" },
        { status: 401 }
      );
    }

    const octokit = createGitHubClient(accessToken);

    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "30");
    const since = searchParams.get("since") || undefined;
    const until = searchParams.get("until") || undefined;

    // If owner and repo specified, get commits for that repo
    if (owner && repo) {
      const commits = await getCommits(octokit, owner, repo, {
        page,
        perPage,
        since,
        until,
      });

      return NextResponse.json({
        commits,
        pagination: {
          page,
          perPage,
        },
      });
    }

    // Otherwise, get user's overall commit stats
    const user = await getUser(octokit);
    const stats = await getUserCommitStats(octokit, user.login);

    return NextResponse.json({
      user: {
        login: user.login,
        avatar: user.avatar_url,
        name: user.name,
      },
      stats,
    });
  } catch (error) {
    console.error("[GitHub Commits] Error:", error);

    if (error instanceof Error && error.message.includes("Bad credentials")) {
      return NextResponse.json(
        { error: "Invalid GitHub access token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
