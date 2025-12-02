import { api } from '@/lib/axios'
import type { MovieListResponse } from './interface/movie'

export const moviesDay = async () => {
  const { data } = await api.get<MovieListResponse>('/trending/movie/day')

  return data.results
}
