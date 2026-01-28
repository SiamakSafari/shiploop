"use client";

import { DollarSign, RefreshCw, Zap, HelpCircle, MoreVertical, Trash2 } from "lucide-react";
import { IncomeSource } from "@/stores/use-pulse-store";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IncomeSourceCardProps {
  source: IncomeSource;
  onDelete: () => void;
}

export function IncomeSourceCard({ source, onDelete }: IncomeSourceCardProps) {
  const typeIcons = {
    recurring: RefreshCw,
    "one-time": Zap,
    variable: HelpCircle,
  };

  const typeColors = {
    recurring: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400",
    "one-time": "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    variable: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  };

  const Icon = typeIcons[source.type];

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            typeColors[source.type]
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-50 text-sm">
            {source.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="capitalize">{source.type}</span>
            {source.frequency && (
              <>
                <span>•</span>
                <span className="capitalize">{source.frequency}</span>
              </>
            )}
            {source.type === "variable" && (
              <>
                <span>•</span>
                <span>{source.confidence}% confidence</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="font-semibold text-gray-900 dark:text-gray-50">
            ${source.amount.toLocaleString()}
          </p>
          {source.frequency && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              /{source.frequency.replace("ly", "")}
            </p>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MoreVertical className="h-4 w-4 text-gray-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
