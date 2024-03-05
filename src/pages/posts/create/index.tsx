import { useState } from "react";
import PostForm from "@/components/PostForm";
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
            <PostForm 
                post={post}
                author={author}
                handlePostInputChange={handlePostInputChange}
                handleAuthorInputChange={handleAuthorInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreatePostPage;