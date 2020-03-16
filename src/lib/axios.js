import axios from 'axios'
import { getToken } from './getToken'

const instance = axios.create({
  // baseURL: 'https://enigmatic-coast-79380.herokuapp.com',
  // baseURL: 'https://wfr-backend.herokuapp.com/',
  // baseURL: 'https://wfr-backend.herokuapp.com/',
  baseURL: 'http://localhost:4000',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

instance.interceptors.request.use(config => {
  const token = getToken()
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

export default instance
