"use client";

import { useState, useEffect, ChangeEvent } from "react";
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
  };

  const handleDelete = (post: Post) => {
    console.log(`Delete post with ID: ${post._id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data: Post[] = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

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
