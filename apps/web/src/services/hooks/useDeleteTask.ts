import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/auth.store'

export function useDeleteTask() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId: string) => {
      const res = await fetch(
        `http://localhost:3001/api/tasks/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error('Erro ao deletar task')
      }

      return true
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })

      queryClient.invalidateQueries({
        queryKey: ['task'],
      })
    },
  })
}