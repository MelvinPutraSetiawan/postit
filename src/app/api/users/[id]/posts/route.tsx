import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompts = await Post.find({ creator: params.id }).populate("creator");

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return new NextResponse("Failed", { status: 500 });
  }
};
