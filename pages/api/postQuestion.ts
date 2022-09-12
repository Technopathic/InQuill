import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getUser, storeQuestion } from './db'
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
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
    const user = await getUser(req)
    if(!user.user) {
        return res.status(403).json({
            error: 'Please login to continue'
        })
    }

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
    if (session.error) {
        return res.status(500).json({
            error: session.error
        })
    }

    const currentTime = new Date().getTime()
    const startTime = new Date(session.start_at).getTime()
    const endTime = new Date(session.end_at).getTime()

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
        sessionSlug: session.slug,
        author: questionAuthor || 'Anonymous',
        votes: 0,
        content: questionContent,
        userId: user.user.id
    }

    const question = await storeQuestion(questionData);
    if(question.error) {
        return res.status(500).json({
            error: question.error
        })
    }

    const questionResponse = {
        ...questionData,
        id: question.id,
        created_at: question.created_at,
        userId: user.user.id
    }

    return res.status(200).json({
       question: questionResponse
    })
}