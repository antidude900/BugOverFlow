"use client";

import { sidebarLinks } from "@/constants";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

import React, { useState } from "react";

const LeftSideBar = () => {
	const pathname = usePathname();
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<>
			<section
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
				className={`background-light900_dark200 light-border custom-scrollbar ${!isExpanded && "sticky"} left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden  ${isExpanded && "fixed lg:w-[266px]"} z-40 transition-all duration-300`}
			>
				<div className="flex flex-1 flex-col gap-6">
					{sidebarLinks.map((item) => {
						const isActive =
							(pathname.includes(item.route) && item.route.length > 1) ||
							pathname === item.route;

						// TODO

						return (
							<Link
								key={item.route}
								href={item.route}
								className={`${
									isActive
										? "primary-gradient rounded-lg text-light-900"
										: "text-dark300_light900"
								} flex items-center justify-start gap-4 bg-transparent p-4`}
							>
								<Image
									src={item.imgURL}
									alt={item.label}
									width={20}
									height={20}
									className={`${isActive ? "" : "invert-colors"}`}
								/>
								<p
									className={`${isActive ? "base-bold" : "base-medium"} ${!isExpanded && "hidden"}`}
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
					className={`sticky left-0 top-0 h-screen w-[100px] border-r p-6 max-sm:hidden `}
				></section>
			)}
		</>
	);
};

export default LeftSideBar;
