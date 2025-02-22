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

interface PostsProps {
  initialPosts: Post[];
}

const Posts: React.FC<PostsProps> = ({ initialPosts }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts);

  const fetchPosts = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/post/reload/1`, {
        method: "GET",
        headers: { "Cache-Control": "no-store" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data: Post[] = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Fetch error:", error);
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
      await fetch(`/api/post/${post._id.toString()}`, { method: "DELETE" });
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
      <div className="mt-16 prompt_layout">
        {filteredPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleTagClick={(tag) => console.log(`Tag clicked: ${tag}`)}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default Posts;
