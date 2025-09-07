import { z } from "zod";
export interface Suggestion {
  id: number;
  title: string;
  youtube_url: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}
export const suggestionSchema = z.object({
  youtube_url: z
    .string()
    .url("URL inválida")
    .regex(/youtube\.com|youtu\.be/, "Deve ser um link do YouTube"),
});
export type SuggestionFormData = z.infer<typeof suggestionSchema>;
