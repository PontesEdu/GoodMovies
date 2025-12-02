export interface TVSeries {
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  origin_country: string[]
}

export interface TVSeriesListResponse {
  page: number
  results: TVSeries[]
  total_pages: number
  total_results: number
}
