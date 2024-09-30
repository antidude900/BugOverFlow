import React from "react";
import RenderTag from "../RenderTag";
import { getPopularTags } from "@/lib/actions/tag.action";


const RightSideBar = async () => {
	const result = await getPopularTags({})
	return (
		<section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[300px] flex-col overflow-y-auto border-l p-6 pt-28 shadow-light-300 dark:shadow-none max-xl:hidden">
			<h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

			<div className="mt-7 flex  flex-col gap-4">
				{result.tags.map((tag) => (
					<RenderTag
						key={tag._id}
						_id={tag._id}
						name={tag.name}
						totalQuestions={tag.questionsCount}
						showCount
					/>
				))}
			</div>
		</section>
	);
};

export default RightSideBar;
