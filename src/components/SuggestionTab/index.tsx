import type { Suggestion } from "@/schema/suggestSchema";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { AddSuggestModal } from "../AddSuggestModal";
import { SuggestionCard } from "../SuggestionCard";
import { api } from "@/services/api";
import { Button } from "../Button";
import Pagination from "../Pagination";

export function SuggestionTab() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [addSuggestModal, setAddSuggestModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(3);
  const [totalCount, setTotalCount] = useState<number>(0);

  function openSuggestModal() {
    setAddSuggestModal(true);
  }

  function closeSuggestModal() {
    setAddSuggestModal(false);
  }

  async function fetchSuggestions() {
    try {
      setLoading(true);
      const response = await api.get("/suggestions", {
        headers: {
          contentType: "application/json",
        },
        params: {
          page: page,
          per_page: limitPage,
        },
      });
      setSuggestions(response.data.data);
      setTotalCount(response.data.total);
    } catch (err) {
      toast.error("Erro ao carregar sugestões");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSuggestions();
  }, [page, limitPage]);

  function handleNextPage() {
    const totalPages = Math.ceil((totalCount || 0) / (limitPage || 1));
    if (page >= totalPages) return;
    setPage((prev) => prev + 1);
  }

  function handlePreviusPage() {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  }

  function handleLastPage() {
    const totalPages = Math.ceil((totalCount || 0) / (limitPage || 1));
    setPage(totalPages);
  }

  function handleFirstPage() {
    setPage(1);
  }

  function handleChangeLimitPerPage(value: number) {
    const totalPages = Math.ceil(totalCount / value);
    if (totalCount > 0 && page > totalPages) {
      setPage(totalPages);
    }
    setLimitPage(value);
  }
  return (
    <>
      <AddSuggestModal open={addSuggestModal} onClose={closeSuggestModal} />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Gerenciar Sugestões
          </h2>
          <Button variant="primary" onClick={openSuggestModal}>
            Nova Sugestão
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            suggestions.map((suggestion) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                onSuccess={fetchSuggestions}
              />
            ))
          )}
        </div>
        <Pagination
          totalItems={totalCount} // Usar totalCount em vez de songs.length
          currentPage={page}
          itemsPerPage={limitPage}
          prev={handlePreviusPage}
          next={handleNextPage}
          first={handleFirstPage}
          last={handleLastPage}
          limitChange={handleChangeLimitPerPage}
        />
      </div>
    </>
  );
}
