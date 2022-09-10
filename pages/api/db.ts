import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')
import { QuestionData } from '../../types'

export const getEvents = async () => {
    const { data, error } = await supabase.from('events').select('id, title, slug').eq('archived', false)
    if (error) {
        return { error: `Unable to fetch events: ${error}` }
    }

    return data[0]
}

export const getEvent = async(slug: string) => {
    const { data, error } = await supabase.from('events').select('id, title, slug').eq('slug', slug).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch event: ${error}` }
    }

    return data[0]
}

export const getSessions = async(slug: string) => {
    const { data, error } = await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker').eq('eventSlug', slug).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch sessions: ${JSON.stringify(error)}` }
    }

    return data[0]
}

export const getSession = async(slug: string) => {
    const { data, error } = await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker').eq('slug', slug).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch session: ${error}` }
    }

    return data[0]
}

export const getQuestions = async(slug: string) => {
    const { data, error } = await supabase.from('questions').select('id, sessionSlug, author, userId, votes, content, created_at').eq('sessionSlug', slug).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch questions: ${error}` }
    }

    return data[0]
}

export const getQuestion = async(id: number) => {
    const { data, error } = await supabase.from('questions').select('id, sessionSlug, votes').eq('id', id).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch question: ${error}` }
    }

    return data[0]
}

export const storeQuestion = async(questionData: QuestionData) => {
    const { data, error } =  await supabase.from('questions').insert({ questionData })
    if (error) {
        return { error: `Unable to store question: ${error}` }
    }

    return data[0]
}

export const storeQuestionVote = async(questionId: number, userId: number | null) => {
    const { data, error } = await supabase.from('questionVotes').insert({ questionId, userId })
    if (error) {
        return { error: `Unable to store vote: ${error}` }
    }

    return data[0]
}