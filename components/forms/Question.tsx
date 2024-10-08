"use client";
import React, { useRef, useState } from "react";

import { Editor } from "@tinymce/tinymce-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validation";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { createQuestion, EditQuestion } from "@/lib/actions/question.action";
import { useTheme } from "next-themes";

interface Props {
	type?: string;
	mongoUserId: string;
	questionDetails?: string;
}

const Question = ({ type, mongoUserId, questionDetails }: Props) => {
	const { resolvedTheme } = useTheme();
	const editorRef = useRef(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const pathname = usePathname();
	const Router = useRouter();

	const parsedQuestionDetails =
		questionDetails && JSON.parse(questionDetails || "");

	const groupedTags = parsedQuestionDetails?.tags.map((tag: any) => tag.name);

	const form = useForm<z.infer<typeof QuestionsSchema>>({
		resolver: zodResolver(QuestionsSchema),
		defaultValues: {
			title: parsedQuestionDetails?.title || "",
			explanation: parsedQuestionDetails?.content || "",
			tags: groupedTags || [],
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		setIsSubmitting(true);

		try {
			if (type === "Edit") {
				await EditQuestion({
					questionId: parsedQuestionDetails._id,
					title: values.title,
					content: values.explanation,
					path: pathname,
				});
				Router.push(`/question/${parsedQuestionDetails._id}`);
			} else {
				await createQuestion({
					title: values.title,
					content: values.explanation,
					tags: values.tags,
					author: JSON.parse(mongoUserId),
					path: pathname,
				});

				Router.push("/");
			}
		} catch (error) {
		} finally {
			setIsSubmitting(false);
		}
	}

	function handleInputKeyDown(
		e: React.KeyboardEvent<HTMLInputElement>,
		field: any
	) {
		if (e.key === "Enter" && field.name === "tags") {
			e.preventDefault();

			const tagInput = e.target as HTMLInputElement;
			const tagValue = tagInput.value.trim();

			if (tagValue !== "") {
				if (tagValue.length > 15) {
					return form.setError("tags", {
						type: "required",
						message: "Tag must be less than 15 characters",
					});
				}

				if (field.value.length === 3) {
					return form.setError("tags", {
						type: "required",
						message: "You can only add up to 3 tags",
					});
				}
				if (!field.value.includes(tagValue.toUpperCase() as never)) {
					form.setValue("tags", [...field.value, tagValue.toUpperCase()]);
					tagInput.value = "";
					form.clearErrors("tags");
				} else {
					form.setError("tags", {
						type: "required",
						message: "Tag already exists",
					});
				}
			}
		}
	}

	function handleTagRemove(tag: string, field: any) {
		const newTags = field.value.filter((t: string) => t !== tag);
		form.setValue("tags", newTags);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex w-full flex-col gap-10"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel>
								<p className="paragraph-semibold text-dark400_light800">
									Question Title<span className="text-primary-500">*</span>
								</p>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											form.trigger("title");
										}
									}}
									{...field}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Be specific and imagine you&apos;re asking a question to another
								person.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="explanation"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel>
								<p className="paragraph-semibold text-dark400_light800">
									Detailed Explanation of Your Problem
									<span className="text-primary-500">*</span>
								</p>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Editor
									onBlur={field.onBlur}
									onEditorChange={(content) => {
										field.onChange(content);
									}}
									apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
									onInit={(_evt, editor) =>
										// @ts-ignore
										(editorRef.current = editor)
									}
									initialValue={parsedQuestionDetails?.content || ""}
									init={{
										height: 500,
										menubar: false,
										plugins: [
											"advlist",
											"autolink",
											"lists",
											"link",
											"image",
											"charmap",
											"preview",
											"anchor",
											"searchreplace",
											"visualblocks",
											"codesample",
											"fullscreen",
											"insertdatetime",
											"media",
											"table",
										],
										toolbar:
											"undo redo | blocks | " +
											"codesample | bold italic forecolor | alignleft aligncenter " +
											"alignright alignjustify | bullist numlist ",
										content_style: "body { font-family:Inter; font-size:16px }",
										skin: resolvedTheme === "dark" ? "oxide-dark" : "oxide",
										content_css: resolvedTheme,
									}}
								/>
							</FormControl>
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Introduce the problem and expand on what you put in the title.
								Minimum 20 characters.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col">
							<FormLabel>
								<p className="paragraph-semibold text-dark400_light800">
									Tags<span className="text-primary-500">*</span>
								</p>
							</FormLabel>
							<FormControl className="mt-3.5">
								<Input
								 	disabled={type === 'Edit'}
									className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
									placeholder="Add tags..."
									onKeyDown={(e) => handleInputKeyDown(e, field)}
								/>
							</FormControl>
							{field.value.length > 0 && (
								<div className="flex-start mt-2.5 gap-2.5">
									{field.value.map((tag: any) => (
										<Badge
											key={tag}
											className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
											onClick={() =>
												type !== "Edit" ? handleTagRemove(tag, field) : () => {}
											}
										>
											{tag}
											{type !== "Edit" && (
												<Image
													src="/assets/icons/close.svg"
													alt="Close icon"
													width={12}
													height={12}
													className="cursor-pointer object-contain invert-0 dark:invert"
												/>
											)}
										</Badge>
									))}
								</div>
							)}
							<FormDescription className="body-regular mt-2.5 text-light-500">
								Add up to 3 tags to describe what your question is about. You
								need to press enter to add a tag.
							</FormDescription>
							<FormMessage className="text-red-500" />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="primary-gradient w-fit !text-light-900"
					disabled={isSubmitting}
					onSubmit={() => {
						onSubmit(form.getValues());
					}}
				>
					{isSubmitting ? (
						<>{type === "edit" ? "Editing..." : "Creating..."}</>
					) : (
						<>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
					)}
				</Button>
			</form>
		</Form>
	);
};

export default Question;
