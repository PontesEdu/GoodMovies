import { moviePopular } from '@/api/movie-popular'
import SkeletonMovieCard from './skeleton-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { useQuery } from '@tanstack/react-query'
import { moviesDay } from '@/api/movies-day'
import { trending } from '@/api/movie-trending'
import { seriesPopular } from '@/api/series-popular'
import { seriesDay } from '@/api/series-day'
import { seriesTopRated } from '@/api/series-top-rated'
interface CarouselCardProps {
  title: string
  typeCard: 'tranding' | 'day' | 'popular'
  type: 'movie' | 'series'
}
export function CarouselCard({ title, type, typeCard }: CarouselCardProps) {
  const { data: moviePopularFn } = useQuery({
    queryKey: ['movie-popular'],
    queryFn: moviePopular,
  })

  const { data: moviesDayFn } = useQuery({
    queryKey: ['movie-day'],
    queryFn: moviesDay,
  })

  const { data: trendingFn } = useQuery({
    queryKey: ['trending'],
    queryFn: trending,
  })

  //Series

  const { data: seriesPopularFn } = useQuery({
    queryKey: ['series-popular'],
    queryFn: seriesPopular,
  })

  const { data: seriesDayFn } = useQuery({
    queryKey: ['series-day'],
    queryFn: seriesDay,
  })

  const { data: seriesTopRatedFn } = useQuery({
    queryKey: ['series-top-rated'],
    queryFn: seriesTopRated,
  })

  let ToRender = []

  if (type === 'series') {
    // ---------- MODO BUSCA ----------

    if (typeCard === 'tranding') {
      ToRender = trendingFn || []
    } else if (typeCard === 'popular') {
      ToRender = seriesPopularFn || []
    } else if (typeCard === 'day') {
      ToRender = moviesDayFn || []
    }
  } else {
    // ---------- MODO POPULAR ----------
    if (typeCard === 'tranding') {
      ToRender = trendingFn || []
    } else if (typeCard === 'popular') {
      ToRender = moviePopularFn || []
    } else if (typeCard === 'day') {
      ToRender = moviesDayFn || []
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tighter">{title}</h2>

      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
              <div className="p-1">
                <SkeletonMovieCard />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
