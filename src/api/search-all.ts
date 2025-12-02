import { api } from '@/lib/axios'

export const searchAll = async (query: string) => {
  if (!query) return []

  const { data } = await api.get('/search/multi', {
    params: { query },
  })

  return data.results
}
