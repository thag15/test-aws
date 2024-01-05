import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/apis/:path*"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
