import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const isPublicRoute = createRouteMatcher([
	"/",
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/api/webhook(.*)",
]);

const loginPaths = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, req, evt) => {
	const { userId } = auth();
	const isAccessingSignInPage = loginPaths(req);

	if (userId && isPublicRoute(req) && isAccessingSignInPage) {
		return redirect("/");
	}

	if (!userId && !isPublicRoute(req)) return redirect("/sign-in");
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
