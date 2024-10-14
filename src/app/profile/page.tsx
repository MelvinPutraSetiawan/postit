"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@/components/Profile";
import Image from "next/image";

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

const MyProfile: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [myPosts, setMyPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user.id) return;

      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data: Post[] = await response.json();
        setMyPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post: Post) => {
    router.push(`/update-post?id=${post._id}`);
  };

  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  const handleTagClick = (tag: string) => {
    console.log(`Tag clicked: ${tag}`);
    router.push(`/search?tag=${tag}`);
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
    <Profile
      name="My"
      desc="Profile Page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleTagClick={handleTagClick}
    />
  );
};

export default MyProfile;
