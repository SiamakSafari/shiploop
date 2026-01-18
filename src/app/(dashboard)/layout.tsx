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
    <div className="min-h-screen bg-background">
      {/* Clean background - no mesh gradient or orbs */}
      <div className="mesh-gradient" />

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
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-background">{children}</main>
      </div>
    </div>
  );
}
