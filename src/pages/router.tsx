import { createBrowserRouter } from 'react-router'
import { Home } from './app/home/home'
import { AppLayout } from './_layout/app-layout'

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
    ],
  },
])
