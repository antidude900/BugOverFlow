"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const LeftSideBar = () => {
	const pathname = usePathname();
	const [isExpanded, 	setIsExpanded] = useState(false);
	const [hoveredLink, setHoveredLink] = useState<string | null>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

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
			className={`background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r pt-28 shadow-light-300 transition-all duration-100 ease-in-out dark:shadow-none max-md:hidden ${
				isExpanded ? "w-[266px]" : "w-[90px]"
			} z-40`}
		>
			<div className="flex flex-1 flex-col gap-1.5">
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
									? "primary-gradient text-light-900"
									: "text-dark300_light900"
							} ${
								isLinkHovered && !isActive && "bg-slate-100 dark:bg-dark-400"
							} relative flex h-[60px] w-full	 items-center ${isExpanded ? "justify-start" : "justify-center"} justify-start gap-4  rounded-lg p-4`} // Make width full and height larger
							onMouseEnter={() => setHoveredLink(item.route)}
							onMouseLeave={() => setHoveredLink(null)}
						>
							<Image
								src={item.imgURL}
								alt={item.label}
								width={20}
								height={20}
								className={`${isActive ? "" : "invert-colors"}`}
							/>

							<p
								className={`${
									isActive ? "base-bold" : "base-medium"
								} line-clamp-1 ${!isExpanded && "hidden"}`}
							>
								{item.label}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default LeftSideBar;
