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
    connectToDB();
    await User.create({
      id: userId,
      username: username?.toLowerCase(),
      name,
      email,
      image,
    });
  } catch (err: any) {
    throw new Error(`Failed to create user: ${err.message}`);
  }
};

export const fetchUser = async (userId: string) => {
  try {
    connectToDB();

    return await User.findOne({
      id: userId,
    });
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`);
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
    connectToDB();
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
  } catch (err: any) {
    throw new Error(`Failed to update user info: ${err.message}`);
  }
};
