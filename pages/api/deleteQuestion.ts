import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteQuestion } from './db'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    success: boolean;
}

type ResponseError = {
    error: string;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseOptions | ResponseData | ResponseError>
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

    const { id } = req.body

    if(!id || typeof id !== 'number') {
        return res.status(401).json({
            error: 'Missing question Id.'
        })
    }

    const question = await deleteQuestion(id)
    if(question.error) {
        return res.status(403).json({
            error: question.error
        })
    }

    return res.status(200).json({
        success: true
    })
    
}