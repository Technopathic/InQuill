import type { NextApiRequest, NextApiResponse } from 'next'
import { isAdmin, getUser } from './db'

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

    if (req.method !== 'GET') {
        return res.status(401).json({ error: 'Not Allowed' })
    }

    if(!req.headers.authorization) {
        return res.status(200).json({
            success: false
        })
    }

    const user = await getUser(req.headers.authorization)
    if(user.error) {
        return res.status(200).json({
            success: false
        })
    }

    //Refactor later
    if(!user.user.user) {
        return res.status(200).json({
            success: false
        })
    }

    const admin = await isAdmin(user.user.user.id);

    return res.status(200).json({
        success: admin
    })
}