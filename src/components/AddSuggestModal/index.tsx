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
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

export function AddSuggestModal({ open, onClose }: Props) {
  const { register, handleSubmit, errors, reset } = useSuggestForm();
  const [loading, setLoading] = useState<boolean>(false);
  async function handleAddSuggestion(data: SuggestionFormData) {
    try {
      setLoading(true);
      await api.post("/suggestions", data, {
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Sugestão enviada com sucesso! Aguarde a aprovação.");
      onClose?.();
    } catch (err) {
      toast.error("Erro ao enviar sugestão");
    } finally {
      setLoading(false);
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

              <div className="flex justify-end space-x-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={loading}
                >
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
