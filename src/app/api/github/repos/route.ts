import { NextRequest, NextResponse } from "next/server";
import { createGitHubClient, getRepos, getUser } from "@/lib/github";

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
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "30");
    const sort = (searchParams.get("sort") as "created" | "updated" | "pushed" | "full_name") || "pushed";

    const [user, repos] = await Promise.all([
      getUser(octokit),
      getRepos(octokit, { page, perPage, sort }),
    ]);

    return NextResponse.json({
      user: {
        login: user.login,
        avatar: user.avatar_url,
        name: user.name,
      },
      repos,
      pagination: {
        page,
        perPage,
      },
    });
  } catch (error) {
    console.error("[GitHub Repos] Error:", error);

    if (error instanceof Error && error.message.includes("Bad credentials")) {
      return NextResponse.json(
        { error: "Invalid GitHub access token" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
