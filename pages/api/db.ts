import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '')
import { QuestionData } from '../../types'

export const getEvents = async () => await supabase.from('events').select('id, title, slug').eq('archived', false)

export const getEvent = async(slug: string) => {
    const { data, error } = await supabase.from('events').select('id, title, slug').eq('slug', slug).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch event: ${error}` }
    }

    return data[0]
}

export const getSessions = async(slug: string) => await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker, start_at').eq('eventSlug', slug).eq('archived', false).order('start_at', { ascending: true })

export const getSession = async(slug: string) => {
    const { data, error } = await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker, start_at, end_at').eq('slug', slug).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch session: ${error}` }
    }

    return data[0]
}

export const getQuestions = async(slug: string) => await supabase.from('questions').select('id, sessionSlug, author, userId, votes, content, created_at').eq('sessionSlug', slug).eq('archived', false).order('id', { ascending: false })
   
export const getQuestion = async(id: number) => {
    const { data, error } = await supabase.from('questions').select('id, sessionSlug, votes').eq('id', id).eq('archived', false)
    if (error) { 
        return { error: `Unable to fetch question: ${error}` }
    }

    return data[0]
}

export const storeQuestion = async(questionData: QuestionData) => {
    const { data, error } =  await supabase.from('questions').insert(questionData)
    if (error) {
        return { error: `Unable to store question: ${JSON.stringify(error)}` }
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

export const updateQuestionVote = async(questionId: number) => {
    const { data, error } = await supabase.from('questions').select('id, votes').eq('id', questionId).eq('archived', false)
    if(error) {
        return { error: `Unable to update question votes: ${error}` }
    }

    const { data: updateData, error: updateError } = await supabase.from('questions').update({ votes: data[0].votes + 1 }).match({ id: data[0].id })
    if(updateError) {
        return { error: `Unable to update question votes: ${updateError}` }
    }

    return updateData[0]
}

export const deleteQuestion = async(questionId: number) => {
    const { data, error } = await supabase.from('questions').select('id, votes').eq('id', questionId).eq('archived', false)
    if(error) {
        return { error: `Unable to delete question: ${error}` }
    }

    const { data: updateData, error: updateError } = await supabase.from('questions').update({ archived: true }).match({ id: data[0].id })
    if(updateError) {
        return { error: `Unable to update question votes: ${updateError}` }
    }

    return updateData[0]
}

export const answerQuestion = async(questionId: number) => {
    const { data, error } = await supabase.from('questions').select('id, votes').eq('id', questionId).eq('archived', false)
    if(error) {
        return { error: `Unable to delete question: ${error}` }
    }

    const { data: updateData, error: updateError } = await supabase.from('questions').update({ answered: true }).match({ id: data[0].id })
    if(updateError) {
        return { error: `Unable to update question votes: ${updateError}` }
    }

    return updateData[0]
}

export const banUser = async(userId: string) => {
    const { data, error } = await supabase.from('bans').insert({ userId })
    if (error) {
        return { error: `Unable to ban user: ${error}` }
    }

   
    return data[0]
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
    const { data: user, error } = await supabase.auth.api.getUser(token)

    return user
}