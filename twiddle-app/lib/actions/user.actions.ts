"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { CreateUserParams } from "@/interfaces/interface";

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
