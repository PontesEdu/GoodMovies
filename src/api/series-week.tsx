import { api } from '@/lib/axios'
import type { TVSeriesListResponse } from './interface/series'

export const seriesWeek = async () => {
  const { data } = await api.get<TVSeriesListResponse>('/trending/tv/week')

  return data.results
}
