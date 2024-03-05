import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import api from "@/api";
import type { Post } from "@/api/type";

const EditPostPage = ({post}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [editedPost, setEditedPost] = useState<Omit<Post, "author" | "id">>(post);
    const [author, setAuthor] = useState<Post["author"]>(post.author);

    const handlePostInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedPost(prevPost => ({...prevPost, [e.target.id]: e.target.value}));
    };

    const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(prevAuthor => ({...prevAuthor, [e.target.id]: e.target.value}));
    };

    const handleSubmit = async () => {

        await fetch("/api/edit-post", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...editedPost, author}),
        });    
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-4xl font-bold">Edit Post</h1>
            <form onSubmit={handleSubmit} className="space-y-7 mt-7">
                <div className="flex gap-4">
                    <label htmlFor="title" className="text-lg font-semibold">Title:</label>
                    <input
                        id="title"
                        value={editedPost.title}
                        onChange={handlePostInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="description" className="text-lg font-semibold">Description:</label>
                    <textarea
                        id="description"
                        value={editedPost.description}
                        onChange={handlePostInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="post_image" className="text-lg font-semibold">Post Image:</label>
                    <input
                        id="post_image"
                        value={editedPost.post_image}
                        onChange={handlePostInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>

                <div className="flex gap-4">
                    <label htmlFor="name" className="text-lg font-semibold">Author Name:</label>
                    <input
                        id="name"
                        value={author.name}
                        onChange={handleAuthorInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="image" className="text-lg font-semibold">Author Photo:</label>
                    <input
                        id="image"
                        value={author.image}
                        onChange={handleAuthorInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>
                <Link href={"/"} type="submit" onClick={handleSubmit} className="px-3 py-2 bg-blue-500 rounded-md text-white">Submit</Link>
            </form>
        </div>
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

export default EditPostPage;