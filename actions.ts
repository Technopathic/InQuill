import axios from 'axios'
//import { createClient } from '@supabase/supabase-js'
//const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_PUBLIC_KEY || '')

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
    const data = await axios.get(`${process.env.API_URL}/getQuestions?sessionSlug=${slug}`)
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const storeQuestion = async(sessionSlug: string, content: string, author: string) => {
    const data = await axios({
        method: 'POST',
        url: `${process.env.API_URL}/postQuestion` || '',
        data: JSON.stringify({
            sessionSlug,
            content,
            author
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const storeQuestionVote = async(id: number) => {
    const data = await axios.post(`${process.env.API_URL}/postQuestionVote` || '', {
        id
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)
    .catch(error => error.response.data)

    return data
}

export const signInWithGoogle = async() => {
   /* const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    })

    return { user, session, error }*/
    return { user: null, session: null, error: null }
  }