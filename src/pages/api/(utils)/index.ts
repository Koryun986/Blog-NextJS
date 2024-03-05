import { promises as fs } from "fs";
import type { Post } from "@/api/type";

class PostsApi {
    private readonly PostsFilePath = process.cwd() + "/src/pages/api/posts.json";
    private posts: Post[] = [];

    async getPosts() {
        if (this.posts.length) {
            return this.posts;
        }
        const response = await fs.readFile(this.PostsFilePath, "utf-8");
        const data: Post[] = JSON.parse(response);
        this.posts = data;
        return data;
    }

    async setPosts(posts: Post[]) {
        this.posts = posts;
        await fs.writeFile(this.PostsFilePath, JSON.stringify(posts));
    }
    
    async addPost(post: Omit<Post, "id">) {
        try {
            const data = await this.getPosts();
            const id = data[data.length - 1].id + 1;
            const newPost = { ...post, id };
            data.push(newPost);
            await this.setPosts(data);
            return data;
        } catch (e) {
            throw new Error("Can't add new post");
        }
    }
    
    async editPost(post: Post) {
        try {
            const data = await this.getPosts();
            const newData = data.map(postItem => {
                if (post.id !== postItem.id) {
                    return postItem;
                }
                return post;
            });
            await this.setPosts(newData);
            return newData;
        } catch (e) {
            throw new Error("Can't edit the post");
        }
    }
    
    async deletePost(id: Post["id"]) {
        try {
            const data = await this.getPosts();
            const newPosts = data.filter((post) => post.id !== id);
            await this.setPosts(newPosts);
            return newPosts;
        } catch (e) {
            throw new Error("Can't add new post");
        }
    }
}

export default new PostsApi();