import mongoose from "mongoose";

declare global {
  // Prevent multiple instances in dev
  var mongooseConn: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

export const connectToDB = async () => {
  // Initialize global variable if not present
  if (!global.mongooseConn) {
    global.mongooseConn = { conn: null, promise: null };
  }

  // Return connection if already established
  if (global.mongooseConn.conn) {
    return global.mongooseConn.conn;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ MONGODB_URI missing at runtime");
    throw new Error("Missing MONGODB_URI environment variable");
  }

  // Start connection if not started
  if (!global.mongooseConn.promise) {
    global.mongooseConn.promise = mongoose
      .connect(uri, {
        dbName: "twiddle",
      })
      .then((mongoose) => mongoose);
  }

  global.mongooseConn.conn = await global.mongooseConn.promise;
  return global.mongooseConn.conn;
};