"use client";
import { HomePageFilters } from "@/constants/filters";
import React from "react";
import { Button } from "../ui/button";

const HomeFilters = () => {
	const isActive = "recommended";
	return (
		<div className="mt-10 hidden flex-wrap gap-3 md:flex">
			{HomePageFilters.map((filter) => (
				<Button
					key={filter.value}
					onClick={() => {}}
					className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
						isActive === filter.value
							? "bg-light-700 text-primary-500 hover:bg-light-800 dark:bg-dark-400 dark:hover:bg-dark-300"
							: "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
					}`}
				>
					<p className={`${isActive === filter.value && "body-semibold"}`}>
						{filter.name}
					</p>
				</Button>
			))}
		</div>
	);
};

export default HomeFilters;
