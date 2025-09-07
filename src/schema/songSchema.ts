import { z } from "zod";

export interface Song {
  id: number;
  title: string;
  youtube_url: string;
  play_count: string;
  created_at: string;
  updated_at: string;
}
export const songSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  youtube_url: z
    .string()
    .url("URL inválida")
    .regex(/youtube\.com|youtu\.be/, "Deve ser um link do YouTube"),
  play_count: z.string().min(1, "Contagem de visualizações é obrigatória"),
});
export type SongFormData = z.infer<typeof songSchema>;
