import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestions, getEvent } from './db'
import { SessionType, QuestionType } from '../../types'

type ResponseData = {
    session: SessionType | null;
    questions: QuestionType[];
    error: any;
    requireAuth: boolean;
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
            requireAuth: false
        })
    }

    const { sessionSlug } = req.query

    if(!sessionSlug || typeof sessionSlug !== 'string') {
        return res.status(401).json({
            session: null,
            questions: [],
            error: 'Incorrect session parameter.',
            requireAuth: false
        })
    }

    const session = await getSession(sessionSlug);
    if (session.error) {
        return res.status(500).json({
            session: null,
            questions: [],
            error: session.error,
            requireAuth: false
        })
    }

    const event = await getEvent(session.eventSlug);
    if(event.error) {
        return res.status(500).json({
            session: null,
            questions: [],
            error: event.error,
            requireAuth: false
        })
    }

    const { data, error }= await getQuestions(session.slug);

    return res.status(200).json({
        session,
        questions: data || [],
        error,
        requireAuth: event.requireAuth
    })
}