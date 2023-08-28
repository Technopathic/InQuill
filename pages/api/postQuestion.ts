import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, storeQuestion, getUser, isBanned, getEvent } from './db'
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

const validateAuthor = (author: string | string[] | undefined) => author && typeof author === 'string' ? author.trim() : undefined

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

    const { sessionSlug, content, author } = req.body

    if(!sessionSlug || typeof sessionSlug !== 'string') {
        return res.status(401).json({
            error: 'Missing session'
        })
    }

    if(!content || typeof content !== 'string') {
        return res.status(401).json({
            error: 'Missing question content'
        })
    }
    
    const questionContent = content.trim()

    if(questionContent.length < 5) {
        return res.status(401).json({
            error: 'Please enter more content.'
        })
    }

    if(questionContent.length > 200) {
        return res.status(401).json({
            error: 'Question is too long.'
        })
    }

    const questionAuthor = validateAuthor(author);
    if(questionAuthor) {
        if(questionAuthor.length > 16) {
            return res.status(401).json({
                error: 'Name is too long.'
            })
        }
    }

    const session = await getSession(sessionSlug)
    if (session.error || !session.data) {
        return res.status(500).json({
            error: `Unable to fetch session: ${session.error}` 
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
                error: 'You cannot post a question.'
            })
        }

        userId = user.user.id
    }


    const currentTime = new Date().getTime()
    const startTime = new Date(session.data[0].start_at).getTime()
    const endTime = new Date(session.data[0].end_at).getTime()

    if(startTime > currentTime) {
        return res.status(403).json({
            error: 'Question and Answer has not begin yet.'
        })
    }

    if(endTime < currentTime) {
        return res.status(403).json({
            error: 'Question and Answer has ended.'
        })
    }

    const questionData = {
        sessionSlug: session.data[0].slug,
        author: questionAuthor || 'Anonymous',
        votes: 0,
        content: questionContent,
        userId,
        answered: false
    }

    const question = await storeQuestion(questionData);
    if(question.error || !question.data) {
        return res.status(500).json({
            error: `Unable to fetch event: ${event.error}` 
        })
    }

    const questionResponse = {
        ...questionData,
        id: question.data[0].id,
        created_at: question.data[0].created_at,
        userId
    }

    return res.status(200).json({
       question: questionResponse
    })
}