"use client";

import { useConfetti } from "@/hooks/use-confetti";
import { Button } from "./button";
import { Sparkles, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfettiTriggerProps {
  variant?: "button" | "icon" | "hidden";
  className?: string;
  onTrigger?: () => void;
}

/**
 * A component that triggers confetti celebrations
 * Can be used as a button or triggered programmatically
 */
export function ConfettiTrigger({
  variant = "button",
  className,
  onTrigger,
}: ConfettiTriggerProps) {
  const { celebrate, fireworks } = useConfetti();

  const handleClick = () => {
    celebrate();
    setTimeout(() => fireworks(), 500);
    onTrigger?.();
  };

  if (variant === "hidden") {
    return null;
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center",
          "bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
          className
        )}
        aria-label="Celebrate"
      >
        <PartyPopper className="h-4 w-4" />
      </button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
    >
      <Sparkles className="h-4 w-4" />
      Celebrate
    </Button>
  );
}

/**
 * Hook to programmatically trigger celebrations
 * Re-exports useConfetti for convenience
 */
export { useConfetti };
