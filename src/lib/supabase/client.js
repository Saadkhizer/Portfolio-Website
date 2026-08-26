import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for Client Components ("use client").
 * Safe in the browser: only ever uses the publishable/anon key.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
