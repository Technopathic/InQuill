import type { NextApiRequest, NextApiResponse } from 'next'
import { getEvents } from './db'
import { EventType } from '../../types'

type ResponseData = {
    events: EventType[];
    error: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'GET') {
        return res.status(401).json({ events: [], error: 'Not Allowed' })
    }

    const { data, error } = await getEvents();

    return res.status(200).json({
        events: data || [],
        error
    })
}