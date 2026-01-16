"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface IdeaInputProps {
  onSubmit: (title: string, description: string) => void;
}

export function IdeaInput({ onSubmit }: IdeaInputProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    setIsValidating(true);

    // Simulate validation delay
    setTimeout(() => {
      onSubmit(title, description);
      setTitle("");
      setDescription("");
      setIsValidating(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Validate Your Idea
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Idea title (e.g., 'AI-powered code review tool')"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Describe your idea in detail. What problem does it solve? Who is it for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Be specific for better validation</span>
            <span>{description.length} characters</span>
          </div>
        </div>
        <Button
          className="w-full gap-2"
          onClick={handleSubmit}
          disabled={!title.trim() || !description.trim() || isValidating}
        >
          {isValidating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Validating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Validate Idea
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
