import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const GET = async (): Promise<Response> => {
  try {
    await connectToDB();
    const posts = await Post.find({}).populate("creator");

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    return new Response(`Error: ${error}`, { status: 500 });
  }
};
