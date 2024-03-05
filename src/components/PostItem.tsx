import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/api/type";

interface PostItemProps {
    post: Post;
}

const PostItem = ({post}: PostItemProps) => {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className="border border-gray-200 rounded-lg space-y-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-all">
                <div className="w-full relative">
                    <Image src={post.post_image} alt="Post Image" width={0} height={0} unoptimized className="w-full rounded aspect-video" />
                </div>
                <div className="text-2xl font-bold">{post.title}</div>
                <div className="text-gray-600 truncate">{post.description}</div>
                <div>
                    <div className="w-[10%] aspect-square flex items-center gap-4">
                        <Image src={post.author.image} alt={post.author.name} width={0} height={0} className="w-full aspect-square rounded-full" unoptimized />
                        <div className="text-nowrap">{post.author.name}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostItem;