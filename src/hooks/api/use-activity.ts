import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { ActivityItemRow, InsertTables } from "@/types/database.types";
import { useAuth } from "@/components/providers/auth-provider";

interface ActivityWithProject extends ActivityItemRow {
  projects?: {
    name: string;
  } | null;
}

export function useActivity(limit = 20) {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["activity", user?.id, limit],
    queryFn: async (): Promise<ActivityWithProject[]> => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("activity_items")
        .select(`
          *,
          projects(name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching activity:", error);
        return [];
      }

      return data as ActivityWithProject[];
    },
    enabled: !!user?.id,
  });
}

export function useCreateActivity() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activity: Omit<InsertTables<"activity_items">, "user_id">) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("activity_items")
        .insert({
          ...activity,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity", user?.id] });
    },
  });
}
