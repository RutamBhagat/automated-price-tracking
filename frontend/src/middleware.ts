import { type NextRequest } from "next/server";
import { auth } from "@/server/auth/index";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
export default auth(async function middleware(req: NextRequest) {
  console.log("Runtime Environment:", process.env.NEXT_RUNTIME);
  const newUrl = new URL("/login", req.nextUrl.origin);
  return Response.redirect(newUrl);
});

export const config = {
  matcher: ["/"],
};
