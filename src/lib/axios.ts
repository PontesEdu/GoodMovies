import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  return config
})
