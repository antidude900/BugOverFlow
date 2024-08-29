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
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient)
		return (
			<div
				className={`background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-[100px] items-center justify-center border-r max-sm:hidden `}
			>
				<div className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></div>
			</div>
		);

	return (
		<>
			<section
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
				className={`background-light900_dark200 light-border custom-scrollbar ${!isExpanded && "sticky"} left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-28 shadow-light-300 dark:shadow-none max-md:hidden  ${isExpanded && "fixed lg:w-[266px]"} z-40`}
			>
				<div className="flex flex-1 flex-col gap-6">
					{sidebarLinks.map((item) => {
						const isActive =
							(pathname.includes(item.route) && item.route.length > 1) ||
							pathname === item.route;
						const isLinkHovered = hoveredLink === item.route;

						// TODO

						return (
							<Link
								key={item.route}
								href={item.route}
								className={`${
									isActive
										? "primary-gradient rounded-lg text-light-900"
										: "text-dark300_light900"
								} ${isLinkHovered && !isActive && "active-theme"} flex items-center justify-start gap-4 p-4`}
								onMouseEnter={() => setHoveredLink(item.route)}
								onMouseLeave={() => setHoveredLink(null)}
							>
								<Image
									src={item.imgURL}
									alt={item.label}
									width={20}
									height={20}
									className={`${isActive ? "" : "invert-colors"} `}
								/>
								<p
									className={`${isActive ? "base-bold" : "base-medium"} ${!isExpanded && "hidden"} max-lg:hidden`}
								>
									{item.label}
								</p>
							</Link>
						);
					})}
				</div>
			</section>

			{isExpanded && (
				<section
					className={"sticky left-0 top-0 h-screen w-[100px] border-r"}
				></section>
			)}
		</>
	);
};

export default LeftSideBar;
