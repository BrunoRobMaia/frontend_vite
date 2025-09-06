import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z
      .string()
      .min(1, "Email obrigatório")
      .email("Formato do email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    password_confirmation: z
      .string()
      .min(6, "Confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "As senhas não são iguais",
    path: ["password_confirmation"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
