export type TaskResponse = {
  data: Array<Task>
  total: number
  page: number
  limit: number
}

export type Task = {
  id: string
  title: string
  description: string
  deadline: string
  priority: "alta" | "media" | "baixa"
  status: "pendente" | "em_progresso" | "concluida"
  createdAt: Date
  comments: Array<CommentsType>
}

type CommentsType = {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
  taskId: string;
}