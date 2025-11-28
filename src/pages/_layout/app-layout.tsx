import { Header } from '@/components/header'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="mb-40 min-h-max antialiased">
      <Header />

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  )
}
