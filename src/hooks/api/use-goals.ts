import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type {
  SmartGoalRow,
  GoalMilestoneRow,
  AccountabilityCheckinRow,
  InsertTables,
  UpdateTables,
} from "@/types/database.types";
import { useAuth } from "@/components/providers/auth-provider";

interface GoalWithDetails extends SmartGoalRow {
  goal_milestones: GoalMilestoneRow[];
  accountability_checkins: AccountabilityCheckinRow[];
  projects?: {
    name: string;
  } | null;
}

export function useGoals() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async (): Promise<GoalWithDetails[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("smart_goals")
        .select(`
          *,
          goal_milestones(*),
          accountability_checkins(*),
          projects(name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching goals:", error);
        return [];
      }

      return data as GoalWithDetails[];
    },
    enabled: !!user?.id,
  });
}

export function useGoal(goalId: string | null) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["goal", goalId],
    queryFn: async (): Promise<GoalWithDetails | null> => {
      if (!goalId) return null;

      const { data, error } = await supabase
        .from("smart_goals")
        .select(`
          *,
          goal_milestones(*),
          accountability_checkins(*),
          projects(name)
        `)
        .eq("id", goalId)
        .single();

      if (error) {
        console.error("Error fetching goal:", error);
        return null;
      }

      return data as GoalWithDetails;
    },
    enabled: !!goalId,
  });
}

export function useCreateGoal() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: Omit<InsertTables<"smart_goals">, "user_id">) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("smart_goals")
        .insert({
          ...goal,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", user?.id] });
    },
  });
}

export function useUpdateGoal() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateTables<"smart_goals">;
    }) => {
      const { data, error } = await supabase
        .from("smart_goals")
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
      queryClient.invalidateQueries({ queryKey: ["goals", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["goal", data.id] });
    },
  });
}

export function useDeleteGoal() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goalId: string) => {
      const { error } = await supabase
        .from("smart_goals")
        .delete()
        .eq("id", goalId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", user?.id] });
    },
  });
}

// Check-in hooks
export function useCreateCheckin() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (checkin: InsertTables<"accountability_checkins">) => {
      const { data, error } = await supabase
        .from("accountability_checkins")
        .insert(checkin)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["goal", data.goal_id] });
    },
  });
}

// Goal milestone hooks
export function useCreateGoalMilestone() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (milestone: InsertTables<"goal_milestones">) => {
      const { data, error } = await supabase
        .from("goal_milestones")
        .insert(milestone)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["goal", data.goal_id] });
    },
  });
}

export function useUpdateGoalMilestone() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: UpdateTables<"goal_milestones">;
    }) => {
      const { data, error } = await supabase
        .from("goal_milestones")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["goals", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["goal", data.goal_id] });
    },
  });
}
