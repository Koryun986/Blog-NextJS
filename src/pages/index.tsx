import api from "@/api";
import { Post } from "@/api/type";
import Header from "@/components/Header";
import PostsList from "@/components/PostsList";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = (async () => {
  const posts = await api.getPosts();
  return {
    props: { posts },
    revalidate: true,
  }
}) satisfies GetStaticProps<{posts: Post[]}>

export default function Home({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [localPosts, setLocalPosts] = useState(posts);
  
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta property="description" content="Blog site" />
      </Head>
      <div className={`${inter.className} container mx-auto pt-5 px-2 sm:px-0`}>
        <Header posts={posts} setPosts={setLocalPosts} />
        {!!posts?.length ? <PostsList posts={localPosts} /> : "No post avaliable"}
      </div>
    </>
  );
}
