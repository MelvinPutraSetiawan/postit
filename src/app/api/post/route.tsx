import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request: Request): Promise<Response> => {
  try {
    await connectToDB();

    const posts = await Post.find({}).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed", { status: 500 });
  }
};
