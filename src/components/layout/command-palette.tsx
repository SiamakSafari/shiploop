"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  DollarSign,
  Rocket,
  MessageSquare,
  Settings,
  Moon,
  Sun,
  Plus,
  Target,
  Lightbulb,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useUIStore } from "@/stores";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, shortcut: "G D" },
  { name: "Projects", href: "/projects", icon: FolderKanban, shortcut: "G P" },
  { name: "Revenue", href: "/revenue", icon: DollarSign, shortcut: "G R" },
  { name: "Launch", href: "/launch", icon: Rocket, shortcut: "G L" },
  { name: "Engage", href: "/engage", icon: MessageSquare, shortcut: "G E" },
  { name: "Settings", href: "/settings", icon: Settings, shortcut: "G S" },
];

const quickActions = [
  { name: "New Project", action: "new-project", icon: Plus, shortcut: "N P" },
  { name: "New Idea", action: "new-idea", icon: Lightbulb, shortcut: "N I" },
  { name: "New Goal", action: "new-goal", icon: Target, shortcut: "N G" },
  { name: "Quick Ship Update", action: "quick-ship", icon: Zap, shortcut: "Q S" },
  { name: "View Analytics", action: "analytics", icon: TrendingUp, shortcut: "V A" },
];

export function CommandPalette() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();

  // Global keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const runCommand = useCallback(
    (command: () => void) => {
      setCommandPaletteOpen(false);
      command();
    },
    [setCommandPaletteOpen]
  );

  const handleNavigation = (href: string, name: string) => {
    runCommand(() => {
      router.push(href);
      toast.success(`Navigated to ${name}`);
    });
  };

  const handleQuickAction = (action: string, name: string) => {
    runCommand(() => {
      switch (action) {
        case "new-project":
          router.push("/projects");
          toast.success("Create a new project", {
            description: "Click 'New Project' to get started",
          });
          break;
        case "new-idea":
          router.push("/projects");
          toast.success("Add a new idea", {
            description: "Switch to Ideas Pipeline tab",
          });
          break;
        case "new-goal":
          router.push("/projects");
          toast.success("Set a new goal", {
            description: "Switch to Goals tab",
          });
          break;
        case "quick-ship":
          router.push("/");
          toast.success("Log your ship update!", {
            description: "Keep that streak going",
          });
          break;
        case "analytics":
          router.push("/revenue");
          toast.success("Viewing analytics");
          break;
        default:
          toast(`${name} triggered`);
      }
    });
  };

  const toggleTheme = () => {
    runCommand(() => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      toast.success(`Switched to ${newTheme} mode`);
    });
  };

  return (
    <CommandDialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      title="Command Palette"
      description="Search commands, navigate, or take quick actions"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => handleNavigation(item.href, item.name)}
              className="flex items-center gap-2"
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.name}</span>
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          {quickActions.map((item) => (
            <CommandItem
              key={item.action}
              onSelect={() => handleQuickAction(item.action, item.name)}
              className="flex items-center gap-2"
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.name}</span>
              <CommandShortcut>{item.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem onSelect={toggleTheme} className="flex items-center gap-2">
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="flex-1">
              Toggle {theme === "dark" ? "Light" : "Dark"} Mode
            </span>
            <CommandShortcut>T T</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
