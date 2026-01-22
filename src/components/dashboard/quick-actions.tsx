"use client";

import { useRouter } from "next/navigation";
import { Plus, Lightbulb, DollarSign, Rocket, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    label: "New Project",
    icon: Plus,
    href: "/dashboard/projects",
    shortcut: "N",
    color: "#171717",
    isPrimary: true,
  },
  {
    label: "New Idea",
    icon: Lightbulb,
    href: "/dashboard/projects",
    shortcut: "I",
    color: "#737373",
  },
  {
    label: "Log Revenue",
    icon: DollarSign,
    href: "/dashboard/revenue",
    shortcut: "R",
    color: "#171717",
  },
  {
    label: "Prep Launch",
    icon: Rocket,
    href: "/dashboard/launch",
    shortcut: "L",
    color: "#404040",
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="glass hover-lift rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-gray-50">
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
                "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg border border-gray-200 dark:border-gray-700",
                "active:scale-[0.97] active:shadow-sm shadow-sm",
                action.isPrimary && "ring-2 ring-gray-900/20 dark:ring-gray-100/20"
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
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-50 transition-colors">
                {action.label}
              </span>
              {/* Keyboard shortcut */}
              <span className="absolute top-2 right-2 text-[10px] text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-600 font-mono">
                {action.shortcut}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
