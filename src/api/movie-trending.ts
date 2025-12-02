import { api } from '@/lib/axios'

export const trending = async () => {
  const { data } = await api.get('/trending/movie/day')
  return data.results
}
