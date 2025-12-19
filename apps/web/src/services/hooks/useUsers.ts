import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/auth.store'
import type { User } from '@/@types/User'

export function useUsers() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  return useQuery<Array<User>>({
    queryKey: ['users'],
    enabled: !!accessToken,
    queryFn: async () => {
      const res = await fetch(
        'http://localhost:3001/api/auth/users',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error('Erro ao buscar usuários')
      }

      return res.json()
    },
  })
}
