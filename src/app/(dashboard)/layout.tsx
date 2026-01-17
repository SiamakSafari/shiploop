"use client";

import { Sidebar, Header, CommandPalette, MobileNav } from "@/components/layout";
import { useUIStore } from "@/stores";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Clean background - no mesh gradient or orbs */}
      <div className="mesh-gradient dark:bg-slate-950" />

      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block relative z-20">
        <Sidebar />
      </div>

      {/* Mobile navigation */}
      <MobileNav />

      {/* Command palette */}
      <CommandPalette />

      {/* Main content */}
      <div
        className={cn(
          "relative z-10 flex flex-col min-h-screen transition-all duration-300",
          sidebarCollapsed ? "md:pl-16" : "md:pl-64"
        )}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6 bg-slate-50 dark:bg-slate-950">{children}</main>
      </div>
    </div>
  );
}
