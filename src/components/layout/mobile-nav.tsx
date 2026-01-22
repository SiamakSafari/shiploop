"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  FolderKanban,
  Settings,
  Flame,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUIStore, useAppStore } from "@/stores";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
  { href: "/dashboard/revenue", icon: DollarSign, label: "Revenue" },
  { href: "/dashboard/launch", icon: Rocket, label: "Launch" },
  { href: "/dashboard/engage", icon: MessageSquare, label: "Engage" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { mobileNavOpen, setMobileNavOpen } = useUIStore();
  const user = useAppStore((state) => state.user);

  return (
    <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-gray-50">ShipLoop</span>
          </SheetTitle>
        </SheetHeader>

        {/* Ship Score Mini */}
        {user && (
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Ship Score</div>
                <div className="text-2xl font-bold text-primary">
                  {user.shipScore.total}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {user.shipScore.streak.isOnFire && (
                  <Flame className="h-5 w-5 text-[#E8945A] animate-fire-pulse" />
                )}
                <span className="text-sm font-medium">
                  {user.shipScore.streak.currentStreak}d streak
                </span>
              </div>
            </div>
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
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
