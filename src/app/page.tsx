"use client";
import Posts from "@/components/Posts";

async function getPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts = await response.json();
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <section className="w-full flex-center flex-col mt-10">
      <h1 className="head_text text-center">
        Post It
        <br />
        <span className="orange_gradient text-center">Share Your Ideas</span>
      </h1>
      <p className="desc text-center">Share your ideas in the posting app!</p>
      <Posts initialPosts={posts} />
    </section>
  );
}
