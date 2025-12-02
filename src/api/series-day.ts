import { api } from '@/lib/axios'
import type { TVSeriesListResponse } from './interface/series'

export const seriesDay = async () => {
  const { data } = await api.get<TVSeriesListResponse>('/trending/tv/day')

  return data.results
}
