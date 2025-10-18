import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(request) {
  if (
    !request.auth &&
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/api/auth/signin") &&
    !request.nextUrl.pathname.startsWith("/api/auth/callback/nodemailer")
  ) {
    const newUrl = new URL("/api/auth/signin", request.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
