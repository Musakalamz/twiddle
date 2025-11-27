"use server";

import mongoose from "mongoose";

type GlobalMongoState = {
  connected?: boolean;
  promise?: Promise<typeof mongoose>;
};

const globalRef = globalThis as typeof globalThis & {
  __mongo?: GlobalMongoState;
};

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);

  const uri = process.env.MONGODB_URL || process.env.MONGODB_URI;
  if (!uri)
    throw new Error(
      "Missing MongoDB connection string (MONGODB_URL or MONGODB_URI)"
    );

  const state = (globalRef.__mongo ??= {});
  if (state.connected) return;

  try {
    state.promise ??= mongoose.connect(uri as string, {
      serverSelectionTimeoutMS: 5000,
    });
    await state.promise;
    state.connected = true;
    console.log("MongoDB connected");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Error connecting to Database: ${message}`);
  }
};
