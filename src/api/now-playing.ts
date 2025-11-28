import { api } from '@/lib/axios'
import type { MovieListResponse } from './interface/movie'

export const nowPlaying = async () => {
  const { data } = await api.get<MovieListResponse>('/movie/now_playing')
  return data.results
}
