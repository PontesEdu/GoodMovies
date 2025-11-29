import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import type { MovieCardProps } from './card'

export function CardDialog(movie: MovieCardProps) {
  return (
    <DialogContent>
      <DialogHeader className="mt-5">
        <img
          src={movie.image ?? ''}
          alt="imagem do movie"
          className="mx-auto h-65 w-[70%] rounded-xl bg-cover"
        />
        <DialogTitle>{movie.title}</DialogTitle>
        <DialogDescription>{movie.overview}</DialogDescription>
        <DialogDescription>{movie.date}</DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" className="w-full shadow-2xl">
            assistir Agora
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
