import { promises as fs } from "fs";
import type{ Post } from "./type";

class Api {
    private readonly POSTS_FILE = process.cwd() + "/src/pages/api/posts.json";

    async getPosts() {
        const response = await fs.readFile(this.POSTS_FILE, "utf-8");
        const data: Post[] = JSON.parse(response);
        return data;
    }

    async getPostById(id: Post["id"]) {        
        const posts = await this.getPosts();
        const post = posts.find(post => post.id === id);        
        if (!post) {
            throw new Error("Post with this id doesn't exist");
        }
        return post;
    }
}

export default new Api();