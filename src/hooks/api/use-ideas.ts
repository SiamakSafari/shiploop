import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { IdeaRow, InsertTables, UpdateTables } from "@/types/database.types";
import { useAuth } from "@/components/providers/auth-provider";

export function useIdeas() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["ideas", user?.id],
    queryFn: async (): Promise<IdeaRow[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching ideas:", error);
        return [];
      }

      return data;
    },
    enabled: !!user?.id,
  });
}

export function useIdea(ideaId: string | null) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["idea", ideaId],
    queryFn: async (): Promise<IdeaRow | null> => {
      if (!ideaId) return null;

      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .eq("id", ideaId)
        .single();

      if (error) {
        console.error("Error fetching idea:", error);
        return null;
      }

      return data;
    },
    enabled: !!ideaId,
  });
}

export function useCreateIdea() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idea: Omit<InsertTables<"ideas">, "user_id">) => {
      if (!user?.id) throw new Error("Not authenticated");

      // Calculate overall score
      const overall = Math.round(
        ((idea.demand ?? 0) + (100 - (idea.competition ?? 0)) + (idea.feasibility ?? 0)) / 3
      );

      const { data, error } = await supabase
        .from("ideas")
        .insert({
          ...idea,
          user_id: user.id,
          overall,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas", user?.id] });
    },
  });
}

export function useUpdateIdea() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateTables<"ideas">;
    }) => {
      // Recalculate overall if scores are updated
      let overall = updates.overall;
      if (
        updates.demand !== undefined ||
        updates.competition !== undefined ||
        updates.feasibility !== undefined
      ) {
        // Fetch current values if not all are provided
        const { data: current } = await supabase
          .from("ideas")
          .select("demand, competition, feasibility")
          .eq("id", id)
          .single();

        if (current) {
          const demand = updates.demand ?? current.demand;
          const competition = updates.competition ?? current.competition;
          const feasibility = updates.feasibility ?? current.feasibility;
          overall = Math.round((demand + (100 - competition) + feasibility) / 3);
        }
      }

      const { data, error } = await supabase
        .from("ideas")
        .update({
          ...updates,
          overall,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ideas", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["idea", data.id] });
    },
  });
}

export function useDeleteIdea() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ideaId: string) => {
      const { error } = await supabase.from("ideas").delete().eq("id", ideaId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas", user?.id] });
    },
  });
}

export function useConvertIdeaToProject() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ideaId: string) => {
      if (!user?.id) throw new Error("Not authenticated");

      // Get the idea
      const { data: idea, error: ideaError } = await supabase
        .from("ideas")
        .select("*")
        .eq("id", ideaId)
        .single();

      if (ideaError || !idea) throw new Error("Idea not found");

      // Create project from idea
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          user_id: user.id,
          name: idea.title,
          description: idea.description,
          status: "building" as const,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Update idea with reference to project
      await supabase
        .from("ideas")
        .update({
          status: "validated" as const,
          converted_to_project_id: project.id,
          updated_at: new Date().toISOString(),
        })
        .eq("id", ideaId);

      return project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
    },
  });
}
