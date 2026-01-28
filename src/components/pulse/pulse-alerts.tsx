"use client";

import { AlertTriangle, AlertCircle, Info, Sparkles, X } from "lucide-react";
import { PulseAlert } from "@/stores/use-pulse-store";
import { cn } from "@/lib/utils";

interface PulseAlertsProps {
  alerts: PulseAlert[];
  onDismiss: (id: string) => void;
}

export function PulseAlerts({ alerts, onDismiss }: PulseAlertsProps) {
  const activeAlerts = alerts.filter((a) => !a.dismissed);

  if (activeAlerts.length === 0) {
    return null;
  }

  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      bg: "bg-red-50 dark:bg-red-900/20",
      border: "border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      textColor: "text-red-800 dark:text-red-200",
    },
    warning: {
      icon: AlertCircle,
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
      iconColor: "text-amber-600 dark:text-amber-400",
      textColor: "text-amber-800 dark:text-amber-200",
    },
    info: {
      icon: Info,
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
      textColor: "text-blue-800 dark:text-blue-200",
    },
  };

  // Special styling for opportunity alerts
  const getAlertConfig = (alert: PulseAlert) => {
    if (alert.type === "opportunity") {
      return {
        icon: Sparkles,
        bg: "bg-emerald-50 dark:bg-emerald-900/20",
        border: "border-emerald-200 dark:border-emerald-800",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        textColor: "text-emerald-800 dark:text-emerald-200",
      };
    }
    return severityConfig[alert.severity];
  };

  return (
    <div className="space-y-2">
      {activeAlerts.map((alert) => {
        const config = getAlertConfig(alert);
        const Icon = config.icon;

        return (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border",
              config.bg,
              config.border
            )}
          >
            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconColor)} />
            <div className="flex-1 min-w-0">
              <p className={cn("font-medium text-sm", config.textColor)}>
                {alert.title}
              </p>
              <p className={cn("text-sm opacity-80", config.textColor)}>
                {alert.message}
              </p>
            </div>
            <button
              onClick={() => onDismiss(alert.id)}
              className={cn(
                "p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                config.iconColor
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
