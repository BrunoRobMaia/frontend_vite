import { useState, useEffect } from "react";
import { Button } from "../Button";
import Pagination from "../Pagination";
import { SongsCard } from "../SongsCard";
import type { Song } from "@/schema/songSchema";
import { api } from "@/services/api";
import { toast } from "sonner";
import { AddSongModal } from "../AddSongModal";
import { useAuth } from "@/hooks/authHook";

export function SongTab() {
  const { user } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [songModal, setSongModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limitPage, setLimitPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  function openSongModal() {
    setSongModal(true);
  }

  function closeSongModal() {
    setSongModal(false);
  }

  async function fetchSongs() {
    try {
      setLoading(true);
      const response = await api.get("/top-songs", {
        headers: {
          contentType: "application/json",
        },
        params: {
          page: page,
          per_page: limitPage,
        },
      });
      setSongs(response.data.data);
      setTotalCount(response.data.total);
    } catch (err) {
      toast.error("Erro ao carregar músicas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSongs();
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
      <AddSongModal
        open={songModal}
        onClose={closeSongModal}
        onSuccess={fetchSongs}
      />
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Gerenciar Músicas
          </h2>
          {user && (
            <Button variant="primary" onClick={openSongModal}>
              Adicionar Música
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-y-auto h-[50vh]">
            <div className="flex flex-col gap-6 ">
              {songs.map((song) => {
                return <SongsCard key={song.id} song={song} />;
              })}
            </div>
          </div>
        )}
        <Pagination
          totalItems={totalCount}
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
