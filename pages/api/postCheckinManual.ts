import type { NextApiRequest, NextApiResponse } from 'next'
import { CheckInData } from '../../types'
import { getCheckin, getEvent, storeCheckin } from './db'
import axios from 'axios'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    checkin: CheckInData;
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

    const { firstName, lastName, email, eventSlug } = req.body

    if(!firstName || typeof firstName !== 'string') {
        return res.status(401).json({
            error: 'Missing first name'
        })
    }

    if(!lastName || typeof lastName !== 'string') {
        return res.status(401).json({
            error: 'Missing last name'
        })
    }

    if(!email || typeof email !== 'string') {
        return res.status(401).json({
            error: 'Missing email'
        })
    }

    if(!eventSlug || typeof eventSlug !== 'string') {
        return res.status(401).json({
            error: 'Missing event slug'
        })
    }

    const event = await getEvent(eventSlug)
    if(event.error || !event.data) {
        return res.status(500).json({ 
            error: `Unable to fetch event: ${event.error}` 
        })
    }  

    const checkinData: CheckInData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        name: `${firstName} ${lastName}`,
        eventId: event.data.id,
        hasTicket: false
    }

    const isCheckedin = await getCheckin(email, event.data.id);
    if(!isCheckedin.data) {
        const checkin = await storeCheckin(checkinData);
        if(checkin.error) {
            return res.status(500).json({
                error:  `Unable to store check-in: ${JSON.stringify(checkin.error)}`
            })
        }
    }

    return res.status(200).json({
       checkin: checkinData
    })
}
