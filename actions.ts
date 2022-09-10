import axios from 'axios'

const post = (url: string, params: any) => axios.post(url, {...params}).then(res => res.data)

export const getEvents = async() => {
    const data = await axios.get(`${process.env.API_URL}/getEvents`)
    .then(res => res.data)

    return data
}

export const getSessions = async() => {
    const data = await axios.get(`${process.env.API_URL}/getSessions`)
    .then(res => res.data)

    return data
}

export const getQuestions = async() => {
    const data = await axios.get(`${process.env.API_URL}/getQuestions`)
    .then(res => res.data)

    return data
}

export const storeQuestion = async(sessionSlug: string, content: string, author: string) => {
    const data = await post(`${process.env.API_URL}/storeQuestion` || '', {
        sessionSlug,
        content,
        author
    })
    .then(res => res.data)

    return data
}

export const storeQuestionVote = async(id: number) => {
    const data = await post(`${process.env.API_URL}/storeQuestionVote` || '', {
        id
    })
    .then(res => res.data)

    return data
}