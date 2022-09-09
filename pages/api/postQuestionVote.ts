import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestion, storeQuestionVote } from './db'

type ResponseData = {
    success: boolean;
}

type ResponseError = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ResponseError>
) {
    if (req.method !== 'POST') {
        return res.status(401).json({ error: 'Not Allowed' })
    }

    const { id } = req.query;

    if(!id || typeof id !== 'string') {
        return res.status(401).json({
            error: 'Missing question Id.'
        })
    }

    const userId = null;
    const questionId = Number(id);

    const question = await getQuestion(questionId);
    if(question.error) {
        return res.status(500).json({
            error: question.error
        })
    }

    const session = await getSession(question.sessionSlug);
    if(session.error) {
        return res.status(500).json({
            error: session.error
        })
    }

    if(question.votes >= 100) {
        return res.status(403).json({
            error: 'Question has reached maximum votes'
        })
    }

    const questionData = await storeQuestionVote(questionId, userId);
    if(questionData.error) {
        return res.status(403).json({
            error: questionData.error
        })
    }

    return res.status(200).json({
        success: true
    })
}