"use server";

import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";

import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import {
	GetQuestionsParams,
	CreateQuestionParams,
	GetQuestionByIdParams,
	QuestionVoteParams,
	DeleteQuestionParams,
	DeleteAnswerParams,
	EditQuestionParams,
} from "./shared.type";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.mode";

export async function getQuestions(params: GetQuestionsParams) {
	try {
		await connectToDatabase();	

		const questions = await Question.find({})
			.populate({ path: "tags", model: Tag })
			.populate({ path: "author", model: User })
			.sort({ createdAt: -1 });

		return { questions };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createQuestion(params: CreateQuestionParams) {
	try {
		await connectToDatabase();

		const { title, content, tags, author, path } = params;

		// Create the question
		const question = await Question.create({
			title,
			content,
			author,
		});

		const tagDocuments = [];

		// Create the tags or get them if they already exist
		for (const tag of tags) {
			const existingTag = await Tag.findOneAndUpdate(
				{ name: { $regex: new RegExp(`^${tag}$`, "i") } },
				{ $setOnInsert: { name: tag }, $push: { questions: question._id } },
				{ upsert: true, new: true }
			);

			tagDocuments.push(existingTag._id);
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		});

		// Create an interaction record for the user's ask_question action

		// Increment author's reputation by +5 for creating a question

		revalidatePath(path);
	} catch (error) {}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
	try {
		await connectToDatabase();
		const { questionId } = params;

		const question = await Question.findById(questionId)
			.populate({ path: "tags", model: Tag, select: "_id name" })
			.populate({
				path: "author",
				model: User,
				select: "_id clerkId name picture",
			});

		return question;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function upvoteQuestion(params: QuestionVoteParams) {
	try {
		await connectToDatabase();

		const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

		let updateQuery = {};

		if (hasupVoted) {
			updateQuery = { $pull: { upvotes: userId } };
		} else if (hasdownVoted) {
			updateQuery = {
				$pull: { downvotes: userId },
				$push: { upvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { upvotes: userId } };
		}
		const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
			new: true,
		});

		if (!question) {
			throw new Error("Question not found");
		}

		// incremenet author reputation
		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function downvoteQuestion(params: QuestionVoteParams) {
	try {
		await connectToDatabase();

		const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

		let updateQuery = {};

		if (hasdownVoted) {
			updateQuery = { $pull: { downvotes: userId } };
		} else if (hasupVoted) {
			updateQuery = {
				$pull: { upvotes: userId },
				$push: { downvotes: userId },
			};
		} else {
			updateQuery = { $addToSet: { downvotes: userId } };
		}

		const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
			new: true,
		});

		if (!question) {
			throw new Error("Question not found");
		}

		// incremenet author reputation
		revalidatePath(path);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteQuestion(params:DeleteQuestionParams){
	try{
		await connectToDatabase()

		const {questionId,path}= params 	

		await Question.deleteOne({_id:questionId})
		await Answer.deleteMany({question:questionId})
		await Interaction.deleteMany({question:questionId})
		await Tag.updateMany({questions:questionId},{$pull:{questions:questionId}})

		revalidatePath(path)
	}	
	catch (error){
		console.log(error);	
		throw error
	}
}

export async function deleteAnswer(params:DeleteAnswerParams){
	try{
		await connectToDatabase()

		const {answerId,path}= params 	

		await Answer.deleteOne({_id:answerId})
		await Question.updateMany({answers:answerId},{$pull:{answers:answerId}})
		await Interaction.deleteMany({answer:answerId})

		revalidatePath(path)
	}
	catch (error){
		console.log(error);	
		throw error
	}
}

export async function EditQuestion(params: EditQuestionParams) {
	try {
	  connectToDatabase();
  
	  const { questionId, title, content, path } = params;
  
	  const question = await Question.findById(questionId).populate("tags");
  
	  if(!question) {
		throw new Error("Question not found");
	  }
  
	  question.title = title;
	  question.content = content;
  
	  await question.save();
  
	  revalidatePath(path);
	} catch (error) {
	  console.log(error);
	}
  }
  