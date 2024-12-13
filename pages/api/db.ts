import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_KEY || '')
import * as types from '../../types'

export const getEvents = async () => await supabase.from('events').select('id, title, slug, start_at, end_at').eq('archived', false)

export const getEvent = async(slug: string) => {
    const { data, error } = await supabase.from('events').select('id, title, slug, eventbriteId, multiCheckin, start_at, end_at, requireAuth').eq('slug', slug).eq('archived', false).single()
    return { data, error }
}

export const getSessions = async(slug: string) => await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker, start_at').eq('eventSlug', slug).eq('archived', false).order('start_at', { ascending: true })

export const getSession = async(slug: string) => {
    const { data, error } = await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker, start_at, end_at').eq('slug', slug).eq('archived', false)
    return { data, error }
}

export const getQuestions = async(slug: string) => await supabase.from('questions').select('id, sessionSlug, author, userId, votes, content, answered, created_at').eq('sessionSlug', slug).eq('archived', false).order('id', { ascending: false })

export const getQuestion = async(id: number) => {
    const { data, error } = await supabase.from('questions').select('id, sessionSlug, votes').eq('id', id).eq('archived', false)
    return { data, error }
}

export const getQuestionVotes = async(userId: string) => await supabase.from('questionVotes').select('questionId').eq('userId', userId)

export const getQuestionVote = async(questionId: number, userId: string) => {
    const { data, error } = await supabase.from('questionVotes').select('id').eq('userId', userId).eq('questionId', questionId).single()
    return { data, error }
}

export const storeQuestion = async(questionData: types.QuestionData) => {
    const { data, error } =  await supabase.from('questions').insert(questionData).select()
    return { data, error }
}

export const storeQuestionVote = async(questionId: number, userId: string | null) => {
    const { data, error } = await supabase.from('questionVotes').insert({ questionId, userId })
    return { data, error }
}

export const updateQuestionVote = async(questionId: number) => {
    const { data, error } = await supabase.from('questions').select('id, votes').eq('id', questionId).eq('archived', false)
    if(data) {
        const { data: updateData, error: updateError } = await supabase.from('questions').update({ votes: data[0].votes + 1 }).match({ id: data[0].id }).select()
        return { updateData, error, updateError }
    }

    return { error }
}

export const deleteQuestion = async(questionId: number) => {
    const { data, error } = await supabase.from('questions').select('id, votes').eq('id', questionId).eq('archived', false)
    if(error) {
        return { error: `Unable to delete question: ${error}` }
    }

    const { data: updateData, error: updateError } = await supabase.from('questions').update({ archived: true }).match({ id: data[0].id })
    return { updateData, error, updateError }
}

export const answerQuestion = async(questionId: number) => {
    const { data, error } = await supabase.from('questions').select('id, votes').eq('id', questionId).eq('archived', false)
    if(error) {
        return { error: `Unable to delete question: ${error}` }
    }

    const { data: updateData, error: updateError } = await supabase.from('questions').update({ answered: true }).match({ id: data[0].id })
    if(!updateData || updateError) {
        return { error: `Unable to update question votes: ${updateError}` }
    }

    return updateData[0]
}

export const banUser = async(userId: string) => {
    const { data, error } = await supabase.from('bans').insert({ userId })
    return { data, error }
}

export const isBanned = async(userId: string) => {
    const { data, error } = await supabase.from('bans').select('*').eq('userId', userId)
    if(error || data.length === 0) {
        return false
    }

    return true
}

export const isAdmin = async(userId: string) => {
    const { data, error } = await supabase.from('admins').select('*').eq('userId', userId)
    if(error || data.length === 0) {
        return false
    }

    return true
}

export const getUser = async(token: string) => {
    const { data, error } = await supabase.auth.getUser(token)
    return { user: data, error }
}

export const setAuth = async(req: NextApiRequest, res: NextApiResponse) => {
    //supabase.auth.api.setAuthCookie(req, res)
}

export const getCheckin = async(email: string, eventId: number) => {
    const { data, error } = await supabase.from('checkins').select('id, firstName, lastName, email, name, eventId, hasTicket').eq('email', email).eq('eventId', eventId).single()
    return {
        data,
        error
    }
}

export const storeCheckin = async(checkinData: types.CheckInData) => {
    const { error } =  await supabase.from('checkins').insert(checkinData)
    return {
        error
    }
}

export const updateCheckinIGDAInfo = async(id: number, sendIGDAInfo: boolean) => {
    const { error } = await supabase.from('checkins').update({ sendIGDAInfo }).match({ id })
    return {
        error
    }
}

export const storeKiosk = async(kioskData: types.KioskData) => {
    const { error } =  await supabase.from('qs-kiosk').insert(kioskData)
    return {
        error
    }
}

export const getCard = async(slug: string) => {
    const { data, error } = await supabase.from('qs-greetings').select('id, color, vfx, slotOne, slotTwo, slotThree, slotFour, cardText, slug, visits').eq('slug', slug).single();
    return { data, error }
}

export const storeCard = async(cardData: types.Card) => {
    const { error } =  await supabase.from('qs-greetings').insert(cardData);
    return {
        error
    }
}

export const updateCard = async(id: number, visits: number) => {
    const { error } = await supabase.from('qs-greetings').update({ visits }).match({ id })
    return {
        error
    }
}