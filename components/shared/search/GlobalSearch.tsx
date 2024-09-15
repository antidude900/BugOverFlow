"use client";

import Image from "next/image";
import SearchInput from "./SearchInput";

const GlobalSearch = () => {
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
				<SearchInput />
			</div>
		</div>
	);
};

export default GlobalSearch;
