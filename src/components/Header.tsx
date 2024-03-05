import Link from "next/link";
import PostsSearch from "@/components/PostsSearch";
import type { Post } from "@/api/type";

interface HeaderProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const Header = ({posts, setPosts}: HeaderProps) => {
    return (
        <div className="sm:flex justify-between items-center">
            <h1 className="font-bold text-6xl">Blog</h1>
            <PostsSearch posts={posts} setPosts={setPosts} />
            <Link href={"posts/create"} className="mt-5 rounded-lg text-white py-2 px-3 bg-blue-500">Create Post</Link>
        </div>
    );
};

export default Header;