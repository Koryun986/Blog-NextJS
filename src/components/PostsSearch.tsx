import { useEffect, useState } from "react";
import type { Post } from "@/api/type";
import useDebounce from "@/hooks/useDebounce";

interface PostsSearchProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostsSearch = ({posts, setPosts}: PostsSearchProps) => {
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value);

    useEffect(() => {
        if(!debouncedValue) {
            setPosts(posts);
            return;
        }
        setPosts([...posts.filter(post => post.title.includes(debouncedValue) || post.description.includes(debouncedValue))])
    }, [debouncedValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="md:w-[30%] my-3 md:my-0">
            <input value={value} onChange={handleInputChange} className="outline-none border w-[100%] border-gray-200 text-gray-400 px-3 py-2 rounded-3xl" placeholder="Search..." />
        </div>
    );
};

export default PostsSearch;