import {
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client';
import { useAuthStore } from '@/services/store/auth.store'


type SocketContextType = {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
})

export function SocketProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    if (!accessToken) return

    const socket = io('http://localhost:3001', {
      auth: {
        token: accessToken,
      },
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [accessToken])

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  return useContext(SocketContext)
}
