import { Link } from "@tanstack/react-router"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type Task = {
  id: string
  title: string
  description: string
  deadline: string
  priority: "alta" | "media" | "baixa"
  status: "pendente" | "em_progresso" | "concluida"
}

type TaskTableProps = {
  tasks?: Array<Task>
  isLoading?: boolean
}

export function TaskTable({ tasks = [], isLoading }: TaskTableProps) {
  if (isLoading) {
    return <TaskTableSkeleton />
  }

  if (!tasks.length) {
    return (
      <div className="flex items-center justify-center rounded-md border p-8 text-sm text-muted-foreground">
        Nenhuma tarefa encontrada
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead className="hidden md:table-cell">
              Descrição
            </TableHead>
            <TableHead>Prazo</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                <Link
                  to="/tasks/$id"
                  params={{ id: task.id }}
                  className="hover:underline"
                >
                  {task.title}
                </Link>
              </TableCell>

              <TableCell className="hidden md:table-cell text-muted-foreground">
                {task.description}
              </TableCell>

              <TableCell>
                {new Date(task.deadline).toLocaleDateString("pt-BR")}
              </TableCell>

              <TableCell>
                <Badge variant={priorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge variant="outline">
                  {statusLabel(task.status)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TaskTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead className="hidden md:table-cell">
              Descrição
            </TableHead>
            <TableHead>Prazo</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>

              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-55" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-22.5" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-17.5 rounded-full" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-22.5 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function priorityVariant(priority: Task["priority"]) {
  switch (priority) {
    case "alta":
      return "destructive"
    case "media":
      return "default"
    case "baixa":
      return "secondary"
    default:
      return "outline"
  }
}

function statusLabel(status: Task["status"]) {
  switch (status) {
    case "pendente":
      return "Pendente"
    case "em_progresso":
      return "Em progresso"
    case "concluida":
      return "Concluída"
    default:
      return status
  }
}
