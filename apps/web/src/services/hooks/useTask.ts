import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '../store/auth.store'
import type { Task } from '@/@types/Task'

export function useTask(taskId: string) {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery<Task>({
    queryKey: ['task', taskId],
    enabled: !!accessToken && !!taskId,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error('Erro ao buscar task')
      }

      return res.json()
    },
  })
}
