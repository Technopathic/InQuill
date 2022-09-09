import axios from 'axios'
import useSWR from 'swr'
import { useStore } from './store'
import * as api from './types'

const { dispatch }: types.Dispatch  = useStore()

const get = (url: string) => axios.get(url).then(res => res.data)
const post = (url: string, params: any) => axios.post(url, {...params}).then(res => res.data)

export const useGetEvents = () => {
    const { data, error } = useSWR(process.env.API_URL, get)

    return {

    }
}

export const useGetSessions = () => {
    const { data, error } = useSWR(process.env.API_URL, get)
}

export const useGetQuestions = () => {
    const { data, error } = useSWR(process.env.API_URL, get)
}

export const storeQuestions = () => {
    
    const params = {}
    const { data, error } = useSWR(process.env.API_URL, post(params))
}

export const storeQuestionVote = () => {
    const params = {}
    const { data, error } = useSWR(process.env.API_URL, post(params))
}