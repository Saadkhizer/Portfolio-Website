import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/session";

/**
 * Next.js 16 renamed the `middleware` convention to `proxy` — the file and
 * the exported function. Proxy now defaults to the Node.js runtime.
 *
 * IMPORTANT — matcher scope: keep this tight. Matching every route means
 * every page, including ones that need no auth at all, waits on this
 * function (usually a Supabase call) before rendering a single byte. Scope
 * it to only the routes that actually need gating.
 */

const PROTECTED = ["/admin/dashboard"];
const AUTH_PAGES = ["/admin/login"];

export async function proxy(request) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.includes(pathname);

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // /admin/setup is deliberately NOT gated here — it's the one-time bootstrap
  // route that creates the owner account in the first place, so there's no
  // session yet for the proxy to check. It guards itself via ADMIN_SETUP_SECRET.
  matcher: ["/admin/dashboard/:path*", "/admin/login"],
};
