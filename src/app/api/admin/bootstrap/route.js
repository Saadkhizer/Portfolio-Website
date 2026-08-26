import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * One-time owner account creation. Gated by ADMIN_SETUP_SECRET (server-only
 * env var, never shipped to the client) rather than any in-app check, since
 * the anon-key client can't query auth.users to see whether an owner already
 * exists. After the real owner signs up here once, blank out
 * ADMIN_SETUP_SECRET in .env.local (or the host's env vars) so this route
 * always rejects — /admin/setup itself is intentionally left in the repo,
 * it just becomes permanently inert without a matching secret.
 */
export async function POST(request) {
  const { email, password, secret } = await request.json();

  if (!secret || secret !== process.env.ADMIN_SETUP_SECRET) {
    return NextResponse.json({ error: "Invalid setup secret." }, { status: 403 });
  }

  if (!email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Email and an 8+ character password are required." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    userId: data.user?.id ?? null,
    needsEmailConfirmation: !data.session,
  });
}
