import { createBrowserRouter } from 'react-router'
import { Home } from './app/home/home'
import { AppLayout } from './_layout/app-layout'
import { Movie } from './app/movie/movie'
import { Series } from './app/series/series'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movie',
        element: <Movie />,
      },
      {
        path: '/series',
        element: <Series />,
      },
    ],
  },
])
