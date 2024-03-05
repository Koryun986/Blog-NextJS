import type { NextApiRequest, NextApiResponse } from 'next'
import postsApi from '../(utils)';

export default async function PUT (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {        
        const data = await postsApi.editPost(req.body);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({message: "something went wrong"});
    }
}