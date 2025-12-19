import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/auth.store'
import type { CreateTaskFormData } from '@/schemas/create-task.schema'

export function useCreateTask() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  )

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateTaskFormData) => {
      const res = await fetch(
        'http://localhost:3001/api/tasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      )

      if (!res.ok) {
        throw new Error('Erro ao criar task')
      }

      return res.json()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    },
  })
}
