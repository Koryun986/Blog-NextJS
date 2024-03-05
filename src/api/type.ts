export interface Post {
    id: number;
    title: string;
    description: string;
    post_image: string;
    author: Author
}

export interface Author {
    name: string;
    image: string;
}