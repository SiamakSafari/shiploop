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
  Sparkles,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUIStore, useAppStore } from "@/stores";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Home", shortcut: "G H" },
  { href: "/projects", icon: FolderKanban, label: "Projects", shortcut: "G P" },
  { href: "/revenue", icon: DollarSign, label: "Revenue", shortcut: "G R" },
  { href: "/launch", icon: Rocket, label: "Launch", shortcut: "G L" },
  { href: "/engage", icon: MessageSquare, label: "Engage", shortcut: "G E" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();
  const user = useAppStore((state) => state.user);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4">
        {!sidebarCollapsed && (
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md transition-transform group-hover:scale-105">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">ShipLoop</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className={cn("h-8 w-8 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800", sidebarCollapsed && "mx-auto")}
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
            "border-b border-gray-200 dark:border-gray-800 p-4",
            sidebarCollapsed && "px-2"
          )}
        >
          {sidebarCollapsed ? (
            <div className="flex flex-col items-center gap-1">
              <div className="text-lg font-bold text-primary font-space-grotesk">
                {user.shipScore.total}
              </div>
              {user.shipScore.streak.isOnFire && (
                <Flame className="h-4 w-4 text-primary animate-fire-pulse" />
              )}
            </div>
          ) : (
            <div className="rounded-xl bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                    <Sparkles className="h-3 w-3 animate-pulse text-primary" />
                    Ship Score
                  </div>
                  <div className="text-2xl font-bold text-primary font-space-grotesk tracking-tight">
                    {user.shipScore.total}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {user.shipScore.streak.isOnFire && (
                    <Flame className="h-5 w-5 text-primary animate-fire-pulse" />
                  )}
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-200 font-space-grotesk">
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
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 shadow-sm border border-gray-200 dark:border-gray-700"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800",
                sidebarCollapsed && "justify-center px-2"
              )}
            >
              <div className="relative flex items-center gap-3 flex-1">
                <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
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
      <div className="border-t border-gray-200 dark:border-gray-800 p-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 transition-all duration-200 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800",
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
