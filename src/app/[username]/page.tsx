import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ProfileHeader } from "@/components/portfolio/profile-header";
import { ProjectShowcase } from "@/components/portfolio/project-showcase";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

// Mock data - in production this would be fetched from the database
function getUserData(username: string) {
  // Return mock data for demo
  return {
    user: {
      name: username.charAt(0).toUpperCase() + username.slice(1),
      username,
      avatar: "",
      bio: "Indie hacker building products and shipping fast. Passionate about SaaS, developer tools, and building in public.",
      location: "San Francisco, CA",
      website: `https://${username}.dev`,
      twitter: username,
      github: username,
      joinedDate: "2024-01-15",
      shipScore: 78,
      tier: "silver",
      streak: 14,
      projectCount: 3,
    },
    projects: [
      {
        id: "1",
        name: "TaskFlow",
        description: "A minimalist project management tool for solo developers and small teams. Built with Next.js and Supabase.",
        status: "launched",
        url: "https://taskflow.dev",
        githubUrl: `https://github.com/${username}/taskflow`,
        techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
        stats: { stars: 234, users: 450, mrr: 1200 },
        launchedAt: "2024-06-01",
        updatedAt: "2024-12-15",
      },
      {
        id: "2",
        name: "DevMetrics",
        description: "Analytics dashboard for developers. Track your GitHub activity, coding time, and productivity trends.",
        status: "building",
        githubUrl: `https://github.com/${username}/devmetrics`,
        techStack: ["React", "Python", "PostgreSQL"],
        stats: { stars: 89 },
        updatedAt: "2024-12-20",
      },
      {
        id: "3",
        name: "QuickPoll",
        description: "Create and share polls in seconds. Embed anywhere with a single line of code.",
        status: "launched",
        url: "https://quickpoll.io",
        techStack: ["Svelte", "Rust", "SQLite"],
        stats: { stars: 156, users: 890, mrr: 340 },
        launchedAt: "2024-09-15",
        updatedAt: "2024-11-28",
      },
    ],
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;

  // Validate username format
  if (!username || !/^[a-zA-Z0-9_-]+$/.test(username)) {
    notFound();
  }

  // Prevent conflicts with known routes
  const reservedRoutes = ["dashboard", "admin", "api", "login", "signup"];
  if (reservedRoutes.includes(username.toLowerCase())) {
    notFound();
  }

  const data = getUserData(username);

  if (!data) {
    notFound();
  }

  const { user, projects } = data;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation bar */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            ShipLoop
          </Link>
          <Link
            href={`/${username}/projects`}
            className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
          >
            All Projects
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Projects */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Projects
          </h2>
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </div>
  );
}
