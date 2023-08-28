import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import { NextApiRequest } from 'next'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import * as types from './types'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '')

export const setAuthCookie = async(event: AuthChangeEvent, session: Session | null) => {
    return await axios({
        method: 'POST',
        url: `${process.env.API_URL}/auth`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ event, session }),
    })
}

export const getEvents = async(): Promise<({ data: types.EventType[], error: string | null })>  => {
    const { data, error } = await supabase.from('events').select('id, title, slug, start_at, end_at').eq('archived', false)
    return {
        data: data || [],
        error: error ? error.message : null
    }
}

export const getEvent = async(slug: string): Promise<({ data: types.EventType | null, error: string | null })> => {
    const { data, error } = await supabase.from('events').select('id, title, slug, start_at, end_at').eq('slug', slug).eq('archived', false)
    return {
        data: data ? data[0] : null,
        error: error ? error.message : null
    }
}

export const getSessions = async(slug: string): Promise<({ data: types.SessionType[], error: string | null })> => {
    const { data, error } = await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker, start_at').eq('eventSlug', slug).eq('archived', false).order('start_at', { ascending: true })
    return {
        data: data || [],
        error: error ? error.message : null
    }
}

export const getSession = async(slug: string): Promise<({ data: types.SessionType | null, error: string | null })> => {
    const { data, error } = await supabase.from('sessions').select('id, eventSlug, title, slug, description, speaker, start_at, end_at').eq('slug', slug).eq('archived', false)
    return {
        data: data ? data[0] : null,
        error: error ? error.message : null
    }
}

export const getQuestions = async(slug: string): Promise<({ data: types.QuestionType[], error: string | null })> => {
    const { data, error } = await supabase.from('questions').select('id, sessionSlug, author, userId, votes, content, answered, created_at').eq('sessionSlug', slug).eq('archived', false).order('id', { ascending: false })
    return {
        data: data || [],
        error: error ? error.message : null
    }
}

export const getQuestion = async(id: number): Promise<({ data: types.QuestionType | null, error: string | null })> => {
    const { data, error } = await supabase.from('questions').select('id, sessionSlug, author, userId, votes, content, answered, created_at').eq('id', id).eq('archived', false)
    return {
        data: data ? data[0] : null,
        error: error ? error.message : null
    }
}

export const getQuestionVotes = async() => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/getQuestionVotes` || '',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentSession.access_token
            }
        })
        .then(res => res.data)
        .catch(error => error.response.data)
    
        return data
    } else {
        const questionVotes = localStorage.getItem('questionVotes')
        if(questionVotes) {
            return { votes: JSON.parse(questionVotes) }
        } else {
            return { votes: [] }
        }
    }
}

export const storeQuestion = async(sessionSlug: string, content: string, author: string) => {
    const auth = localStorage.getItem('supabase.auth.token')
    
    const headers: any = {
        'Content-Type': 'application/json'
    }

    if(auth) {
        const { currentSession }= JSON.parse(auth)
        headers.Authorization = currentSession.access_token
    }

    const data = await axios({
        method: 'POST',
        url: `${process.env.API_URL}/postQuestion` || '',
        data: JSON.stringify({
            sessionSlug,
            content,
            author
        }),
        headers
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const storeQuestionVote = async(id: number) => {
    const auth = localStorage.getItem('supabase.auth.token')

    const headers: any = {
        'Content-Type': 'application/json'
    }

    if(auth) {
        const { currentSession }= JSON.parse(auth)
        headers.Authorization = currentSession.access_token
    }

    const data = await axios.post(`${process.env.API_URL}/postQuestionVote` || '', {
        id
    }, {
        headers
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const deleteQuestion = async(id: number) => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios.post(`${process.env.API_URL}/deleteQuestion` || '', {
            id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentSession.access_token
            }
        })
        .then(res => res.data)
        .catch(error => error.response.data)
    
        return data
    }
}

export const answerQuestion = async(id: number) => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios.post(`${process.env.API_URL}/answerQuestion` || '', {
            id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentSession.access_token
            }
        })
        .then(res => res.data)
        .catch(error => error.response.data)
    
        return data
    }
}

export const signIn = async(provider: 'google' | 'twitter') => {return}//await supabase.auth.signIn({ provider })

export const getUser = async() => {
    const { data } = await supabase.auth.getSession()
    if(data) {
        return data.session?.user
    }

    return null;
}

export const getUserByCookie = async (req: NextApiRequest) => {return} //await supabase.auth.api.getUserByCookie(req)

export const getIsAdmin = async () => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios({
            method: 'GET',
            url: `${process.env.API_URL}/getAdmin` || '',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': currentSession.access_token
            }
        })
        .then(res => res.data)
        .catch(error => error.response.data)
    
        return data
    }
}

export const storeCheckin = async(eventSlug: string, qrCode: string) => {   
    const headers: any = {
        'Content-Type': 'application/json'
    }

    const data = await axios({
        method: 'POST',
        //url: `${process.env.API_URL}/postCheckIn` || '',
        url: `${process.env.API_URL}/api/postCheckIn`,
        data: JSON.stringify({
            eventSlug,
            qrCode
        }),
        headers
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const storeCheckinManual = async(eventSlug: string, firstName: string, lastName: string, email: string) => {   
    const headers: any = {
        'Content-Type': 'application/json'
    }

    const data = await axios({
        method: 'POST',
        //url: `${process.env.API_URL}/postCheckIn` || '',
        url: `${process.env.API_URL}/api/postCheckinManual`,
        data: JSON.stringify({
            eventSlug,
            firstName,
            lastName,
            email
        }),
        headers
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const updateSendInfo = async(eventSlug: string, email: string, sendInfo: boolean) => {   
    const headers: any = {
        'Content-Type': 'application/json'
    }

    const data = await axios({
        method: 'POST',
        //url: `${process.env.API_URL}/postCheckIn` || '',
        url: `${process.env.API_URL}/api/postSendInfo`,
        data: JSON.stringify({
            eventSlug,
            email,
            sendInfo
        }),
        headers
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}