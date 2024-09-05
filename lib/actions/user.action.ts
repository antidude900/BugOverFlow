"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
	CreateUserParams,
	DeleteUserParams,
	UpdateUserParams,
} from "./shared.type";
import { revalidatePath } from "next/cache";

import Question from "@/database/question.model";

export async function getUserById(params: any) {
	try {
		connectToDatabase();

		const { userId } = params;

		const user = await User.findOne({ clerkId: userId });

		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function createUser(userData: CreateUserParams) {
	try {
		connectToDatabase();

		const newUser = await User.create(userData);

		return newUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function updateUser(params: UpdateUserParams) {
	try {
		connectToDatabase();

		const { clerkId, updateData, path } = params;

		const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
			new: true,
		});

		revalidatePath(path);
		return updatedUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function deleteUser(params: DeleteUserParams) {
	try {
		connectToDatabase();

		const { clerkId } = params;

		const deletedUser = await User.findOneAndDelete({ clerkId });

		if (!deletedUser) throw new Error("User not found");

		await Question.find({
			author: deletedUser._id,
		}).distinct("_id");

		await Question.deleteMany({ author: deletedUser._id });

		return deleteUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
