"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  FolderKanban,
  Settings,
  ChevronLeft,
  Flame,
  DollarSign,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUIStore, useAppStore } from "@/stores";
import { useAnimatedCounter } from "@/hooks";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home", shortcut: "G H" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Projects", shortcut: "G P" },
  { href: "/dashboard/revenue", icon: DollarSign, label: "Revenue", shortcut: "G R" },
  { href: "/dashboard/launch", icon: Rocket, label: "Launch", shortcut: "G L" },
  { href: "/dashboard/engage", icon: MessageSquare, label: "Engage", shortcut: "G E" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();
  const user = useAppStore((state) => state.user);

  const { value: animatedScore } = useAnimatedCounter(user?.shipScore.total || 0, {
    duration: 1000,
    delay: 100,
  });

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-gradient-to-b from-background to-background/95 border-r border-border transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo with enhanced styling */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!sidebarCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
              <Rocket className="h-5 w-5 text-primary-foreground transition-transform group-hover:rotate-12" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-display font-semibold text-foreground">ShipLoop</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className={cn("h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted transition-all", sidebarCollapsed && "mx-auto")}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              sidebarCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Enhanced Ship Score Mini */}
      {user && (
        <div
          className={cn(
            "border-b border-border p-4",
            sidebarCollapsed && "px-2"
          )}
        >
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center gap-1 py-2">
              <div className="text-lg font-bold number-display text-primary animate-heartbeat">
                {Math.round(animatedScore)}
              </div>
              {user.shipScore.streak.isOnFire && (
                <div className="streak-flame">
                  <Flame className="h-4 w-4 text-primary streak-flame-icon" />
                </div>
              )}
            </div>
          ) : (
            <div className="card-gradient-gold rounded-xl p-3 transition-all hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Ship Score
                  </div>
                  <div className="text-2xl font-bold number-display text-primary tracking-tight">
                    {Math.round(animatedScore)}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {user.shipScore.streak.isOnFire && (
                    <div className="streak-flame">
                      <Flame className="h-5 w-5 text-primary streak-flame-icon" />
                    </div>
                  )}
                  <span className="text-sm font-bold number-display text-foreground">
                    {user.shipScore.streak.currentStreak}d
                  </span>
                </div>
              </div>
              {/* Mini XP bar */}
              <div className="mt-2 xp-bar-container h-1">
                <div
                  className="xp-bar-fill"
                  style={{ width: `${user.shipScore.total}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation with enhanced hover effects */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-item-enhanced group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "active bg-gradient-to-r from-primary/15 to-primary/5 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                sidebarCollapsed && "justify-center px-2"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative flex items-center gap-3 flex-1">
                <div className={cn(
                  "relative transition-transform duration-200 group-hover:scale-110",
                  isActive && "text-primary"
                )}>
                  <item.icon className="h-5 w-5 shrink-0" />
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
                  )}
                </div>
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <span className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                      {item.shortcut}
                    </span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Settings with enhanced styling */}
      <div className="border-t border-border p-3">
        <Link
          href="/dashboard/settings"
          className={cn(
            "nav-item-enhanced group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted/50",
            sidebarCollapsed && "justify-center px-2",
            pathname === "/dashboard/settings" && "active bg-gradient-to-r from-primary/15 to-primary/5 text-primary"
          )}
        >
          <div className="relative transition-transform duration-200 group-hover:scale-110 group-hover:rotate-45">
            <Settings className="h-5 w-5" />
          </div>
          {!sidebarCollapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
