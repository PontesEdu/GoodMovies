interface MovieCardProps {
  title: string
  date: string
  image: string
}

export default function MovieCard({ title, date, image }: MovieCardProps) {
  return (
    <div className="overflow-hidden">
      <img
        src={image}
        alt="Capa do Filme"
        className="h-65 w-65 rounded-2xl bg-cover"
      />

      <div className="p-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-md text-gray-500">Lançado em: {date}</p>
      </div>
    </div>
  )
}
