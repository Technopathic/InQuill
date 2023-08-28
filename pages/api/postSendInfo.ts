import type { NextApiRequest, NextApiResponse } from 'next'
import { getEvent, getCheckin, updateCheckinIGDAInfo } from './db'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    success: boolean;
}

type ResponseError = {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseOptions | ResponseData | ResponseError>
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');

    if(req.method === 'OPTIONS') {
        return res.status(200).json(({
            body: 'OK'
        }))
    }

    if (req.method !== 'POST') {
        return res.status(401).json({ error: 'Not Allowed' })
    }

    const { email, eventSlug, sendInfo } = req.body;

    if(!email || typeof email !== 'string') {
        return res.status(401).json({
            error: 'Missing email.'
        })
    }

    if(!eventSlug || typeof eventSlug !== 'string') {
        return res.status(401).json({
            error: 'Missing event slug.'
        })
    }

    if(!sendInfo || typeof sendInfo !== 'boolean') {
        return res.status(401).json({
            error: 'Missing send info.'
        })
    }

    const event = await getEvent(eventSlug)
    if(event.error || !event.data) {
        return res.status(500).json({
            error: `Unable to fetch event: ${event.error}` 
        })
    }

    const checkin = await getCheckin(email, event.data.id)
    if(checkin.error || !checkin.data) {
        return res.status(500).json({
            error: `Unable to fetch checkin: ${checkin.error}`
        })
    }

    const updateData = await updateCheckinIGDAInfo(checkin.data.id, sendInfo)
    if(updateData.error) {
        return res.status(403).json({
            error: `Unable to update checkin: ${updateData.error}`
        })
    }

    return res.status(200).json({
        success: true
    })
}