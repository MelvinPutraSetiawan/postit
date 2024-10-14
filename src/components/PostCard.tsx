"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
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

interface PostCardProps {
  post: Post;
  handleTagClick: (tag: string) => void;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState<string>("");
  const pathname = usePathname();

  const handleCopy = () => {
    navigator.clipboard.writeText(post.post);
    setCopied(post.post);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-center items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt={`${post.creator.username}'s profile`}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-700">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.post
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy icon"
            width={24}
            height={24}
          />
        </div>
      </div>

      <p className="my-4 text-sm text-gray-500">{post.post}</p>
      <p
        className="text-sm cursor-pointer blue_gradient"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {pathname !== "/" && (
        <div className="flex gap-4 mt-4">
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleEdit(post)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(post)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
