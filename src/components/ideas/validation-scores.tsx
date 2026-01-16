"use client";

import { TrendingUp, Users, Wrench, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { IdeaScores } from "@/types";

interface ValidationScoresProps {
  scores: IdeaScores;
  className?: string;
}

export function ValidationScores({ scores, className }: ValidationScoresProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <ScoreGauge
        label="Demand"
        value={scores.demand}
        icon={Users}
        description="Market interest level"
        goodThreshold={70}
      />
      <ScoreGauge
        label="Competition"
        value={scores.competition}
        icon={Target}
        description="Lower is better"
        goodThreshold={40}
        invertColor
      />
      <ScoreGauge
        label="Feasibility"
        value={scores.feasibility}
        icon={Wrench}
        description="Build complexity"
        goodThreshold={70}
      />
      <ScoreGauge
        label="Overall"
        value={scores.overall}
        icon={TrendingUp}
        description="Combined score"
        goodThreshold={70}
        highlight
      />
    </div>
  );
}

interface ScoreGaugeProps {
  label: string;
  value: number;
  icon: typeof TrendingUp;
  description: string;
  goodThreshold: number;
  invertColor?: boolean;
  highlight?: boolean;
}

function ScoreGauge({
  label,
  value,
  icon: Icon,
  description,
  goodThreshold,
  invertColor = false,
  highlight = false,
}: ScoreGaugeProps) {
  const isGood = invertColor ? value <= goodThreshold : value >= goodThreshold;

  return (
    <div
      className={cn(
        "rounded-lg border border-border p-4",
        highlight && "border-primary bg-primary/5"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span
          className={cn(
            "text-2xl font-bold",
            isGood ? "text-green-500" : "text-yellow-500"
          )}
        >
          {value}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isGood ? "bg-green-500" : "bg-yellow-500"
          )}
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
