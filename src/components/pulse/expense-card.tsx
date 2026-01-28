"use client";

import { Server, Wrench, Megaphone, Users, Package, MoreVertical, Trash2 } from "lucide-react";
import { Expense } from "@/stores/use-pulse-store";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExpenseCardProps {
  expense: Expense;
  onDelete: () => void;
}

export function ExpenseCard({ expense, onDelete }: ExpenseCardProps) {
  const categoryIcons = {
    hosting: Server,
    tools: Wrench,
    marketing: Megaphone,
    contractors: Users,
    other: Package,
  };

  const categoryColors = {
    hosting: "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400",
    tools: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400",
    marketing: "text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-400",
    contractors: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400",
    other: "text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400",
  };

  const Icon = categoryIcons[expense.category];

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            categoryColors[expense.category]
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-50 text-sm">
            {expense.name}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="capitalize">{expense.category}</span>
            <span>•</span>
            <span className="capitalize">{expense.type}</span>
            <span>•</span>
            <span className="capitalize">{expense.frequency}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="font-semibold text-red-600 dark:text-red-400">
            -${expense.amount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            /{expense.frequency.replace("ly", "")}
          </p>
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
