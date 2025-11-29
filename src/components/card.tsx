import { useState } from 'react'
import { Dialog, DialogTrigger } from './ui/dialog'
import { CardDialog } from './card-dialog'

export interface MovieCardProps {
  title: string
  date: string
  image: string
  overview: string
}

export default function MovieCard({
  title,
  date,
  image,
  overview,
}: MovieCardProps) {
  const [isCardOpen, setIsCardOpen] = useState(false)

  return (
    <Dialog open={isCardOpen} onOpenChange={setIsCardOpen}>
      <DialogTrigger asChild>
        <div className="overflow-hidden">
          <img
            src={image}
            alt="Capa do Filme"
            className="h-65 w-full rounded-2xl bg-cover"
          />

          <div className="p-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-md text-gray-500">Lançado em: {date}</p>
          </div>
        </div>
      </DialogTrigger>
      <CardDialog title={title} overview={overview} image={image} date={date} />
    </Dialog>
  )
}
