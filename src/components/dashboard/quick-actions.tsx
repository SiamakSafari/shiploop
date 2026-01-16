"use client";

import { useRouter } from "next/navigation";
import { Plus, Lightbulb, DollarSign, Rocket, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "New Project",
    emoji: "✨",
    icon: Plus,
    href: "/projects",
    shortcut: "N",
    gradient: "from-purple-500 to-pink-500",
    glow: "shadow-purple-500/30",
    isPrimary: true,
  },
  {
    label: "New Idea",
    emoji: "💡",
    icon: Lightbulb,
    href: "/ideas",
    shortcut: "I",
    gradient: "from-yellow-500 to-orange-500",
    glow: "shadow-yellow-500/30",
  },
  {
    label: "Log Revenue",
    emoji: "💰",
    icon: DollarSign,
    href: "/analytics",
    shortcut: "R",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/30",
  },
  {
    label: "Prep Launch",
    emoji: "🚀",
    icon: Rocket,
    href: "/launch-hub",
    shortcut: "L",
    gradient: "from-cyan-500 to-blue-500",
    glow: "shadow-cyan-500/30",
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="flex items-center gap-2 text-base font-semibold text-white">
          <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
          ⚡ Quick Actions
        </h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => router.push(action.href)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-xl p-4",
                "bg-white/5 hover:bg-white/10 transition-all duration-300",
                "hover-bounce hover:shadow-xl border border-white/10",
                action.glow,
                action.isPrimary && "ring-2 ring-purple-500/20"
              )}
            >
              {/* Icon with gradient background */}
              <div className="relative">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  "bg-gradient-to-br shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden",
                  action.gradient
                )}>
                  <action.icon className="h-6 w-6 text-white relative z-10" />
                  {/* Shimmer effect on primary action */}
                  {action.isPrimary && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}
                </div>
                {/* Floating emoji */}
                <div className="absolute -top-2 -right-2 text-xl animate-float-emoji">
                  {action.emoji}
                </div>
              </div>
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                {action.label}
              </span>
              {/* Keyboard shortcut */}
              <span className="absolute top-2 right-2 text-[10px] text-white/30 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-mono">
                {action.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
