"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

const CreatePost = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tags: "",
  });

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      console.error("User not authenticated");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: post.post,
          userId: session.user.id,
          tag: post.tags,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <p className="text-3xl font-bold flex justify-center items-center text-gray-500 h-[80vh]">
        Loading...
      </p>
    );
  }
  if (status === "unauthenticated") {
    return (
      <p className="text-3xl font-bold flex justify-center items-center text-gray-500 h-[80vh]">
        Please log in to create a post.
      </p>
    );
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
