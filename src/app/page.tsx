"use client";
import Posts from "@/components/Posts";

function Home() {
  return (
    <section className="w-full flex-center flex-col mt-10">
      <h1 className="head_text text-center">
        Post It
        <br />
        <span className="orange_gradient text-center ">Share Your Ideas</span>
      </h1>
      <p className="desc text-center">Share your ideas in the posting app!</p>
      <Posts />
    </section>
  );
}

export default Home;
