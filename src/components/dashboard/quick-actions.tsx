"use client";

import { useRouter } from "next/navigation";
import { Plus, Lightbulb, DollarSign, Rocket, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const actions = [
  {
    label: "New Project",
    icon: Plus,
    href: "/projects",
    shortcut: "N",
    variant: "default" as const,
  },
  {
    label: "New Idea",
    icon: Lightbulb,
    href: "/ideas",
    shortcut: "I",
    variant: "outline" as const,
  },
  {
    label: "Log Revenue",
    icon: DollarSign,
    href: "/analytics",
    shortcut: "R",
    variant: "outline" as const,
  },
  {
    label: "Prep Launch",
    icon: Rocket,
    href: "/launch-hub",
    shortcut: "L",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Zap className="h-4 w-4 text-yellow-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              className="h-auto flex-col gap-1 py-3"
              onClick={() => router.push(action.href)}
            >
              <action.icon className="h-4 w-4" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
