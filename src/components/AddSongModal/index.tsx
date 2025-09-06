import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../Button";
import { Input } from "../Input";
import useSongForm from "@/hooks/useSongForm";
import type { SongFormData } from "@/schema/songSchema";
import { api } from "@/services/api";
import { toast } from "sonner";
interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function AddSongModal({ open, onClose }: Props) {
  const { register, handleSubmit, errors } = useSongForm();

  const handleOpenChange = () => {
    onClose?.();
  };

  async function handleAddMusic(data: SongFormData) {
    try {
      await api.post("/songs", data, {
        headers: {
          contentType: "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Música adicionada com sucesso");
      onClose();
    } catch (err) {
      toast.error("Erro ao adicionar música");
    }
  }
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar música</DialogTitle>
          <DialogDescription>
            <form className="space-y-4" onSubmit={handleSubmit(handleAddMusic)}>
              <Input
                type="text"
                label="Título"
                placeholder="Título da música"
                {...register("title")}
                error={errors.title ? true : false}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}

              <Input
                type="url"
                label="URL do YouTube"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register("youtube_url")}
                error={errors.youtube_url ? true : false}
              />
              {errors.youtube_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.youtube_url.message}
                </p>
              )}

              <Input
                type="number"
                label="Contagem de Reproduções"
                placeholder="0"
                {...register("play_count", { valueAsNumber: true })}
                error={errors.play_count ? true : false}
              />
              {errors.play_count && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.play_count.message}
                </p>
              )}

              <div className="flex space-x-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary" size="sm">
                  Adicionar
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
