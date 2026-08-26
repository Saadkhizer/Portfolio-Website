import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

/** Auth is not worth hanging a page over. */
const AUTH_TIMEOUT_MS = 5000;

/**
 * Refreshes the auth session and keeps cookies in sync between the browser
 * and Server Components. Returns the response (carrying refreshed cookies)
 * and the resolved user.
 *
 * Called from src/proxy.js — Next.js 16 renamed the middleware convention to
 * proxy (file and exported function). Do not name this file middleware.js.
 */
export async function updateSession(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: getUser() revalidates the token. Do not insert logic between
  // createServerClient and this call.
  //
  // Time-bounded on purpose: an unreachable Supabase (VPN, firewall, offline,
  // paused project) must not leave the request hanging forever. Treat a
  // timeout as "not signed in" — protected routes then redirect to /login,
  // which is the correct safe default.
  let user = null;
  try {
    const result = await Promise.race([
      supabase.auth.getUser(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Supabase auth timed out")), AUTH_TIMEOUT_MS)
      ),
    ]);
    user = result?.data?.user ?? null;
  } catch (error) {
    console.warn(`[proxy] auth check failed: ${error.message}`);
    user = null;
  }

  return { response, user };
}
