import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import api from "@/api";
import PostForm from "@/components/PostForm";
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