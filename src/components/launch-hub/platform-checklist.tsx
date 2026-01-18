"use client";

import { Check, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@/components/ui/icon";
import { cn, getPlatformDisplayName } from "@/lib/utils";
import { LaunchPlatformStatus, LaunchPlatform } from "@/types";

const platformIcons: Record<LaunchPlatform, string> = {
  product_hunt: "rocket",
  indie_hackers: "lightbulb",
  hacker_news: "newspaper",
  reddit: "link",
  twitter: "twitter",
};

interface PlatformChecklistProps {
  platform: LaunchPlatformStatus;
  onToggleItem: (itemId: string) => void;
}

export function PlatformChecklist({
  platform,
  onToggleItem,
}: PlatformChecklistProps) {
  const completedItems = platform.checklist.filter((item) => item.completed).length;
  const totalItems = platform.checklist.length;
  const isComplete = completedItems === totalItems;

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon name={platformIcons[platform.platform]} size={20} className="text-primary" />
            {getPlatformDisplayName(platform.platform)}
          </CardTitle>
          <Badge
            variant="secondary"
            className={cn(
              isComplete
                ? "bg-green-500/20 text-green-500"
                : "bg-muted text-muted-foreground"
            )}
          >
            {completedItems}/{totalItems}
          </Badge>
        </div>
        <Progress value={platform.progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {platform.checklist.map((item) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-border p-3 transition-colors",
                item.completed && "bg-muted/50"
              )}
            >
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => onToggleItem(item.id)}
              />
              <label
                htmlFor={item.id}
                className={cn(
                  "flex-1 cursor-pointer text-sm",
                  item.completed && "line-through text-muted-foreground"
                )}
              >
                {item.label}
              </label>
              {item.required && (
                <Badge variant="outline" className="text-[10px]">
                  Required
                </Badge>
              )}
            </div>
          ))}
        </div>

        {/* AI Copy Button */}
        <Button className="w-full gap-2" variant="outline" disabled>
          <Sparkles className="h-4 w-4" />
          Generate AI Copy
          <Badge variant="secondary" className="ml-1 text-[10px]">
            Coming Soon
          </Badge>
        </Button>

        {isComplete && (
          <div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 py-3 text-sm text-green-500">
            <Check className="h-4 w-4" />
            Ready to launch!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
