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
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-4",
        className
      )}
    >
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-muted-foreground hover:text-foreground hover:bg-muted/50"
        onClick={toggleMobileNav}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search / Command palette trigger */}
      <button
        className={cn(
          "hidden h-10 items-center gap-2 rounded-xl bg-muted/50 px-4 text-muted-foreground transition-all hover:bg-muted md:flex border border-border/50",
          sidebarCollapsed ? "w-64" : "w-64"
        )}
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-4 w-4" />
        <Caption className="flex-1 text-left">Search...</Caption>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {/* Mobile search */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-muted-foreground hover:text-foreground hover:bg-muted/50"
        onClick={() => setCommandPaletteOpen(true)}
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Achievement counter (for desktop) */}
        {user && (
          <button className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50 text-foreground transition-all hover:bg-muted hover-bounce group border border-border/50">
            <Award className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
            <Caption className="font-bold font-space-grotesk">{calculateLevel(user.shipScore.total)}</Caption>
            <Micro className="font-fredoka">LVL</Micro>
          </button>
        )}

        {/* Notification bell */}
        {user && (
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover-wiggle border border-border/50">
            <Bell className="h-4 w-4" />
            {/* Notification badge */}
            <Micro as="span" className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-bold text-white font-fredoka shadow-md animate-scale-pop">
              3
            </Micro>
          </button>
        )}

        {/* Theme toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 text-muted-foreground transition-all hover:bg-muted hover:text-foreground border border-border/50"
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
              <button className="relative h-10 w-10 rounded-xl overflow-hidden ring-2 ring-border/50 transition-all hover:ring-primary/50 hover:scale-105">
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
            <DropdownMenuContent className="w-56 bg-card/95 backdrop-blur-xl border-border/50" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <Caption className="leading-none text-foreground">{user.name}</Caption>
                  <Micro className="leading-none text-muted-foreground">
                    @{user.username}
                  </Micro>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="text-foreground hover:text-foreground focus:bg-muted/50">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-foreground focus:bg-muted/50">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-foreground focus:bg-muted/50">Public Portfolio</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem className="text-red-500 hover:text-red-400 focus:bg-muted/50">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
