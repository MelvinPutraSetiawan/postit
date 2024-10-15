"use client";
import { GetServerSideProps } from "next";
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

interface HomeProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
  const posts: Post[] = await response.json();

  return {
    props: { posts },
  };
};

// Type the props here
const Home: React.FC<HomeProps> = ({ posts }) => (
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

export default Home;
