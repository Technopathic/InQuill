import type { NextApiRequest, NextApiResponse } from 'next'
import { getCard, updateCard } from './db'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    body: 'OK';
}

type ResponseError = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseOptions | ResponseData | ResponseError>
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    if(req.method === 'OPTIONS') {
        return res.status(200).json(({
            body: 'OK'
        }))
    }
    
    if (req.method !== 'POST') {
        return res.status(401).json({ error: 'Not Allowed' })
    }

    const { slug } = req.body;

    const { data, error } = await getCard(slug);
    if (data) {
        await updateCard(data.id, data.visits + 1)
    }

    return res.status(200).json({
        body: 'OK'
    })
}
