import { useForm } from 'react-hook-form'
import { searchMovies } from '@/api/search-movie'
import MovieCard from '@/components/card'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import type { Movie } from '@/api/interface/movie'
import SkeletonMovieCard from '@/components/skeleton-card'
import { nowPlaying } from '@/api/now-playing'
import { searchAll } from '@/api/search-all'

export function ExploreHome() {
  const { register, watch } = useForm({
    defaultValues: {
      query: '',
      filters: 'now-Playing-movie',
    },
  })

  const query = watch('query')

  const { data: searchAllFn, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['search-all', query],
    queryFn: () => searchAll(query),
    enabled: query.length > 1,
  })

  const { data: nowPlayingFn } = useQuery({
    queryKey: ['now-playing'],
    queryFn: nowPlaying,
  })

  let toRender

  if (query.length > 1) {
    // ---------- MODO BUSCA ----------
    toRender = searchAllFn
  } else {
    toRender = nowPlayingFn
  }

  return (
    <div className="space-y-7">
      <h1 className="text-center text-4xl font-semibold">
        Explore diversos Filmes e Series
      </h1>

      <div className="flex w-full flex-col items-center gap-5 md:flex-row">
        <Input {...register('query')} placeholder="Digeite o que voce deseja" />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {isLoadingSearch || !toRender ? (
          <>
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
            <SkeletonMovieCard />
          </>
        ) : toRender.length === 0 ? (
          <div className="col-span-full w-full py-10 text-center">
            <h2 className="text-2xl font-semibold">Nenhum filme encontrado</h2>
            <p className="text-gray-400">Tente buscar outro nome…</p>
          </div>
        ) : (
          toRender.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              image={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              overview={movie.overview}
            />
          ))
        )}
      </div>
    </div>
  )
}
