import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestion, storeQuestionVote, updateQuestionVote, getUser, getQuestionVote, isBanned, getEvent } from './db'
import { QuestionType } from '../../types'

type ResponseOptions = {
    body: 'OK';
}

type ResponseData = {
    question: QuestionType;
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

    const { id } = req.body;

    if(!id || typeof id !== 'number') {
        return res.status(401).json({
            error: 'Missing question Id.'
        })
    }

    const question = await getQuestion(id)
    if(question.error || !question.data) {
        return res.status(500).json({
            error: `Cannot fetch question ${question.error}`
        })
    }

    const session = await getSession(question.data[0].sessionSlug)
    if(session.error || !session.data) {
        return res.status(500).json({
            error: `Cannot fetch session ${session.error}`
        })
    }

    const event = await getEvent(session.data[0].eventSlug)
    if(event.error || !event.data) {
        return res.status(500).json({
            error: `Unable to fetch event: ${event.error}` 
        })
    }

    let userId = null
    if(event.data.requireAuth || req.headers.authorization) {
        if(!req.headers.authorization) {
            return res.status(403).json({
                error: 'Missing authorization token'
            })
        }

        const user = await getUser(req.headers.authorization)
        if(user.error) {
            return res.status(403).json({
                error: user.error
            })
        }

        if(!user.user) {
            return res.status(404).json({
                error: 'User not found.'
            })
        }

        const checkBan = await isBanned(user.user.id)
        if(checkBan) {
            return res.status(403).json({
                error: 'You cannot vote on this question.'
            })
        }

        userId = user.user.id

        const checkVote = await getQuestionVote(question.data[0].id, userId);
        if(checkVote) {
            return res.status(401).json({
                error: 'You have already voted.'
            })
        }
    }

    if(question.data[0].votes >= 100) {
        return res.status(403).json({
            error: 'Question has reached maximum votes'
        })
    }

    const questionData = await storeQuestionVote(id, userId)
    if(questionData.error) {
        return res.status(403).json({
            error: `Cannot store question ${questionData.error}`
        })
    }

    const updateData = await updateQuestionVote(id)
    if(updateData.error || updateData.updateError || !updateData.updateData) {
        return res.status(403).json({
            error: `Cannot update vote ${updateData.error}`
        })
    }

    const responseData: unknown = updateData.updateData

    return res.status(200).json({
        question: responseData as QuestionType
    })
}