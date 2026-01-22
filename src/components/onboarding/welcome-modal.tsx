"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Rocket,
  Target,
  Flame,
  Trophy,
  ArrowRight,
  Check,
  Github,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeModalProps {
  open: boolean;
  onComplete: () => void;
}

const steps = [
  {
    id: "welcome",
    title: "Welcome to ShipLoop!",
    description: "The operating system for indie hackers. Track your progress, maintain streaks, and ship faster.",
    icon: Rocket,
    content: (
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <Flame className="h-8 w-8 mx-auto mb-2 text-[#E8945A]" />
          <div className="font-semibold">Shipping Streaks</div>
          <div className="text-sm text-muted-foreground">Stay consistent</div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <Target className="h-8 w-8 mx-auto mb-2 text-[#7CB4C4]" />
          <div className="font-semibold">Ship Score</div>
          <div className="text-sm text-muted-foreground">Track progress</div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-[#D4AF37]" />
          <div className="font-semibold">Leaderboard</div>
          <div className="text-sm text-muted-foreground">Compete globally</div>
        </div>
        <div className="p-4 rounded-xl bg-muted/50 text-center">
          <Zap className="h-8 w-8 mx-auto mb-2 text-purple-500" />
          <div className="font-semibold">Launch Hub</div>
          <div className="text-sm text-muted-foreground">Plan launches</div>
        </div>
      </div>
    ),
  },
  {
    id: "ship-score",
    title: "Your Ship Score",
    description: "Your Ship Score measures your indie hacker productivity across 4 dimensions.",
    icon: Target,
    content: (
      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <div className="h-10 w-10 rounded-full bg-[#7CB4C4]/20 flex items-center justify-center">
            <span className="text-[#7CB4C4] font-bold">25</span>
          </div>
          <div>
            <div className="font-medium">Commits</div>
            <div className="text-sm text-muted-foreground">Code you ship</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <div className="h-10 w-10 rounded-full bg-[#6BBF8A]/20 flex items-center justify-center">
            <span className="text-[#6BBF8A] font-bold">25</span>
          </div>
          <div>
            <div className="font-medium">Launches</div>
            <div className="text-sm text-muted-foreground">Products released</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <div className="h-10 w-10 rounded-full bg-[#6BBF8A]/20 flex items-center justify-center">
            <span className="text-[#6BBF8A] font-bold">25</span>
          </div>
          <div>
            <div className="font-medium">Revenue</div>
            <div className="text-sm text-muted-foreground">Money earned</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-500 font-bold">25</span>
          </div>
          <div>
            <div className="font-medium">Growth</div>
            <div className="text-sm text-muted-foreground">User acquisition</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "streaks",
    title: "Maintain Your Streak",
    description: "Ship something every day to build momentum. Your streak is your commitment to consistent progress.",
    icon: Flame,
    content: (
      <div className="mt-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                day <= 5
                  ? "bg-[#E8945A] text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {day <= 5 ? <Check className="h-5 w-5" /> : day}
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-[#E8945A]">5 days</div>
          <div className="text-muted-foreground">Current streak</div>
        </div>
        <div className="mt-4 p-4 rounded-xl bg-[#E8945A]/10 border border-[#E8945A]/20">
          <p className="text-sm text-center">
            <Flame className="inline h-4 w-4 text-[#E8945A] mr-1" />
            Ship once a day to keep your streak alive!
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "get-started",
    title: "Ready to Ship?",
    description: "Create your first project and start building your Ship Score today.",
    icon: Rocket,
    content: (
      <div className="space-y-4 mt-6">
        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Github className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">Connect GitHub</div>
              <div className="text-sm text-muted-foreground">Auto-track your commits</div>
            </div>
          </div>
          <Button variant="outline" className="w-full" disabled>
            Coming soon
          </Button>
        </div>
        <div className="p-4 rounded-xl border border-primary bg-primary/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-medium">Create a Project</div>
              <div className="text-sm text-muted-foreground">Start tracking manually</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Add your first project to begin your indie hacker journey.
          </p>
        </div>
      </div>
    ),
  },
];

export function WelcomeModal({ open, onComplete }: WelcomeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      router.push("/dashboard/projects");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <step.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">{step.title}</DialogTitle>
              <div className="text-xs text-muted-foreground mt-0.5">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          </div>
          <DialogDescription>{step.description}</DialogDescription>
        </DialogHeader>

        {step.content}

        <div className="mt-6 space-y-4">
          <Progress value={progress} className="h-1" />
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
              Skip tour
            </Button>
            <Button onClick={handleNext}>
              {isLastStep ? (
                <>
                  Create Project
                  <Rocket className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
