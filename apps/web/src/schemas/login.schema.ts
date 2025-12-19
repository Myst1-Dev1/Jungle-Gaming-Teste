import { z } from 'zod';

export const loginSchema = z.object({
    email: z
    .email({ message: 'Insira um email válido.' }),

    password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;