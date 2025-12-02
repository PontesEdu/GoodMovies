import { api } from '@/lib/axios'

export const searchSeries = async (query: string) => {
  if (!query) return []

  const { data } = await api.get('/search/tv', {
    params: { query },
  })

  return data.results
}
