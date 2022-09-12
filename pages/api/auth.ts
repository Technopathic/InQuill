import { NextApiRequest, NextApiResponse } from 'next';
import { setAuth } from './db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await setAuth(req, res)

    return res.status(200).json({
        auth: 'OK'
    })
}