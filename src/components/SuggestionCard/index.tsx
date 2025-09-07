import type { Suggestion } from "@/schema/suggestSchema";
import { Button } from "../Button";
import { api } from "@/services/api";
import { toast } from "sonner";

interface Props {
  suggestion: Suggestion;
  onSuccess: VoidFunction;
}

export function SuggestionCard({ suggestion, onSuccess }: Props) {
  function handleApproveSuggestion(id: number) {
    api.post(`/suggestions/${id}/approve`).then(() => {
      toast.success("Sugestão aprovada com sucesso");
      onSuccess();
    });
  }

  function handleRejectSuggestion(id: number) {
    api.post(`/suggestions/${id}/reject`).then(() => {
      toast.success("Sugestão rejeitada com sucesso");
      onSuccess();
    });
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            suggestion.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : suggestion.status === "approved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {suggestion.status === "pending"
            ? "Pendente"
            : suggestion.status === "approved"
            ? "Aprovado"
            : "Rejeitado"}
        </span>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {suggestion.description || "Sem descrição"}
        </p>
      </div>
      <div className="mt-2">
        <a
          href={suggestion.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {suggestion.youtube_url}
        </a>
      </div>
      {suggestion.status === "pending" && (
        <div className="mt-4 flex space-x-3">
          <Button
            variant="primary"
            onClick={() => handleApproveSuggestion(suggestion.id)}
          >
            Aprovar
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleRejectSuggestion(suggestion.id)}
          >
            Rejeitar
          </Button>
        </div>
      )}
    </div>
  );
}
