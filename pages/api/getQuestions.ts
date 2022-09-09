import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestions } from './db'
import { SessionType, QuestionType } from '../../types'

type ResponseData = {
    session: SessionType;
    questions: QuestionType[];
}

type ResponseError = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ResponseError>
) {
    if (req.method !== 'GET') {
        return res.status(401).json({ error: 'Not Allowed' })
    }

    const { sessionSlug } = req.query

    if(!sessionSlug || typeof sessionSlug !== 'string') {
        return res.status(401).json({
            error: 'Incorrect session parameter.'
        })
    }

    const session = await getSession(sessionSlug);
    if (session.error) {
        return res.status(500).json({
            error: session.error
        })
    }

    const questions = await getQuestions(session.slug);
    if(questions.error) {
        return res.status(500).json({
            error: questions.error
        })
    }

    return res.status(200).json({
        session,
        questions
    })
}