import type { NextApiRequest, NextApiResponse } from 'next'
import { getQuestionVotes, getUser } from './db'

type ResponseData = {
    votes: number[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
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

    if(!user.user) {
        return res.status(200).json({
            votes
        })
    }

    const { data, error } = await getQuestionVotes(user.user.id)
    if(data) {
        for (const vote of data) {
            votes.push(vote.questionId)
        }
    }

    return res.status(200).json({
        votes
    })
}