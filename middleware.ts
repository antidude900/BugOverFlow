import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
	"/",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/webhook(.*)",
]);

export default clerkMiddleware((auth, req) => {
	if (isPublicRoute(req)) return; // if it's a public route, do nothing
	auth().protect();
});

export const config = {
	matcher: [
		"/((?!.*\\..*|_next).*)",
		"/",
		"/(api|trpc)(.*),",
		"/api/webhook(.*)",
	],
};
