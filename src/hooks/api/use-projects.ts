import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow, MilestoneRow, InsertTables, UpdateTables } from "@/types/database.types";
import { useAuth } from "@/components/providers/auth-provider";

interface ProjectWithMilestones extends ProjectRow {
  milestones: MilestoneRow[];
}

export function useProjects() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["projects", user?.id],
    queryFn: async (): Promise<ProjectWithMilestones[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          milestones(*)
        `)
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        return [];
      }

      return data as ProjectWithMilestones[];
    },
    enabled: !!user?.id,
  });
}

export function useProject(projectId: string | null) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async (): Promise<ProjectWithMilestones | null> => {
      if (!projectId) return null;

      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          milestones(*)
        `)
        .eq("id", projectId)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        return null;
      }

      return data as ProjectWithMilestones;
    },
    enabled: !!projectId,
  });
}

export function useCreateProject() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: Omit<InsertTables<"projects">, "user_id">) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("projects")
        .insert({
          ...project,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
    },
  });
}

export function useUpdateProject() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateTables<"projects">;
    }) => {
      const { data, error } = await supabase
        .from("projects")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["project", data.id] });
    },
  });
}

export function useDeleteProject() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
    },
  });
}

// Milestone hooks
export function useCreateMilestone() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestone: InsertTables<"milestones">) => {
      const { data, error } = await supabase
        .from("milestones")
        .insert(milestone)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["project", data.project_id] });
    },
  });
}

export function useUpdateMilestone() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateTables<"milestones">;
    }) => {
      const { data, error } = await supabase
        .from("milestones")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["project", data.project_id] });
    },
  });
}

export function useDeleteMilestone() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, projectId }: { id: string; projectId: string }) => {
      const { error } = await supabase.from("milestones").delete().eq("id", id);

      if (error) throw error;
      return projectId;
    },
    onSuccess: (projectId) => {
      queryClient.invalidateQueries({ queryKey: ["projects", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
}
