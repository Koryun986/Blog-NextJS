import type { NextApiRequest, NextApiResponse } from 'next'
import postsApi from '../(utils)';

export default async function DELETE(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const postId = req.body;
        const posts = await postsApi.deletePost(postId);
        res.status(200).send(posts);
    } catch (e) {
        res.status(500).send({ message: "Failed to delete data"});
    }
}