"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const GlobalSearch = () => {
	const [input, setInput] = useState("");
	return (
		<div className="relative flex w-full max-w-[500px] max-lg:hidden">
			<div className="background-light800_darkgradient relative flex min-h-[56px] w-full items-center gap-1 rounded-xl px-4">
				<Image
					src="assets/icons/search.svg"
					alt="search"
					width={24}
					height={24}
					className="cursor-pointer"
					priority
				/>
				<Input
					type="text"
					placeholder="Search All"
					value={input}
					className="paragraph-regular placeholder text-dark400_light700 grow border-none bg-transparent shadow-none outline-none"
					onChange={(e) => setInput(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default GlobalSearch;
