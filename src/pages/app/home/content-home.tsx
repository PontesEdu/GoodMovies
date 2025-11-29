import { Controller, useForm } from 'react-hook-form'
import { searchMovies } from '@/api/search-movie'
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
import type { Movie } from '@/api/interface/movie'
import { nowPlaying } from '@/api/now-playing'
import SkeletonMovieCard from '@/components/skeleton-card'
import { moviePopular } from '@/api/movie-popular'
import { trending } from '@/api/trending'

export function ContentHome() {
  const { register, watch, control } = useForm({
    defaultValues: {
      query: '',
      filters: 'now-Playing-movie',
    },
  })

  const query = watch('query')
  const filterTypeSelect = watch('filters')

  const { data: nowPlayingFn } = useQuery({
    queryKey: ['now-playing'],
    queryFn: nowPlaying,
  })

  const { data: moviePopularFn } = useQuery({
    queryKey: ['movie-popular'],
    queryFn: moviePopular,
  })

  const { data: trendingFn } = useQuery({
    queryKey: ['trending'],
    queryFn: trending,
  })

  const { data: searchMoviesFn, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['search-movies', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 1,
  })

  let moviesToRender = []

  if (query.length > 1) {
    // ---------- MODO BUSCA ----------

    moviesToRender = searchMoviesFn
  } else {
    // ---------- MODO POPULAR ----------
    if (filterTypeSelect === 'now-Playing-movie') {
      moviesToRender = nowPlayingFn || []
    } else if (filterTypeSelect === 'movies-popular') {
      moviesToRender = moviePopularFn || []
    } else if (filterTypeSelect === 'trending') {
      moviesToRender = trendingFn
    }
  }

  return (
    <div className="space-y-7">
      <h1 className="text-center text-4xl font-semibold">
        Explore diversos Filmes
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
            defaultValue="now-Playing-movie"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Filmes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now-Playing-movie">Lançamentos</SelectItem>
                  <SelectItem value="movies-popular">Mais popular</SelectItem>
                  <SelectItem value="trending">Tendencia</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoadingSearch || !moviesToRender ? (
          <>
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
          </>
        ) : moviesToRender.length === 0 ? (
          <div className="col-span-full w-full py-10 text-center">
            <h2 className="text-2xl font-semibold">Nenhum filme encontrado</h2>
            <p className="text-gray-400">Tente buscar outro nome…</p>
          </div>
        ) : (
          moviesToRender.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            />
          ))
        )}
      </div>
    </div>
  )
}
