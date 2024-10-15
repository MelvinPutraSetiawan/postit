import { NextResponse } from "next/server";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    console.log(
      "Fetching new data Home =========================== from dynamic"
    );
    await connectToDB();
    const posts = await Post.find({}).populate("creator");

    const response = NextResponse.json(posts, { status: 200 });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};
