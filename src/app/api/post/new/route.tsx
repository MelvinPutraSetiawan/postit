import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const POST = async (req: {
  json: () =>
    | PromiseLike<{ userId: any; post: any; tag: any }>
    | { userId: any; post: any; tag: any };
}) => {
  const { userId, post, tag } = await req.json();

  try {
    await connectToDB();
    const newPost = new Post({ creator: userId, post, tag });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new", { status: 500 });
  }
};
