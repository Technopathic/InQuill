import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestion, storeQuestionVote, updateQuestionVote } from './db'
import { QuestionType } from '../../types'

type ResponseOptions = {
    body: 'OK'
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

    const { id } = req.body;

    if(!id || typeof id !== 'number') {
        return res.status(401).json({
            error: 'Missing question Id.'
        })
    }

    const userId = null;

    const question = await getQuestion(id)
    if(question.error) {
        return res.status(500).json({
            error: question.error
        })
    }

    const session = await getSession(question.sessionSlug)
    if(session.error) {
        return res.status(500).json({
            error: session.error
        })
    }

    if(question.votes >= 100) {
        return res.status(403).json({
            error: 'Question has reached maximum votes'
        })
    }

    const questionData = await storeQuestionVote(id, userId)
    if(questionData.error) {
        return res.status(403).json({
            error: questionData.error
        })
    }

    const updateData = await updateQuestionVote(id)
    if(updateData.error) {
        return res.status(403).json({
            error: questionData.error
        })
    }

    return res.status(200).json({
        question: questionData
    })
}