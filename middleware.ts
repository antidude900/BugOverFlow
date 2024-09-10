import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
	"/",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/webhook(.*)",
]);

const isIgnoredRoute = createRouteMatcher(["/api/webhook"]);

export default clerkMiddleware((auth, req) => {
	if (isPublicRoute(req)) return; // if it's a public route, do nothing
	auth().protect();
  if 
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*),", "/api/webhook(.*)",],
};
