import axios from 'axios'

const get = (url: string) => axios.get(url).then(res => res.data)
const post = (url: string, params: any) => axios.post(url, {...params}).then(res => res.data)
