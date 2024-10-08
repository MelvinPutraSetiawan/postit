import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "post_it",
    });

    isConnected = true;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
