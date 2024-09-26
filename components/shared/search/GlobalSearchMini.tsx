"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";

const GlobalMiniSearch = () => {
	const [input, setInput] = useState("");

	return (
		<div className="px-[25px] pt-1.5 lg:hidden">
			<Popover>
				<PopoverTrigger>
					<Image
						src="/assets/icons/search.svg"
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
							placeholder="Search All"
							value={input}
							className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
							onChange={(e) => setInput(e.target.value)}
						/>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default GlobalMiniSearch;
