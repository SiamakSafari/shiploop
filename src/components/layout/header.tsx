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
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 glass px-4",
        className
      )}
    >
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white/60 hover:text-white hover:bg-white/10"
        onClick={toggleMobileNav}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search / Command palette trigger */}
      <button
        className={cn(
          "hidden h-10 items-center gap-2 rounded-xl bg-white/5 px-4 text-white/50 transition-all hover:bg-white/10 md:flex",
          sidebarCollapsed ? "w-64" : "w-64"
        )}
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left text-sm">Search...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-white/10 px-1.5 font-mono text-[10px] font-medium text-white/40 sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Mobile search */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white/60 hover:text-white hover:bg-white/10"
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Achievement counter (for desktop) */}
        {user && (
          <button className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white hover-bounce group border border-white/10">
            <Award className="h-4 w-4 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold font-space-grotesk">{calculateLevel(user.shipScore.total)}</span>
            <span className="text-xs font-fredoka">LVL</span>
          </button>
        )}

        {/* Notification bell */}
        {user && (
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white hover-wiggle border border-white/10">
            <Bell className="h-4 w-4" />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-[10px] font-bold text-white font-fredoka shadow-lg animate-scale-pop">
              3
            </span>
          </button>
        )}

        {/* Theme toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/60 transition-all hover:bg-white/10 hover:text-white border border-white/10"
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
              <button className="relative h-10 w-10 rounded-xl overflow-hidden ring-2 ring-white/10 transition-all hover:ring-purple-500/50 hover:scale-105">
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-cyan-500 text-white text-sm font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass border-white/10" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{user.name}</p>
                  <p className="text-xs leading-none text-white/50">
                    @{user.username}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-white/80 hover:text-white focus:bg-white/10">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-white/80 hover:text-white focus:bg-white/10">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-white/80 hover:text-white focus:bg-white/10">Public Portfolio</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:bg-white/10">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
