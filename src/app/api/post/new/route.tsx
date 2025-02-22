import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { userId, post, tag }: { userId: string; post: string; tag: string } =
      body;

    await connectToDB();

    const newPost = new Post({
      creator: userId,
      post: post,
      tag: tag,
    });

    await newPost.save();

    return new NextResponse(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
