import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useTaskSocket } from '@/services/socket/useTaskSocket'

export function RootLayout() {
  useTaskSocket()

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}
