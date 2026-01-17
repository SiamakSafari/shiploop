"use client";

import { Search, Command, Menu, Moon, Sun, Bell, Award } from "lucide-react";
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
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4",
        className
      )}
    >
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={toggleMobileNav}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search / Command palette trigger */}
      <button
        className={cn(
          "hidden h-10 items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 text-slate-500 dark:text-slate-400 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 md:flex border border-slate-200 dark:border-slate-700",
          sidebarCollapsed ? "w-64" : "w-64"
        )}
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-4 w-4" />
        <Caption className="flex-1 text-left">Search...</Caption>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-slate-200 dark:bg-slate-700 px-1.5 font-mono text-xs font-medium text-slate-400 dark:text-slate-500 sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Mobile search */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Achievement counter (for desktop) */}
        {user && (
          <button className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 hover-bounce group border border-slate-200 dark:border-slate-700">
            <Award className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <Caption className="font-bold font-space-grotesk">{calculateLevel(user.shipScore.total)}</Caption>
            <Micro className="font-fredoka">LVL</Micro>
          </button>
        )}

        {/* Notification bell */}
        {user && (
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 hover-wiggle border border-slate-200 dark:border-slate-700">
            <Bell className="h-4 w-4" />
            {/* Notification badge */}
            <Micro as="span" className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-bold text-white font-fredoka shadow-md animate-scale-pop">
              3
            </Micro>
          </button>
        )}

        {/* Theme toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-50 border border-slate-200 dark:border-slate-700"
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
              <button className="relative h-10 w-10 rounded-xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 transition-all hover:ring-primary/50 hover:scale-105">
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
            <DropdownMenuContent className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <Caption className="leading-none text-slate-900 dark:text-slate-50">{user.name}</Caption>
                  <Micro className="leading-none text-slate-500 dark:text-slate-400">
                    @{user.username}
                  </Micro>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              <DropdownMenuItem className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-50 focus:bg-slate-100 dark:focus:bg-slate-800">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-50 focus:bg-slate-100 dark:focus:bg-slate-800">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-50 focus:bg-slate-100 dark:focus:bg-slate-800">Public Portfolio</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 focus:bg-slate-100 dark:focus:bg-slate-800">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
