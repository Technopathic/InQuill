import type { NextApiRequest, NextApiResponse } from 'next'
import { storeCard } from './db'
import * as types from '../../types'
import { nanoid } from 'nanoid'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    card: types.Card;
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

    const { color, vfx, slotOne, slotTwo, slotThree, slotFour, cardText } = req.body;

    const slug = nanoid(8)

    const cardData: types.Card = {
        color,
        vfx,
        slotOne,
        slotTwo,
        slotThree,
        slotFour,
        cardText,
        slug
    };

    const card = await storeCard(cardData);
    if(card.error) {
        return res.status(500).json({
            error:  `Unable to store card: ${JSON.stringify(card.error)}`
        })
    }

    return res.status(200).json({
        card: cardData
    })
}
