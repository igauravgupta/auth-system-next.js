import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //gettig path of request
  const path = request.nextUrl.pathname;
  // matching public paths
  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(path);
  //tokens - from frontend
  const token = request.cookies.get("token")?.value || "";
  //condition to check if user is logged in
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup"],
};
