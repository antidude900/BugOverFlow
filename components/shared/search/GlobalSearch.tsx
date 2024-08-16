"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react"; // added

const GlobalSearch = () => {
	const [input, setInput] = useState(""); // added
	const [screenSize, setScreenSize] = useState(0);
	window.addEventListener("resize", () => {
		setScreenSize(window.innerWidth);
	});

	return (
		<div
			className={`relative w-full max-w-[600px] ${screenSize < 1130 ? "hidden" : ""}`}
		>
			<div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
				<Image
					src="assets/icons/search.svg"
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer"
				/>
				<Input
					type="text"
					placeholder="Search Globally"
					value={input} // added
					className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
					onChange={(e) => setInput(e.target.value)} // added
				/>
			</div>
		</div>
	);
};

export default GlobalSearch;
