"use client";

import Image from "next/image";


const Icon = () => {
	return (
		<>
			<Image
				src="/assets/images/final2.png"
				width={50}
				height={50}
				alt="StackOverflow"
				className="hidden pb-[25px] dark:flex"
			/>

			<Image
				src="/assets/images/final1.png"
				width={50}
				height={50}
				alt="StackOverflow"
				className="pb-[25px] dark:hidden"
			/>
		</>
	);
};

export default Icon;
