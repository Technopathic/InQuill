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

    const { qrCode, eventSlug } = req.body

    if(!qrCode || typeof qrCode !== 'string') {
        return res.status(401).json({
            error: 'Missing QR code'
        })
    }

    const attendeeId = qrCode.slice(11, 22)

    const event = await getEvent(eventSlug)
    if(event.error || !event.data) {
        return res.status(500).json({ 
            error: `Unable to fetch event: ${event.error}` 
        })
    }  

    const eventbriteData = await axios({
        method: 'GET',
        url: `https://www.eventbriteapi.com/v3/events/${event.data.eventbriteId}/attendees/${attendeeId}/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.EVENTBRITE_PRIVATE_KEY}`
        }
    }).then(res => res.data)

    const checkinData: CheckInData = {
        firstName: eventbriteData.profile.first_name,
        lastName: eventbriteData.profile.last_name,
        email: eventbriteData.profile.email,
        name: eventbriteData.profile.name,
        eventId: event.data.id,
        hasTicket: true
    }

    const isCheckedin = await getCheckin(eventbriteData.profile.email, event.data.id);
    if(!isCheckedin.data || (isCheckedin.data && event.data.multiCheckin)) {
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
