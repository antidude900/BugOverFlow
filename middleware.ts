import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (!userId && !isPublicRoute(req))
		return NextResponse.redirect(new URL("/sign-in", req.url));

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
