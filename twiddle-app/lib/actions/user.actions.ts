"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { CreateUserParams, updateUserParams } from "@/interfaces/interface";

export const createUser = async ({
  userId,
  email,
  name,
  username,
  image,
}: CreateUserParams): Promise<void> => {
  try {
    await connectToDB();
    await User.create({
      id: userId,
      username: username?.toLowerCase(),
      name,
      email,
      image,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to create user: ${message}`);
  }
};

export const fetchUser = async (userId: string) => {
  try {
    await connectToDB();

    return await User.findOne({
      id: userId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to fetch user: ${message}`);
  }
};

export const updateUser = async ({
  userId,
  name,
  email,
  username,
  bio,
  path,
  image,
}: updateUserParams): Promise<void> => {
  try {
    await connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        name,
        email,
        username,
        bio,
        path,
        image,
        onboarded: true,
      }
    );

    if (path === "/profile/edit") revalidatePath(path);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to update user info: ${message}`);
  }
};
