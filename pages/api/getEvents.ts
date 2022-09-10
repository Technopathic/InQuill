import type { NextApiRequest, NextApiResponse } from 'next'
import { getEvents } from './db'
import { EventType } from '../../types'

type ResponseData = {
    events: EventType[]
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

    const { data, error } = await getEvents();
    if(error) {
        return res.status(500).json({
            error
        })
    }

    return res.status(200).json({
        events: data
    })
}