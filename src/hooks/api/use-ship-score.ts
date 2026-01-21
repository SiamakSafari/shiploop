import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { ShipScoreRow, GlobalRankRow, UpdateTables } from "@/types/database.types";
import { useAuth } from "@/components/providers/auth-provider";

interface ShipScoreWithRank {
  score: ShipScoreRow | null;
  rank: GlobalRankRow | null;
}

export function useShipScore() {
  const { user } = useAuth();
  const supabase = createClient();

  return useQuery({
    queryKey: ["ship-score", user?.id],
    queryFn: async (): Promise<ShipScoreWithRank> => {
      if (!user?.id) return { score: null, rank: null };

      const [scoreResult, rankResult] = await Promise.all([
        supabase
          .from("ship_scores")
          .select("*")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("global_ranks")
          .select("*")
          .eq("user_id", user.id)
          .single(),
      ]);

      return {
        score: scoreResult.data,
        rank: rankResult.data,
      };
    },
    enabled: !!user?.id,
  });
}

export function useUpdateShipScore() {
  const { user } = useAuth();
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdateTables<"ship_scores">) => {
      if (!user?.id) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("ship_scores")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ship-score", user?.id] });
    },
  });
}

export function useLeaderboard(limit = 10) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["leaderboard", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ship_scores")
        .select(`
          *,
          profiles!inner(id, username, name, avatar_url)
        `)
        .order("total", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
      }

      return data;
    },
  });
}
