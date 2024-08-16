import React from "react";
import RenderTag from "../RenderTag";

const PopularTags = [
	{ _id: "1", name: "React", totalQuestions: 10 },
	{ _id: "2", name: "JavaScript", totalQuestions: 12 },
	{ _id: "3", name: "TypeScript", totalQuestions: 5 },
	{ _id: "4", name: "Next.js", totalQuestions: 16 },
	{ _id: "5", name: "React Native", totalQuestions: 32 },
];

const RightSideBar = () => {
	return (
		<section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
			<div /* className="mt-16" */>
				<h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
				<div className="mt-7 flex  flex-col gap-4">
					{PopularTags.map((tag) => (
						<RenderTag
							key={tag._id}
							_id={tag._id}
							name={tag.name}
							totalQuestions={tag.totalQuestions}
							showCount
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default RightSideBar;
