import { Controller, useForm } from 'react-hook-form'
import MovieCard from '@/components/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import SkeletonMovieCard from '@/components/skeleton-card'
import { seriesTopRated } from '@/api/series-top-rated'
import { searchSeries } from '@/api/search-series'
import { seriesDay } from '@/api/series-day'
import { seriesWeek } from '@/api/series-week'
import { seriesPopular } from '@/api/series-popular'
import type { TVSeries } from '@/api/interface/series'

export function ExploreSeries() {
  const { register, watch, control } = useForm({
    defaultValues: {
      query: '',
      filters: 'series-top-rated',
    },
  })

  const query = watch('query')
  const filterTypeSelect = watch('filters')

  const { data: searchSeriesFn, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['series-search', query],
    queryFn: () => searchSeries(query),
    enabled: query.length > 1,
  })

  const { data: seriesTopRatedFn } = useQuery({
    queryKey: ['series-top-rated'],
    queryFn: seriesTopRated,
  })

  const { data: seriesDayFn } = useQuery({
    queryKey: ['series-day'],
    queryFn: seriesDay,
  })

  const { data: seriesWeekFn } = useQuery({
    queryKey: ['series-week'],
    queryFn: seriesWeek,
  })

  const { data: seriesPopularFn } = useQuery({
    queryKey: ['series-popular'],
    queryFn: seriesPopular,
  })

  let seriesToRender

  if (query.length > 1) {
    // ---------- MODO BUSCA ----------

    seriesToRender = searchSeriesFn
  } else {
    // ---------- MODO POPULAR ----------
    if (filterTypeSelect === 'series-week') {
      seriesToRender = seriesWeekFn || []
    } else if (filterTypeSelect === 'series-day') {
      seriesToRender = seriesDayFn || []
    } else if (filterTypeSelect === 'series-top-rated') {
      seriesToRender = seriesTopRatedFn
    } else if (filterTypeSelect === 'series-popular') {
      seriesToRender = seriesPopularFn
    }
  }

  return (
    <div className="space-y-7">
      <h1 className="text-center text-4xl font-semibold">
        Explore diversas Series
      </h1>

      <div className="flex w-full flex-col items-center gap-5 md:flex-row">
        <div className="w-full md:w-[80%]">
          <Input
            {...register('query')}
            placeholder="Digeite o que voce deseja"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-5">
          <Controller
            name="filters"
            control={control}
            defaultValue="series-top-rated"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Series" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="series-top-rated">
                    mais comentado
                  </SelectItem>
                  <SelectItem value="series-day">em Alta de hoje</SelectItem>
                  <SelectItem value="series-week">em Alta da semana</SelectItem>
                  <SelectItem value="series-popular">Mais Populares</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoadingSearch || !seriesToRender ? (
          <>
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
          </>
        ) : seriesToRender.length === 0 ? (
          <div className="col-span-full w-full py-10 text-center">
            <h2 className="text-2xl font-semibold">Nenhum filme encontrado</h2>
            <p className="text-gray-400">Tente buscar outro nome…</p>
          </div>
        ) : (
          seriesToRender.map((movie: TVSeries) => (
            <MovieCard
              key={movie.id}
              title={movie.name}
              date={movie.first_air_date}
              image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              overview={movie.overview}
            />
          ))
        )}
      </div>
    </div>
  )
}
