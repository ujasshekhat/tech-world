import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const createClient = () => {
  // Guard: don't crash during SSG if env vars aren't set
  if (!supabaseUrl.startsWith("http") || !supabaseKey) {
    return null as unknown as ReturnType<typeof createBrowserClient>;
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
};
