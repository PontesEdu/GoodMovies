import { useForm } from 'react-hook-form'
import { searchMovies } from '@/api/search-movie'
import MovieCard from '@/components/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import type { Movie } from '@/api/interface/movie'
import { nowPlaying } from '@/api/now-playing'

export function ContentHome() {
  const { register, watch } = useForm({
    defaultValues: {
      query: '',
    },
  })

  const query = watch('query')

  const { data: nowPlayingFn } = useQuery({
    queryKey: ['now-playing'],
    queryFn: nowPlaying,
  })

  const { data: searchMoviesFn } = useQuery({
    queryKey: ['search-movies', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 1, // só busca se tiver pelo menos 2 letras
  })

  const moviesToRender = query.length > 1 ? searchMoviesFn : nowPlayingFn

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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Preços" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>all</SelectLabel>
                <SelectItem value="all">todos</SelectItem>
                <SelectItem value="pay">pago</SelectItem>
                <SelectItem value="free">gratuito</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Relevacia" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>all</SelectLabel>
                <SelectItem value="all">mais relevante</SelectItem>
                <SelectItem value="pay">menos relevante</SelectItem>
                <SelectItem value="free">tendencias</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {moviesToRender?.map((movie: Movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            date={movie.release_date}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  )
}
