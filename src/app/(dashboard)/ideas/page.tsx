"use client";

import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdeaInput, IdeaCard, ValidationScores } from "@/components/ideas";
import { useIdeasStore } from "@/stores";

export default function IdeasPage() {
  const {
    ideas,
    selectedIdeaId,
    addIdea,
    deleteIdea,
    validateIdea,
    selectIdea,
  } = useIdeasStore();

  const selectedIdea = ideas.find((idea) => idea.id === selectedIdeaId);

  const handleSubmit = (title: string, description: string) => {
    addIdea({
      title,
      description,
      scores: { demand: 0, competition: 0, feasibility: 0, overall: 0 },
      status: "pending",
    });
  };

  const handleConvert = (ideaId: string) => {
    // In a real app, this would create a project and link it
    alert("This would create a new project from the idea!");
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Idea Validator</h1>
        <p className="text-muted-foreground">
          Validate your ideas before you build. Get instant market analysis.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Input and cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* Idea input */}
          <IdeaInput onSubmit={handleSubmit} />

          {/* Ideas list */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your Ideas</h2>
            {ideas.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onDelete={deleteIdea}
                    onRevalidate={validateIdea}
                    onConvert={handleConvert}
                    isSelected={selectedIdeaId === idea.id}
                    onSelect={selectIdea}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No Ideas Yet</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Enter an idea above to get started with validation.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Right column - Selected idea details */}
        <div>
          {selectedIdea ? (
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">{selectedIdea.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {selectedIdea.description}
                </p>
                <ValidationScores scores={selectedIdea.scores} />
                {selectedIdea.notes && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Notes
                    </p>
                    <p className="mt-1 text-sm">{selectedIdea.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-muted-foreground">
                  Select an idea to view detailed validation scores
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
