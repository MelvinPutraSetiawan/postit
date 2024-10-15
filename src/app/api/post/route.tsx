import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    await connectToDB();
    const { default: User } = await import("@/models/user");

    const posts = await Post.find({}).populate("creator");

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
};
