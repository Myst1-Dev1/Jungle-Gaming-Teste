import {  useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import type {SubmitHandler} from 'react-hook-form';

import type {CreateTaskFormData, CreateTaskFormInput} from '@/schemas/create-task.schema';
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'

import { createTaskSchema } from '@/schemas/create-task.schema'
import { useCreateTask } from '@/services/hooks/useCreateTask'
import { useUsers } from '@/services/hooks/useUsers'

export function CreateTaskModal() {
  const { data: users = [], isLoading: usersLoading } =
    useUsers()

  const form = useForm<CreateTaskFormInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      deadline: '',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      assignedUserIds: [],
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = form

  const {
    mutateAsync,
    isPending,
    error,
  } = useCreateTask()

  const onSubmit: SubmitHandler<CreateTaskFormInput> =
    async (data) => {
      await mutateAsync(data as CreateTaskFormData)
      reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <Plus size={20} className="mr-2" />
          Adicionar nova tarefa
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova tarefa</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input placeholder="Título" {...register('title')} />
          {errors.title && (
            <p className="text-sm text-red-500">
              {errors.title.message}
            </p>
          )}

          <Input
            placeholder="Descrição"
            {...register('description')}
          />
          {errors.description && (
            <p className="text-sm text-red-500">
              {errors.description.message}
            </p>
          )}

          <Input
            type="datetime-local"
            {...register('deadline')}
          />
          {errors.deadline && (
            <p className="text-sm text-red-500">
              {errors.deadline.message}
            </p>
          )}

          <Select
            defaultValue="MEDIUM"
            onValueChange={(v) =>
              setValue('priority', v as 'LOW' | 'MEDIUM' | 'HIGH', {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Baixa</SelectItem>
              <SelectItem value="MEDIUM">Média</SelectItem>
              <SelectItem value="HIGH">Alta</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue="IN_PROGRESS"
            onValueChange={(v) =>
              setValue('status', v as 'TODO' | 'IN_PROGRESS' | 'DONE', {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">A fazer</SelectItem>
              <SelectItem value="IN_PROGRESS">
                Em progresso
              </SelectItem>
              <SelectItem value="DONE">Concluída</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <p className="text-sm font-medium">
              Atribuir usuários
            </p>

            {!usersLoading &&
              users.map((user) => (
                <label
                  key={user.id}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    onCheckedChange={(checked) => {
                      const current =
                        getValues('assignedUserIds') ?? []

                      setValue(
                        'assignedUserIds',
                        checked
                          ? [...current, user.id]
                          : current.filter(
                              (id) => id !== user.id
                            ),
                        { shouldValidate: true }
                      )
                    }}
                  />
                  {user.username}
                </label>
              ))}
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {(error).message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full"
          >
            {isPending ? <Spinner /> : 'Criar tarefa'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
