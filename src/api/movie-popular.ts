import { api } from '@/lib/axios'
import type { MovieListResponse } from './interface/movie'

export const popularMovies = async () => {
  const { data } = await api.get<MovieListResponse>('/movie/popular')
  return data.results
}
