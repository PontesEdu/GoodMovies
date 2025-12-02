import { api } from '@/lib/axios'
import type { MovieListResponse } from './interface/movie'

export const moviesWeek = async () => {
  const { data } = await api.get<MovieListResponse>('/trending/movie/week')

  return data.results
}
