"use client";

import { useEffect, useState } from "react";
import Posts from "@/components/Posts";

interface Creator {
  _id: string;
  username: string;
  email: string;
  image: string;
}

interface Post {
  _id: string;
  creator: Creator;
  post: string;
  tag: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const response = await fetch(`${apiUrl}/api/post/reload/1`, {
          method: "GET",
          headers: { "Cache-Control": "no-store" },
        });

        if (!response.ok) throw new Error("Failed to fetch posts");

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="w-full flex-center flex-col mt-10">
      <h1 className="head_text text-center">
        Post It <br />
        <span className="orange_gradient text-center">Share Your Ideas</span>
      </h1>
      <p className="desc text-center">Share your ideas in the posting app!</p>
      <Posts initialPosts={posts} />
    </section>
  );
}
