import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),

  deadline: z
    .string()
    .min(1, 'Prazo é obrigatório')
    .transform((value) => new Date(value).toISOString()),

  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),

  assignedUserIds: z.array(z.string()).default([]),
})

export type CreateTaskFormInput = z.input<
  typeof createTaskSchema
>

export type CreateTaskFormData = z.infer<
  typeof createTaskSchema
>
