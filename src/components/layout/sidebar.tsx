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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUIStore, useAppStore } from "@/stores";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard", shortcut: "G D" },
  { href: "/launch-hub", icon: Rocket, label: "Launch Hub", shortcut: "G L" },
  { href: "/leaderboard", icon: Trophy, label: "Leaderboard", shortcut: "G B" },
  { href: "/ideas", icon: Lightbulb, label: "Ideas", shortcut: "G I" },
  { href: "/analytics", icon: BarChart3, label: "Analytics", shortcut: "G A" },
  { href: "/projects", icon: FolderKanban, label: "Projects", shortcut: "G P" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();
  const user = useAppStore((state) => state.user);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">ShipLoop</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className={cn("h-8 w-8", sidebarCollapsed && "mx-auto")}
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
            "border-b border-border p-4",
            sidebarCollapsed && "px-2"
          )}
        >
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center gap-1">
              <div className="text-lg font-bold text-primary">
                {user.shipScore.total}
              </div>
              {user.shipScore.streak.isOnFire && (
                <Flame className="h-4 w-4 text-orange-500 animate-fire-pulse" />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Ship Score</div>
                <div className="text-2xl font-bold text-primary">
                  {user.shipScore.total}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {user.shipScore.streak.isOnFire && (
                  <Flame className="h-5 w-5 text-orange-500 animate-fire-pulse" />
                )}
                <span className="text-sm font-medium">
                  {user.shipScore.streak.currentStreak}d
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                sidebarCollapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.shortcut}
                  </span>
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-border p-2">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50",
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
