import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Keboola POSTs to / on container startup as a health probe. Next.js'
 * app router returns 405 for POST on a page route by default, which
 * makes the deploy appear broken even though every other route works.
 *
 * Intercept POST/HEAD/OPTIONS on / and return 200. Everything else
 * falls through to the page renderer.
 */
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/" && req.method !== "GET") {
    return NextResponse.json({ ok: true, app: "meridian" }, { status: 200 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
