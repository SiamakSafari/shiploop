import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if profile exists, if not create one
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!existingProfile) {
          // Create profile for OAuth user
          const username = user.user_metadata?.user_name ||
            user.user_metadata?.preferred_username ||
            user.email?.split("@")[0] ||
            `user_${user.id.slice(0, 8)}`;

          await supabase.from("profiles").insert({
            id: user.id,
            email: user.email!,
            username: username.toLowerCase(),
            name: user.user_metadata?.full_name || user.user_metadata?.name || username,
            avatar_url: user.user_metadata?.avatar_url || null,
          });

          // Initialize ship score
          await supabase.from("ship_scores").insert({
            user_id: user.id,
            total: 0,
            commits: 0,
            launches: 0,
            revenue: 0,
            growth: 0,
            current_streak: 0,
            longest_streak: 0,
            is_on_fire: false,
          });

          // Initialize global rank
          await supabase.from("global_ranks").insert({
            user_id: user.id,
            position: 0,
            total_users: 0,
            percentile: 100,
            tier: "bronze",
          });
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
