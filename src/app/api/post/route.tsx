import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (): Promise<Response> => {
  try {
    await connectToDB();

    const posts = await Post.find({}).populate("creator");
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(String(error), { status: 500 });
  }
};
