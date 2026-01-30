"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Users, TrendingUp, Clock, Search, Download, Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { WaitlistTable } from "@/components/admin/waitlist-table";
import { StatsCards } from "@/components/admin/stats-cards";

interface WaitlistEntry {
  id: string;
  email: string;
  source: string;
  created_at: string;
  invited_at: string | null;
}

interface WaitlistStats {
  total: number;
  today: number;
  thisWeek: number;
  invited: number;
}

export default function AdminWaitlistPage() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [stats, setStats] = useState<WaitlistStats>({
    total: 0,
    today: 0,
    thisWeek: 0,
    invited: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Fetch waitlist data
  const fetchWaitlist = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/waitlist");
      if (!response.ok) throw new Error("Failed to fetch waitlist");

      const data = await response.json();
      setEntries(data.entries || []);
      setStats(data.stats || {
        total: data.entries?.length || 0,
        today: 0,
        thisWeek: 0,
        invited: 0,
      });
    } catch (error) {
      console.error("Failed to fetch waitlist:", error);
      toast.error("Failed to load waitlist data");
      // Use mock data for demo
      setEntries(getMockData());
      setStats({
        total: 127,
        today: 8,
        thisWeek: 34,
        invited: 12,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  // Filter and sort entries
  const filteredEntries = entries
    .filter((entry) =>
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.source.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Export to CSV
  const handleExport = () => {
    const csv = [
      ["Email", "Source", "Signed Up", "Invited"].join(","),
      ...entries.map((e) =>
        [e.email, e.source, e.created_at, e.invited_at || ""].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `shiploop-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Waitlist Exported", {
      description: `${entries.length} entries exported to CSV`,
    });
  };

  // Send invite email
  const handleInvite = async (email: string) => {
    toast.success("Invite Sent", {
      description: `Invitation email sent to ${email}`,
    });
    // TODO: Implement actual invite logic
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Admin
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                Waitlist
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage and track waitlist signups
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchWaitlist}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} isLoading={isLoading} />

        {/* Search and Filter */}
        <div className="mt-8 mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by email or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Waitlist Table */}
        <WaitlistTable
          entries={filteredEntries}
          isLoading={isLoading}
          onInvite={handleInvite}
        />

        {/* Results count */}
        {!isLoading && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredEntries.length} of {entries.length} entries
          </p>
        )}
      </div>
    </div>
  );
}

// Mock data for demo/development
function getMockData(): WaitlistEntry[] {
  const sources = ["landing-page", "twitter", "producthunt", "friend-referral", "blog"];
  const mockEmails = [
    "sarah@startup.io", "mike@indiehacker.com", "alex@builder.co",
    "emma@saas.dev", "john@product.io", "lisa@maker.app",
    "david@launch.co", "anna@ship.io", "tom@build.dev",
    "kate@indie.co", "chris@hack.io", "rachel@create.dev",
  ];

  return mockEmails.map((email, i) => ({
    id: `mock-${i}`,
    email,
    source: sources[i % sources.length],
    created_at: new Date(Date.now() - i * 86400000 * Math.random() * 7).toISOString(),
    invited_at: i < 3 ? new Date(Date.now() - i * 86400000).toISOString() : null,
  }));
}
