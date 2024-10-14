"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import Image from "next/image";

interface Post {
  post: string;
  tags: string;
}

const UpdatePrompt = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState<Post>({ post: "", tags: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/post/${promptId}`);
      const data = await response.json();

      setPost({
        post: data.post,
        tags: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/post/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: post.post,
          tag: post.tags,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to update the prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <p className="text-3xl font-bold flex justify-center items-center text-gray-500 h-[80vh]">
        <Image
          src={"./assets/icons/loader.svg"}
          alt="loading"
          width={100}
          height={100}
        />
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
