import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { api } from "@/services/api";
import { toast } from "sonner";
import type { SuggestionFormData } from "@/schema/suggestSchema";
import useSuggestForm from "@/hooks/useSuggestForm";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function AddSuggestModal({ open, onClose }: Props) {
  const { register, handleSubmit, errors, reset } = useSuggestForm();
  async function handleAddSuggestion(data: SuggestionFormData) {
    try {
      await api.post("/api/v1/suggestions", data);
      toast.success("Sugestão enviada com sucesso! Aguarde a aprovação.");
      onClose?.();
    } catch (err) {
      toast.error("Erro ao enviar sugestão");
    }
  }
  const handleOpenChange = () => {
    onClose?.();
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar sugestão</DialogTitle>
          <DialogDescription>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleAddSuggestion)}
            >
              <Input
                type="text"
                label="Título da Música"
                placeholder="Ex: Pagode em Brasília"
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
                label="Link do YouTube"
                placeholder="https://www.youtube.com/watch?v=..."
                {...register("youtube_url")}
                error={errors.youtube_url ? true : false}
              />
              {errors.youtube_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.youtube_url.message}
                </p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição (opcional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Alguma observação sobre esta música..."
                  {...register("description")}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" variant="primary" size="sm">
                  Enviar Sugestão
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
