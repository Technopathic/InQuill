import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, getQuestion, storeQuestionVote, updateQuestionVote, getUser, getQuestionVote, isBanned } from './db'
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

    if(!id || typeof id !== 'number') {
        return res.status(401).json({
            error: 'Missing question Id.'
        })
    }

    const question = await getQuestion(id)
    if(question.error) {
        return res.status(500).json({
            error: question.error
        })
    }

    const checkVote = await getQuestionVote(question.id, user.user.id);
    if(checkVote) {
        return res.status(401).json({
            error: 'You have already voted.'
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

    const questionData = await storeQuestionVote(id, user.user.id)
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
        question: updateData
    })
}