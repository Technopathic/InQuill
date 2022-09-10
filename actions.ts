import axios from 'axios'

const post = (url: string, params: any) => axios.post(url, {...params}).then(res => res.data)

export const getEvents = async() => {
    const data = await axios.get(`${process.env.API_URL}/getEvents`)
    .then(res => res.data)

    return data
}

export const getSessions = async(slug: string) => {
    const data = await axios.get(`${process.env.API_URL}/getSessions?eventSlug=${slug}`)
    .then(res => res.data)

    return data
}

export const getQuestions = async(slug: string) => {
    const data = await axios.get(`${process.env.API_URL}/getQuestions?sessionSlug=${slug}`)
    .then(res => res.data)

    return data
}

export const storeQuestion = async(sessionSlug: string, content: string, author: string) => {
    const data = await post(`${process.env.API_URL}/postQuestion` || '', {
        sessionSlug,
        content,
        author
    })
    .then(res => res.data)

    return data
}

export const storeQuestionVote = async(id: number) => {
    const data = await post(`${process.env.API_URL}/postQuestionVote` || '', {
        id
    })
    .then(res => res.data)

    return data
}