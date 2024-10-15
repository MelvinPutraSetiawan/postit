import mongoose from "mongoose";
import "../models/user";
import "../models/post";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log(mongoose.models);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "post_it",
      connectTimeoutMS: 20000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("Database connected successfully");
    console.log(mongoose.models);
  } catch (error) {
    console.log("Database connection error:", error);
  }
};
