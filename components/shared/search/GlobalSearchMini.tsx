"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react"; // added

const GlobalSearch = () => {
	const [input, setInput] = useState(""); // added
	const [screenSize, setScreenSize] = useState(0);
	window.addEventListener("resize", () => {
		setScreenSize(window.innerWidth);
	});

	return (
		<div className={`${screenSize > 1130 ? "hidden" : ""} px-[25px] pt-1.5`}>
			<Popover>
				<PopoverTrigger>
					<Image
						src="assets/icons/search.svg"
						alt="search"
						width={24}
						height={24}
						className="cursor-pointer"
					/>
				</PopoverTrigger>
				<PopoverContent className="background-light900_dark200 border-none">
					<div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl">
						<Input
							type="text"
							placeholder="Search Globally"
							value={input} // added
							className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
							onChange={(e) => setInput(e.target.value)} // added
						/>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default GlobalSearch;
