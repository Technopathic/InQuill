import type { NextApiRequest, NextApiResponse } from 'next'
import { answerQuestion, getUser, isAdmin } from './db'

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

    const { id } = req.body

    if(!req.headers.authorization) {
        return res.status(403).json({
            error: 'Missing authorization token'
        })
    }

    const user = await getUser(req.headers.authorization)
    if(user.error) {
        return res.status(403).json({
            error: user.error
        })
    }

    if(!user.user) {
        return res.status(404).json({
            error: 'User not found.'
        })
    }

    const checkAdmin = await isAdmin(user.user.id)
    if(!checkAdmin) {
        return res.status(403).json({
            error: 'You do not have permission.'
        })
    }

    if(!id || typeof id !== 'number') {
        return res.status(401).json({
            error: 'Missing question Id.'
        })
    }

    const question = await answerQuestion(id)
    if(question.error) {
        return res.status(403).json({
            error: question.error
        })
    }

    return res.status(200).json({
        success: true
    })
    
}