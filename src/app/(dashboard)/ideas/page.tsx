"use client";

import { Lightbulb, Sparkles } from "lucide-react";
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
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-amber-500" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Idea Validator</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
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
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-50">
              <Sparkles className="h-4 w-4 text-primary" />
              Your Ideas
            </h2>
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
              <div className="glass rounded-2xl">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-2xl bg-amber-100 dark:bg-amber-900/30 p-4">
                    <Lightbulb className="h-12 w-12 text-amber-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">No Ideas Yet</h3>
                  <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Enter an idea above to get started with validation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Selected idea details */}
        <div>
          {selectedIdea ? (
            <div className="glass hover-lift sticky top-20 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{selectedIdea.title}</h3>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {selectedIdea.description}
                </p>
                <ValidationScores scores={selectedIdea.scores} />
                {selectedIdea.notes && (
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      Notes
                    </p>
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">{selectedIdea.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl">
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Select an idea to view detailed validation scores
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
