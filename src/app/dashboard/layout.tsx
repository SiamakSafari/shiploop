"use client";

import { Sidebar, Header, CommandPalette, MobileNav } from "@/components/layout";
import { WelcomeModal } from "@/components/onboarding";
import { useUIStore, useOnboardingStore } from "@/stores";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useUIStore();
  const { hasSeenWelcome, completeOnboarding } = useOnboardingStore();

  return (
    <div className="min-h-screen">

      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block relative z-20">
        <Sidebar />
      </div>

      {/* Mobile navigation */}
      <MobileNav />

      {/* Command palette */}
      <CommandPalette />

      {/* Welcome modal for new users */}
      <WelcomeModal
        open={!hasSeenWelcome}
        onComplete={completeOnboarding}
      />

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
