"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard";

const PostCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16 prompt_layout"></div>;
};

function Posts() {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = () => {};

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PostCardList data={[]} handleTagClick={() => {}} />
    </section>
  );
}

export default Posts;
