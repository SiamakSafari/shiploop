"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  projectName: string;
}

export function CountdownTimer({ targetDate, projectName }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetDate);

  if (isComplete) {
    return (
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent" />
        <CardContent className="relative flex flex-col items-center justify-center py-8">
          <Icon name="party-popper" size={40} className="text-primary" />
          <h2 className="mt-2 text-2xl font-bold">Launch Day!</h2>
          <p className="text-muted-foreground">Time to ship {projectName}!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <CardContent className="relative py-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Launching <span className="font-medium text-foreground">{projectName}</span> in
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <TimeBlock value={days} label="Days" />
            <TimeBlock value={hours} label="Hours" />
            <TimeBlock value={minutes} label="Minutes" />
            <TimeBlock value={seconds} label="Seconds" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-lg bg-muted text-2xl font-bold",
          "md:h-20 md:w-20 md:text-3xl"
        )}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
