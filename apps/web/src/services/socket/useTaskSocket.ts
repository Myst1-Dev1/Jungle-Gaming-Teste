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

      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      })
    }

    const onTaskUpdated = (data: TaskEventPayload) => {
      alert(`✏️ Tarefa atualizada: ${data.title}`)
    }

    const onCommentNew = () => {
      alert('💬 Novo comentário em uma tarefa sua')
    }

    socket.on('task.created', onTaskCreated)
    socket.on('task.updated', onTaskUpdated)
    socket.on('comment.new', onCommentNew)

    return () => {
      socket.off('task.created', onTaskCreated)
      socket.off('task.updated', onTaskUpdated)
      socket.off('comment.new', onCommentNew)
    }
  }, [socket, queryClient])
}
