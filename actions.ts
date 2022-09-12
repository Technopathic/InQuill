import axios from 'axios'
import { createClient } from '@supabase/supabase-js'
import { NextApiRequest } from 'next'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'

const SUPABASE_URL = "https://qepbbrribkrkypytwssf.supabase.co"
export const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTE4MTc3MywiZXhwIjoxOTU0NzU3NzczfQ.-8sYelhGVpB5qLchFObwTg9l6lCMsuizj6wq_cbZzRk"
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)

export const setAuthCookie = async(event: AuthChangeEvent, session: Session | null) => {
    return await axios({
        method: 'POST',
        url: `${process.env.API_URL}/auth`,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ event, session }),
    })
}

export const getEvents = async() => {
    const data = await axios.get(`${process.env.API_URL}/getEvents`)
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const getSessions = async(slug: string) => {
    const data = await axios.get(`${process.env.API_URL}/getSessions?eventSlug=${slug}`)
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const getQuestions = async(slug: string) => {
    const data = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/getQuestions?sessionSlug=${slug}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
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
    }
}

export const storeQuestion = async(sessionSlug: string, content: string, author: string) => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios({
            method: 'POST',
            url: `${process.env.API_URL}/postQuestion` || '',
            data: JSON.stringify({
                sessionSlug,
                content,
                author
            }),
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

export const storeQuestionVote = async(id: number) => {
    const auth = localStorage.getItem('supabase.auth.token')
    if(auth) {
        const { currentSession }= JSON.parse(auth)
        const data = await axios.post(`${process.env.API_URL}/postQuestionVote` || '', {
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

export const signIn = async(provider: 'google' | 'twitter') => await supabase.auth.signIn({ provider })

export const getUser = () => supabase.auth.user()

export const getUserByCookie = async (req: NextApiRequest) => await supabase.auth.api.getUserByCookie(req)

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