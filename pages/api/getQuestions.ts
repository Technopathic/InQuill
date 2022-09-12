import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestions, getQuestionVotes, getUser } from './db'
import { SessionType, QuestionType } from '../../types'

type ResponseData = {
    session: SessionType | null;
    questions: QuestionType[];
    error: any;
    votes: number[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(401).json({ 
            session: null, 
            questions: [], 
            error: 'Not Allowed',
            votes: []
        })
    }

    const votes = []
    if(req.headers.authorization) {
        const user = await getUser(req.headers.authorization)
        if(user.user) {
            const { data: voteData, error: voteError } = await getQuestionVotes(user.user.id)
            console.warn({ voteData })
            if(voteData) {
                for (const vote of voteData) {
                    votes.push(vote.questionId)
                }
            }
        }
    }

    const { sessionSlug } = req.query

    if(!sessionSlug || typeof sessionSlug !== 'string') {
        return res.status(401).json({
            session: null,
            questions: [],
            error: 'Incorrect session parameter.',
            votes: []
        })
    }

    const session = await getSession(sessionSlug);
    if (session.error) {
        return res.status(500).json({
            session: null,
            questions: [],
            error: session.error,
            votes: []
        })
    }

    const { data, error }= await getQuestions(session.slug);
    console.warn(votes)

    return res.status(200).json({
        session,
        questions: data || [],
        error,
        votes
    })
}