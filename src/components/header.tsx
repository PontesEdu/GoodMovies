import { Home, Menu, MoveIcon } from 'lucide-react'
import { NavLink } from './nav-link'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export function Header() {
  return (
    <header className="flex h-20 items-center justify-around border-b">
      <h1 className="text-3xl font-semibold tracking-tighter whitespace-nowrap">
        GoodMovies
      </h1>

      <div className="hidden items-center gap-5 md:flex">
        <NavLink to="/">
          <Home className="h-4 w-4" />
          home
        </NavLink>

        <NavLink to="/movie">Filmes</NavLink>

        <NavLink to="/series">Serie</NavLink>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-7 w-7" />
          </SheetTrigger>

          <SheetContent side="right" className="flex flex-col gap-6 p-6 pt-20">
            <NavLink to="/">
              <Home className="h-4 w-4" />
              Home
            </NavLink>

            <NavLink to="/movie">
              <MoveIcon className="h-4 w-4" />
              Filmes
            </NavLink>

            <NavLink to="/series">
              <MoveIcon className="h-4 w-4" />
              Serie
            </NavLink>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
