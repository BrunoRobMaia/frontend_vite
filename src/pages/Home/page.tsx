import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { api } from "@/services/api";
import { toast, Toaster } from "sonner";
import { AddSuggestModal } from "@/components/AddSuggestModal";
import type { Suggestion } from "@/schema/suggestSchema";
import type { Song } from "@/schema/songSchema";
import { AddSongModal } from "@/components/AddSongModal";
import { Header } from "@/components/Header";

function SuggestionCard({
  suggestion,
  onApprove,
  onReject,
}: {
  suggestion: Suggestion;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-blue-600 truncate">
          {suggestion.title}
        </h3>
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
          <Button variant="primary" onClick={onApprove}>
            Aprovar
          </Button>
          <Button variant="secondary" onClick={onReject}>
            Rejeitar
          </Button>
        </div>
      )}
    </div>
  );
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"musicas" | "sugestoes">(
    "musicas"
  );
  const [songModal, setSongModal] = useState<boolean>(false);

  const [songs, setSongs] = useState<Song[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [addSuggestModal, setAddSuggestModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  function openSuggestModal() {
    setAddSuggestModal(true);
  }

  function closeSuggestModal() {
    setAddSuggestModal(false);
  }
  function openSongModal() {
    setSongModal(true);
  }

  function closeSongModal() {
    setSongModal(false);
  }

  async function fetchSongs() {
    try {
      const response = await api.get("/top-songs", {
        headers: {
          contentType: "application/json",
        },
      });
      setSongs(response.data);
    } catch (err) {
      toast.error("Erro ao carregar músicas");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSuggestions() {
    try {
      const response = await api.get("/api/v1/suggestions");
      setSuggestions(response.data);
    } catch (err) {
      toast.error("Erro ao carregar sugestões");
    }
  }

  async function handleApproveSuggestion(id: number) {
    try {
      await api.patch(`/api/v1/suggestions/${id}/approve`);
      fetchSuggestions();
      toast.success("Sugestão aprovada com sucesso");
    } catch (err) {
      toast.error("Erro ao aprovar sugestão");
    }
  }

  async function handleRejectSuggestion(id: number) {
    try {
      await api.patch(`/api/v1/suggestions/${id}/reject`);
      fetchSuggestions();
      toast.success("Sugestão rejeitada com sucesso");
    } catch (err) {
      toast.error("Erro ao rejeitar sugestão");
    }
  }

  useEffect(() => {
    fetchSongs();
    // fetchSuggestions();
  }, []);

  return (
    <>
      <AddSuggestModal open={addSuggestModal} onClose={closeSuggestModal} />
      <AddSongModal open={songModal} onClose={closeSongModal} />
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("musicas")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "musicas"
                    ? "border-[#462ebd] hover:border-[#312567] text-[#462ebd] cursor-pointer"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
                }`}
              >
                Músicas
              </button>
              <button
                onClick={() => setActiveTab("sugestoes")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "sugestoes"
                    ? "border-[#462ebd] hover:border-[#312567] text-[#462ebd] cursor-pointer"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer"
                }`}
              >
                Sugestões
              </button>
            </nav>
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "musicas" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Gerenciar Músicas
                </h2>
                <Button variant="primary" onClick={openSongModal}>
                  Adicionar Música
                </Button>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {songs.map((song) => (
                    <div key={song.id}>{song.title}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "sugestoes" && (
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
                {suggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    onApprove={() => handleApproveSuggestion(suggestion.id)}
                    onReject={() => handleRejectSuggestion(suggestion.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
