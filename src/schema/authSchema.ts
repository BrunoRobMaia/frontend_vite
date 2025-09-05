import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .min(1, "Email obrigatório")
    .email("Formato do email inválido"),
  password: z.string().min(1, "Senha obrigatório"),
});

export type AuthFormData = z.infer<typeof authSchema>;
