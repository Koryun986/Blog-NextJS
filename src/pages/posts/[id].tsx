import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import api from "@/api";
import Head from "next/head";

const PostPage = ({post}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();

    const handleDeletePost = async () => {
        const isConfirmed = confirm("Do you want to delete the post?");
        if (!isConfirmed) {
            return;
        }
        await fetch("/api/delete-post", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post.id),
        });  
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>{post.title} | {post.author.name} | Blog</title>
                <meta name="description" content={post.description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="website" />
            </Head>
            <div className="container mx-auto md:pt-10 space-y-5">
                <div className="md:grid md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <Image src={post.post_image} alt="Post image" width={0} height={0} className="w-full" unoptimized />
                        <div className="flex items-center gap-4 px-2 sm:px-0">
                            <Image src={post.author.image} alt={post.author.name} width={0} height={0} unoptimized className="w-[40px] aspect-square rounded-full" />
                            <div className="text-nowrap text-lg font-semibold">{post.author.name}</div>
                        </div>
                    </div>
                    <div className="space-y-2 mt-2 md:mt-0 px-2 sm:px-0">
                        <h1 className="font-bold text-2xl md:text-6xl">{post.title}</h1>
                        <div className="text-lg md:text-2xl font-semibold">Description</div>
                        <div className="text-gray-600">{post.description}</div>
                        <button className="mt-5 rounded-lg text-white py-2 px-3 bg-blue-500 hover:bg-blue-600 mr-5">
                            <Link href={`/edit-post/${post.id}`}>Edit Post</Link>
                        </button>
                        <button onClick={handleDeletePost} className="mt-5 rounded-lg text-white py-2 px-3 bg-red-500 hover:bg-red-600">
                            Delete
                        </button>
                    </div>
                </div>
                <button className="mt-5 rounded-lg text-white py-2 px-3 bg-blue-500 hover:bg-blue-600">
                    <Link href={"/"}>Home Page</Link>
                </button>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const posts = await api.getPosts();
    const paths = posts.map(post => (
        { 
            params: {
                id: post.id.toString(),
            }
        }
    ));
    return {
        paths,
        fallback: "blocking",
    };
}

interface GetStaticPropsArg {
    params: {
        id: string,
    }
}

export async function getStaticProps({ params }: GetStaticPropsArg) {    
    try {
        const post = await api.getPostById(+params.id);
        return {
            props: {
                post
            },
        };
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

export default PostPage;