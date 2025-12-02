import { api } from '@/lib/axios'
import type { TVSeriesListResponse } from './interface/series'

export const seriesPopular = async () => {
  const { data } = await api.get<TVSeriesListResponse>('/tv/popular')

  return data.results
}
