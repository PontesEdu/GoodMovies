import { api } from '@/lib/axios'

export const searchMovies = async (query: string) => {
  if (!query) return []

  const { data } = await api.get('/search/movie', {
    params: { query },
  })

  return data.results
}
