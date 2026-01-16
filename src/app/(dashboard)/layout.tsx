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
      {/* Mesh gradient background - fixed layer */}
      <div className="mesh-gradient" />

      {/* Floating orbs for extra visual depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[80px] opacity-30 bg-purple-500" style={{ top: '10%', left: '60%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 bg-cyan-500" style={{ top: '60%', left: '20%' }} />
        <div className="absolute w-[250px] h-[250px] rounded-full blur-[80px] opacity-15 bg-pink-500" style={{ top: '30%', right: '10%' }} />
      </div>

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
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
