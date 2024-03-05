import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/api/type";

const CreatePostPage = () => {
    const [post, setPost] = useState<Omit<Post, "author" | "id">>({ title: "", description: "", post_image: ""});
    const [author, setAuthor] = useState<Post["author"]>({name: "", image: ""});

    const handlePostInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPost(prevPost => ({...prevPost, [e.target.id]: e.target.value}));
    };

    const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(prevAuthor => ({...prevAuthor, [e.target.id]: e.target.value}));
    };

    const handleSubmit = async () => {
        const newPost: Omit<Post, "id"> = {
            ...post,
            author,
        };
        await fetch("/api/create-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });            
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-4xl font-bold">Create Post</h1>
            <form onSubmit={handleSubmit} className="space-y-7 mt-7">
                <div className="flex gap-4">
                    <label htmlFor="title" className="text-lg font-semibold">Title:</label>
                    <input
                        id="title"
                        value={post.title}
                        onChange={handlePostInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="description" className="text-lg font-semibold">Description:</label>
                    <textarea
                        id="description"
                        value={post.description}
                        onChange={handlePostInputChange}
                        required
                        className="w-[90%] border border-gray-200 rounded-sm outline-none px-3 py-2"
                    />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="post_image" className="text-lg font-semibold">Post Image:</label>
                    <input
                        id="post_image"
                        value={post.post_image}
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

export default CreatePostPage;