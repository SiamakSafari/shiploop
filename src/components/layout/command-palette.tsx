"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  Lightbulb,
  BarChart3,
  FolderKanban,
  Settings,
  Plus,
  DollarSign,
  Zap,
  MessageSquare,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useUIStore } from "@/stores";

const navigationCommands = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Go to Dashboard", shortcut: "G D" },
  { href: "/dashboard/projects", icon: FolderKanban, label: "Go to Projects", shortcut: "G P" },
  { href: "/dashboard/revenue", icon: BarChart3, label: "Go to Revenue", shortcut: "G R" },
  { href: "/dashboard/launch", icon: Rocket, label: "Go to Launch", shortcut: "G L" },
  { href: "/dashboard/engage", icon: MessageSquare, label: "Go to Engage", shortcut: "G E" },
  { href: "/dashboard/settings", icon: Settings, label: "Go to Settings", shortcut: "G S" },
];

const actionCommands = [
  { id: "new-project", icon: Plus, label: "New Project", shortcut: "N" },
  { id: "new-idea", icon: Lightbulb, label: "New Idea", shortcut: "I" },
  { id: "log-revenue", icon: DollarSign, label: "Log Revenue", shortcut: "R" },
  { id: "quick-ship", icon: Zap, label: "Quick Ship Update", shortcut: "S" },
];

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();

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

  const handleNavigation = (href: string) => {
    router.push(href);
    setCommandPaletteOpen(false);
  };

  const handleAction = (actionId: string) => {
    // Handle actions - for now just close
    console.log("Action:", actionId);
    setCommandPaletteOpen(false);

    // Navigate to appropriate page based on action
    switch (actionId) {
      case "new-project":
        router.push("/projects");
        break;
      case "new-idea":
        router.push("/ideas");
        break;
      case "log-revenue":
        router.push("/analytics");
        break;
      case "quick-ship":
        router.push("/");
        break;
    }
  };

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navigationCommands.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => handleNavigation(item.href)}
              className="flex items-center gap-2"
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                {item.shortcut}
              </kbd>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          {actionCommands.map((item) => (
            <CommandItem
              key={item.id}
              onSelect={() => handleAction(item.id)}
              className="flex items-center gap-2"
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                {item.shortcut}
              </kbd>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
