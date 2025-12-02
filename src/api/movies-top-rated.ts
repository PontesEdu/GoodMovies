import { api } from '@/lib/axios'
import type { MovieListResponse } from './interface/movie'

export const moviesTopRated = async () => {
  const { data } = await api.get<MovieListResponse>('/movie/top_rated')

  return data.results
}
