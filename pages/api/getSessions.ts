import type { NextApiRequest, NextApiResponse } from 'next'
import { getEvent, getSessions } from './db'
import { EventType, SessionType } from '../../types'

type ResponseData = {
    event: EventType | null;
    sessions: SessionType[];
    error: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(401).json({ 
            event: null, 
            sessions: [], 
            error: 'Not Allowed' 
        })
    }

    const { eventSlug } = req.query

    if(!eventSlug || typeof eventSlug !== 'string') {
        return res.status(401).json({
            event: null,
            sessions: [],
            error: 'Incorrect event parameter.'
        })
    }

    const event = await getEvent(eventSlug);
    if (event.error || !event.data) {
        return res.status(500).json({
            event: null,
            sessions: [],
            error: event.error
        })
    }

    const { data, error } = await getSessions(event.data.slug);

    return res.status(200).json({
        event: event.data,
        sessions: data || [],
        error
    })
}