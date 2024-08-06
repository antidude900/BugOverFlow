import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./navbar/RenderTag";

const hotQuestions = [
	{
		_id: 1,
		title:
			"Bst practices for data fetching in a Next.js application with Server-Side Rendering (SSR)? to create a custom hook in React?",
	},
	{
		_id: 2,
		title:
			"Is it only me or the font is bolder than necessary?ow to create a custom hook in React?",
	},
	{
		_id: 3,
		title:
			"Redux Toolkit Not Updating State as Expecte to create a custom hook in React?",
	},
	{ _id: 4, title: "Can I get the course for free?" },
	{ _id: 5, title: "Async/Await Function Not Handling Errors Properly" },
];

const PopularTags = [
	{ _id: 1, name: "React", totalQuestions: 10 },
	{ _id: 2, name: "JavaScript", totalQuestions: 12 },
	{ _id: 3, name: "TypeScript", totalQuestions: 5 },
	{ _id: 4, name: "Next.js", totalQuestions: 16 },
	{ _id: 5, name: "React Native", totalQuestions: 32 },
];

const RightSideBar = () => {
	return (
		<section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
			<div>
				<h3 className="h3-bold text-dark200_light900">Top Questions</h3>
				<div className="mt-7 flex w-full flex-col gap-[30px]">
					{hotQuestions.map((question) => (
						<Link
							href={`/questions/${question._id}`}
							key={question._id}
							className="flex cursor-pointer items-center justify-between gap-9"
						>
							<p className="body-medium text-dark500_light700">
								{question.title}
							</p>

							<Image
								src="assets/icons/chevron-right.svg"
								width={20}
								height={20}
								className="invert-colors"
								alt="chevron-right"
							/>
						</Link>
					))}
				</div>
			</div>
			<div className="mt-16">
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
