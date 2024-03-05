import { useState } from "react";
import PostItem from "./PostItem";
import type { Post } from "@/api/type";

interface PostsListProps {
    posts: Post[];
}

const PostsList = ({posts}: PostsListProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const postsPerPage = 8;
  
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    const totalPages = Math.ceil(posts.length / postsPerPage);
  
    const paginate = (pageNumber: number) => {
      setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10 ">
                {!!currentPosts?.length && currentPosts.map(post => <PostItem post={post} key={post.id}/>)}
            </div>
            <div className="flex justify-center my-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-4 rounded-l"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                        i + 1 === currentPage ? 'bg-blue-700' : ''
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 px-4 rounded-r"
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default PostsList;