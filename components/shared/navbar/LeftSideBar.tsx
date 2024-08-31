"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LeftSideBar = () => {
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState(false);
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [isClient, setIsClient] = useState(false);
	const [showText, setShowText] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Handle the timing for showing text
	useEffect(() => {
		let timer: any;

		if (isExpanded) {
			timer = setTimeout(() => setShowText(true), 175); // Faster text appearance
		} else {
			setShowText(false);
		}

		return () => clearTimeout(timer);
	}, [isExpanded]);

	if (!isClient)
		return (
			<div
				className={`background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-[100px] items-center justify-center border-r max-sm:hidden`}
			>
				<div className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></div>
			</div>
		);

	return (
		<section
			onMouseEnter={() => setIsExpanded(true)}
			onMouseLeave={() => setIsExpanded(false)}
			className={`background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-4 pt-28 shadow-light-300 transition-all duration-300 ease-in-out dark:shadow-none max-md:hidden ${
				isExpanded ? "lg:w-[266px]" : "lg:w-[90px]" // Adjust width for expanded and collapsed states
			} z-40`}
		>
			<div className="flex flex-1 flex-col gap-2">
				{sidebarLinks.map((item) => {
					const isActive =
						(pathname.includes(item.route) && item.route.length > 1) ||
						pathname === item.route;
					const isLinkHovered = hoveredLink === item.route;

					return (
						<Link
							key={item.route}
							href={item.route}
							className={`${
								isActive
									? "primary-gradient rounded-lg text-light-900"
									: "text-dark300_light900"
							} ${
								isLinkHovered && !isActive && "active-theme"
							} relative flex h-[60px] w-auto items-center justify-start gap-2 p-2`} // Adjust padding and height
							onMouseEnter={() => setHoveredLink(item.route)}
							onMouseLeave={() => setHoveredLink(null)}
						>
							<Image
								src={item.imgURL}
								alt={item.label}
								width={24} // Adjust icon size if needed
								height={24}
								className={`${isActive ? "" : "invert-colors"}`}
							/>
							{showText && (
								<p
									className={`${
										isActive ? "base-bold" : "base-medium"
									} transition-opacity duration-300 ease-in-out ${
										!isExpanded && "opacity-0"
									} absolute left-[50px]`} // Move text closer
								>
									{item.label}
								</p>
							)}
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default LeftSideBar;
