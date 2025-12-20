import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSocket } from '@/providers/SocketProvider'

type TaskEventPayload = {
  taskId: string
  title: string
}

export function useTaskSocket() {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return

    const onTaskCreated = (data: TaskEventPayload) => {
      alert(`🆕 Nova tarefa atribuída: ${data.title}`)

      console.log('Invalidating tasks query cache...');

      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    }

    const onTaskUpdated = (data: TaskEventPayload) => {
      alert(`✏️ Tarefa atualizada: ${data.title}`)
    }

    const onTaskDeleted = (data: TaskEventPayload) => {
      alert(`✏️ Tarefa deletada: ${data.title}`)
    }

    const onCommentNew = () => {
      alert('💬 Novo comentário em uma tarefa sua')
    }

    socket.on('tasks:created', onTaskCreated)
    socket.on('tasks:updated', onTaskUpdated)
    socket.on('tasks:deleted', onTaskDeleted)
    socket.on('comment:new', onCommentNew)

    return () => {
      socket.off('tasks:created', onTaskCreated)
      socket.off('tasks:updated', onTaskUpdated)
      socket.off('tasks:deleted', onTaskDeleted)
      socket.off('comment:new', onCommentNew)
    }
  }, [socket, queryClient])
}
