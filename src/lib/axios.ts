import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  params: {
    language: 'pt-BR',
  },
})

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${env.VITE_TMDB_TOKEN}`
  return config
})
