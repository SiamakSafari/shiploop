import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";
import { createMockClient } from "./mock-client";

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};

export function createClient() {
  if (!isSupabaseConfigured()) {
    // Return mock client in dev mode
    return createMockClient() as any;
  }
  
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
