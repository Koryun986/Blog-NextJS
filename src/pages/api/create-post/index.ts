import type { NextApiRequest, NextApiResponse } from 'next'
import postsApi from '../(utils)';

export default async function POST (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {        
        const data = await postsApi.addPost(req.body);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({message: "something went wrong"});
    }
}