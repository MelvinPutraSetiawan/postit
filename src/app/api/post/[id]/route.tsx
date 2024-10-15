import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id).populate("creator");
    if (!post) return new NextResponse("Post Not Found", { status: 404 });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { post, tag } = await request.json();
    await connectToDB();

    const existingPost = await Post.findById(params.id);
    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 });
    }

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();

    return new NextResponse("Successfully updated the post", { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return new NextResponse("Error Updating Post", { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);

    return new NextResponse("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse("Error deleting post", { status: 500 });
  }
};
