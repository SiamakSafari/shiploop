"use client";

import { useRouter } from "next/navigation";
import { Plus, Lightbulb, DollarSign, Rocket, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "New Project",
    icon: Plus,
    href: "/projects",
    shortcut: "N",
    color: "#0f766e",
    isPrimary: true,
  },
  {
    label: "New Idea",
    icon: Lightbulb,
    href: "/ideas",
    shortcut: "I",
    color: "#737373",
  },
  {
    label: "Log Revenue",
    icon: DollarSign,
    href: "/analytics",
    shortcut: "R",
    color: "#0f766e",
  },
  {
    label: "Prep Launch",
    icon: Rocket,
    href: "/launch-hub",
    shortcut: "L",
    color: "#404040",
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-50">
          <Zap className="h-5 w-5 text-primary animate-pulse" />
          Quick Actions
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
                "bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300",
                "hover-bounce hover:shadow-md border border-slate-200 dark:border-slate-700",
                "active:scale-[0.97] active:shadow-sm",
                action.isPrimary && "ring-2 ring-primary/30"
              )}
            >
              {/* Icon with solid color background */}
              <div className="relative">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden"
                  style={{ backgroundColor: action.color }}
                >
                  <action.icon className="h-6 w-6 text-white relative z-10" />
                  {/* Shimmer effect on primary action */}
                  {action.isPrimary && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-slate-50 transition-colors">
                {action.label}
              </span>
              {/* Keyboard shortcut */}
              <span className="absolute top-2 right-2 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 font-mono">
                {action.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
