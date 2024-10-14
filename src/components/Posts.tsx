"use client";

import { useState, useEffect, ChangeEvent, useCallback } from "react";
import PostCard from "./PostCard";

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

interface PostCardListProps {
  data: Post[];
  handleTagClick: (tag: string) => void;
  handleEdit: (post: Post) => void;
  handleDelete: (post: Post) => void;
}

const PostCardList: React.FC<PostCardListProps> = ({
  data,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

function Posts() {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/post", {
        headers: { "Cache-Control": "no-store" },
      });
      const data: Post[] = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  }, []);
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    filterPosts(value);
  };

  const filterPosts = (searchValue: string) => {
    const lowerCaseValue = searchValue.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.creator.username.toLowerCase().includes(lowerCaseValue) ||
        post.creator.email.toLowerCase().includes(lowerCaseValue) ||
        post.post.toLowerCase().includes(lowerCaseValue) ||
        post.tag.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredPosts(filtered);
  };

  const handleEdit = (post: Post) => {
    console.log(`Edit post with ID: ${post._id}`);
    fetchPosts();
  };

  const handleDelete = async (post: Post) => {
    console.log(`Delete post with ID: ${post._id}`);
    try {
      await fetch(`/api/post/${post._id.toString()}`, {
        method: "DELETE",
      });
      setPosts((prev) => prev.filter((item) => item._id !== post._id));
      setFilteredPosts((prev) => prev.filter((item) => item._id !== post._id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag, username, email, or prompt"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer text-gray-700"
        />
      </form>
      <PostCardList
        data={filteredPosts}
        handleTagClick={(tag) => console.log(`Tag clicked: ${tag}`)}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </section>
  );
}

export default Posts;
