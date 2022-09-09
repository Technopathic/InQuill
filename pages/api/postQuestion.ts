import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, storeQuestion } from './db'
import { QuestionType } from '../../types'

type ResponseData = {
    question: QuestionType;
}

type ResponseError = {
    error: string;
}

const validateAuthor = (author: string | string[] | undefined) => author && typeof author === 'string' ? author.trim() : undefined

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | ResponseError>
) {
    if (req.method !== 'POST') {
        return res.status(401).json({ error: 'Not Allowed' })
    }

    const { sessionSlug, content, author } = req.query

    if(
        !sessionSlug || 
        !content ||
        typeof sessionSlug !== 'string' || 
        typeof content !== 'string'
    ) {
        return res.status(401).json({
            error: 'Missing session or content.'
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

    const currentTime = new Date().getTime();
    if(session.start_at.getTime() > currentTime) {
        return res.status(403).json({
            error: 'Question and Answer has not begin yet.'
        })
    }

    if(session.end_at.getTime() < currentTime) {
        return res.status(403).json({
            error: 'Question and Answer has ended.'
        })
    }

    const questionData = {
        sessionSlug: session.slug,
        author: questionAuthor || 'Anonymous',
        votes: 0,
        content: questionContent
    }

    const question = await storeQuestion(questionData);
    if(question.error) {
        res.status(500).json({
            error: question.error
        })
    }

    const questionResponse = {
        ...questionData,
        id: question.id,
        created_at: question.created_at,
        userId: question.id
    }

    return res.status(200).json({
       question: questionResponse
    })
}