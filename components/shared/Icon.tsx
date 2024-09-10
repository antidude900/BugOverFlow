import Image from "next/image";

const Icon = () => {
	return (
		<>
			<Image
				src="/assets/images/final2.png"
				width={40}
				height={40}
				alt="StackOverflow"
				className="mt-[20px] hidden size-auto pb-[25px] dark:flex"
			/>

			<Image
				src="/assets/images/final1.png"
				width={40}
				height={40}
				alt="StackOverflow"
				className="mt-[20px] size-auto pb-[25px] dark:hidden"
			/>
		</>
	);
};

export default Icon;
