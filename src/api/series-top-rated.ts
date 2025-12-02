import { api } from '@/lib/axios'
import type { TVSeriesListResponse } from './interface/series'

export const seriesTopRated = async () => {
  const { data } = await api.get<TVSeriesListResponse>('/tv/top_rated')

  return data.results
}
