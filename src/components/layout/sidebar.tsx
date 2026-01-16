"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  Trophy,
  Lightbulb,
  BarChart3,
  FolderKanban,
  Settings,
  ChevronLeft,
  Flame,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUIStore, useAppStore } from "@/stores";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard", emoji: "🏠", shortcut: "G D" },
  { href: "/launch-hub", icon: Rocket, label: "Launch Hub", emoji: "🚀", shortcut: "G L" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard", emoji: "🏆", shortcut: "G B" },
  { href: "/ideas", icon: Lightbulb, label: "Ideas", emoji: "💡", shortcut: "G I" },
  { href: "/analytics", icon: BarChart3, label: "Analytics", emoji: "📊", shortcut: "G A" },
  { href: "/projects", icon: FolderKanban, label: "Projects", emoji: "📂", shortcut: "G P" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();
  const user = useAppStore((state) => state.user);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col glass border-r border-white/10 transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 shadow-lg shadow-purple-500/25 transition-transform group-hover:scale-105">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">ShipLoop</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className={cn("h-8 w-8 text-white/60 hover:text-white hover:bg-white/10", sidebarCollapsed && "mx-auto")}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              sidebarCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Ship Score Mini */}
      {user && (
        <div
          className={cn(
            "border-b border-white/10 p-4",
            sidebarCollapsed && "px-2"
          )}
        >
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center gap-1">
              <div className="text-lg font-bold text-gradient font-space-grotesk">
                {user.shipScore.total}
              </div>
              {user.shipScore.streak.isOnFire && (
                <div className="relative">
                  <Flame className="h-4 w-4 text-orange-500 animate-fire-pulse" />
                  <div className="absolute inset-0 blur-sm bg-orange-500/50 animate-fire-pulse" />
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl bg-white/5 p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-white/50 font-medium">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    🚀 Ship Score
                  </div>
                  <div className="text-2xl font-bold text-gradient font-space-grotesk tracking-tight">
                    {user.shipScore.total}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {user.shipScore.streak.isOnFire && (
                    <div className="relative">
                      <Flame className="h-5 w-5 text-orange-500 animate-fire-pulse" />
                      <div className="absolute inset-0 blur-md bg-orange-500/50 animate-fire-pulse" />
                    </div>
                  )}
                  <span className="text-sm font-bold text-white/80 font-space-grotesk">
                    {user.shipScore.streak.currentStreak}d
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white shadow-lg border border-purple-500/30"
                  : "text-white/60 hover:text-white hover:bg-white/5",
                sidebarCollapsed && "justify-center px-2"
              )}
              style={isActive ? {
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
              } : undefined}
            >
              {/* Glow effect for active item */}
              {isActive && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl" />
              )}

              <div className="relative flex items-center gap-3 flex-1">
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-purple-400")} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-[10px] text-white/30 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                      {item.shortcut}
                    </span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-all duration-200 hover:text-white hover:bg-white/5",
            sidebarCollapsed && "justify-center px-2"
          )}
        >
          <Settings className="h-5 w-5" />
          {!sidebarCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
