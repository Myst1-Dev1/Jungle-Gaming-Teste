import { z } from 'zod';

export const registerSchema = z.object({
    username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter no mínimo 3 caracteres.' }),

    email: z
    .email({ message: 'Insira um email válido.' }),

    password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;