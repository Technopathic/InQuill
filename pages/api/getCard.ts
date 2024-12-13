import type { NextApiRequest, NextApiResponse } from 'next'
import { getCard, updateCard } from './db'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    card: any;
    error: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseOptions | ResponseData>
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
        return res.status(401).json({ 
            card: null, 
            error: 'Not Allowed'
        })
    }

    const { slug } = req.query

    if(!slug || typeof slug !== 'string') {
        return res.status(401).json({
            card: null,
            error: 'Incorrect session parameter.'
        })
    }

    const { data, error } = await getCard(slug);
    if (!data || error) {
        return res.status(500).json({
            card: null,
            error: error,
        })
    }

    await updateCard(data.slug, data.visits + 1)

    return res.status(200).json({card: {
        id: data.id,
        color: data.color,
        vfx: data.vfx,
        slotOne: data.slotOne,
        slotTwo: data.slotTwo,
        slotThree: data.slotThree,
        slotFour: data.slotFour,
        cardText: data.cardText,
        slug: data.slug
    }, error: null});
}