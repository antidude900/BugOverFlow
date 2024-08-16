/* eslint-disable camelcase */
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import { ThemesProvider } from "@/context/ThemesProvider";

const inter = Inter({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
	title: "BugOverFlow",
	description:
		"Have Bugs? Let's fly them away! BugOverFlow is a platform where you can ask your bugs(coding/programming problems) and get them solved by the community.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.variable} ${spaceGrotesk.variable}`}>
				<ClerkProvider
					appearance={{
						elements: {
							formButtonPrimary: "primary-gradient",
							footerActionLink: "primary-text-gradient hover:text-primary-500",
						},
					}}
				>
					<ThemesProvider>{children}</ThemesProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
