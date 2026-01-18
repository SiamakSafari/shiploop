"use client";

import { Search, Command, Menu, Moon, Sun, Bell, Award, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUIStore, useAppStore } from "@/stores";
import { cn } from "@/lib/utils";
import { calculateLevel } from "@/lib/design-system";
import { Caption, Micro } from "@/components/ui/typography";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { setCommandPaletteOpen, toggleMobileNav, sidebarCollapsed } = useUIStore();
  const user = useAppStore((state) => state.user);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4",
        className
      )}
    >
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={toggleMobileNav}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search / Command palette trigger */}
      <button
        className={cn(
          "hidden h-10 items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 px-4 text-gray-500 dark:text-gray-400 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 md:flex border border-gray-200 dark:border-gray-700",
          sidebarCollapsed ? "w-64" : "w-64"
        )}
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-4 w-4" />
        <Caption className="flex-1 text-left">Search...</Caption>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-gray-200 dark:bg-gray-700 px-1.5 font-mono text-xs font-medium text-gray-400 dark:text-gray-500 sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Mobile search */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Enhanced Level/XP display (for desktop) */}
        {user && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hidden md:flex items-center gap-3 h-9 px-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-200 transition-all hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-800 hover:text-gray-900 dark:hover:text-gray-50 group border border-gray-200 dark:border-gray-700 hover:border-primary/30 hover:shadow-md">
                  {/* Level badge */}
                  <div className="flex items-center gap-1.5">
                    <div className="relative">
                      <Award className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                      <Sparkles className="absolute -top-1 -right-1 h-2.5 w-2.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-bold text-sm">{calculateLevel(user.shipScore.total)}</span>
                    <Micro className="text-muted-foreground">LVL</Micro>
                  </div>

                  {/* Mini XP bar */}
                  <div className="hidden lg:block w-16">
                    <div className="xp-bar-container h-1.5">
                      <div
                        className="xp-bar-fill"
                        style={{
                          width: `${(user.shipScore.total % 20) * 5}%`, // Progress to next level
                        }}
                      />
                    </div>
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-card border-border">
                <div className="text-center">
                  <Micro className="text-muted-foreground">XP to next level</Micro>
                  <Caption className="font-bold">{20 - (user.shipScore.total % 20)} points</Caption>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Notification bell with enhanced animation */}
        {user && (
          <button className="notification-bell relative flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-200 dark:border-gray-700 hover:border-primary/30">
            <Bell className="h-4 w-4" />
            {/* Enhanced notification badge */}
            <span className="notification-badge">
              3
            </span>
          </button>
        )}

        {/* Theme toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 border border-gray-200 dark:border-gray-700"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>

        {/* User menu */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative h-10 w-10 rounded-xl overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700 transition-all hover:ring-primary/50 hover:scale-105">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-white">
                    <Caption className="font-medium">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Caption>
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <Caption className="leading-none text-gray-900 dark:text-gray-50">{user.name}</Caption>
                  <Micro className="leading-none text-gray-500 dark:text-gray-400">
                    @{user.username}
                  </Micro>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
              <DropdownMenuItem className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 focus:bg-gray-100 dark:focus:bg-gray-800">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 focus:bg-gray-100 dark:focus:bg-gray-800">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50 focus:bg-gray-100 dark:focus:bg-gray-800">Public Portfolio</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
              <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:bg-gray-100 dark:focus:bg-gray-800">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
