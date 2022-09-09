import type { NextApiRequest, NextApiResponse } from 'next'
import { getEvent, getSessions } from './db'
import { EventType, SessionType } from '../../types'

type ResponseData = {
    event: EventType;
    sessions: SessionType[];
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

    const { eventSlug } = req.query

    if(!eventSlug || typeof eventSlug !== 'string') {
        return res.status(401).json({
            error: 'Incorrect event parameter.'
        })
    }

    const event = await getEvent(eventSlug);
    if (event.error) {
        return res.status(500).json({
            error: event.error
        })
    }

    const sessions = await getSessions(event.slug);
    if(sessions.error) {
        return res.status(500).json({
            error: sessions.error
        })
    }

    return res.status(200).json({
        event,
        sessions
    })
}