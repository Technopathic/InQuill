import axios from 'axios'

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
    /*const data = await axios.post(`${process.env.API_URL}/postQuestion` || '', JSON.stringify({
        sessionSlug,
        content,
        author
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })*/

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

    return data
}