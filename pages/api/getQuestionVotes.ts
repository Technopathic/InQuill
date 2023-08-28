import type { NextApiRequest, NextApiResponse } from 'next'
import { getQuestionVotes, getUser } from './db'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    votes: number[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseOptions | ResponseData>
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

    const votes: number[] = []

    if (req.method !== 'GET') {
        return res.status(200).json({ 
            votes
        })
    }

    if(!req.headers.authorization) {
        return res.status(200).json({ 
            votes
        })
    }

    const user = await getUser(req.headers.authorization)
    if(user.error) {
        return res.status(200).json({
            votes
        })
    }

    //Refactor later
    if(!user.user.user) {
        return res.status(200).json({
            votes
        })
    }

    const { data, error } = await getQuestionVotes(user.user.user.id)
    if(data) {
        for (const vote of data) {
            votes.push(vote.questionId)
        }
    }

    return res.status(200).json({
        votes
    })
}