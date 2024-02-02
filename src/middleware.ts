import { auth } from "@/lib/auth";

export default auth;

export const config = {
  // auth.js auth interceptor middleware
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (login, register, forgot password, reset password etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};
