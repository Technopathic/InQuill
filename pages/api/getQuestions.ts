import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestions } from './db'
import { SessionType, QuestionType } from '../../types'

type ResponseData = {
    session: SessionType | null;
    questions: QuestionType[];
    error: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(401).json({ 
            session: null, 
            questions: [], 
            error: 'Not Allowed' 
        })
    }

    const { sessionSlug } = req.query

    if(!sessionSlug || typeof sessionSlug !== 'string') {
        return res.status(401).json({
            session: null,
            questions: [],
            error: 'Incorrect session parameter.'
        })
    }

    const session = await getSession(sessionSlug);
    if (session.error) {
        return res.status(500).json({
            session: null,
            questions: [],
            error: session.error
        })
    }

    const { data, error }= await getQuestions(session.slug);

    return res.status(200).json({
        session,
        questions: data || [],
        error
    })
}