"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
	GetAllTagsParams,
	GetQuestionsByTagIdParams,
	GetTopInteractedTagsParams,
} from "./shared.type";
import Tag, { ITags } from "@/database/tag.model";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";
import { create } from "domain";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
	try {
		await connectToDatabase();

		const { userId } = params;

		const user = await User.findById(userId);

		if (!user) throw new Error("User not found");

		// Find interactions

		return [
			{ _id: "1", name: "tag1" },
			{ _id: "2", name: "tag2" },
			{ _id: "3", name: "tag3" },
		];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getAllTags(params: GetAllTagsParams) {
	try {
		connectToDatabase();

		const tags = await Tag.find({});

		return { tags };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
	try {
		await connectToDatabase();

		const { tagId, searchQuery } = params;

		const tagFilter: FilterQuery<ITags> = { _id: tagId };

		const tag = await Tag.findOne(tagFilter).populate({
			path: "questions",
			model: Question,
			match: searchQuery
				? { title: { $regex: new RegExp(searchQuery, "i") } }
				: {},
			options: {
				sort: { createdAt: -1 },
			},
			populate: [
				{ path: "tags", model: Tag, select: "_id name" },
				{ path: "author", model: User, select: "_id clerkId name picture" },
			],
		});

		if (!tag) throw new Error("Tag not found");

		const questions = tag.questions;

		return { tagTitle: tag.name, questions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getPopularTags(params: GetAllTagsParams) {
	try {
		await connectToDatabase();

		const tags = await Tag.aggregate([
			{
				$project: {
					name: 1,
					questionsCount: { $size: "$questions" },
					createdAt: 1,
				},
			},
			{
				$sort: { questionsCount: -1 ,createdAt: -1}, // Sort by the number of questions in descending order
			},
			{
				$limit: 5, // Limit the result to the top 5
			},
		]).exec();

		console.log(tags);
		return { tags };
	} catch (error) {
		console.log(error);
		throw error;
	}
}
