import type { NextApiRequest, NextApiResponse } from 'next'
import { storeKiosk } from './db'
import * as types from '../../types'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    checkin: types.KioskData;
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

    const { name, email, tools, canContact } = req.body

    if(!name|| typeof name !== 'string') {
        return res.status(401).json({
            error: 'Missing name'
        })
    }

    if(!email || typeof email !== 'string') {
        return res.status(401).json({
            error: 'Missing email'
        })
    }

    const kioskData: types.KioskData = {
        name,
        email,
        tools,
        canContact
    }

    const kiosk = await storeKiosk(kioskData);
    if(kiosk.error) {
        return res.status(500).json({
            error:  `Unable to store check-in: ${JSON.stringify(kiosk.error)}`
        })
    }

    return res.status(200).json({
       checkin: kioskData
    })
}
