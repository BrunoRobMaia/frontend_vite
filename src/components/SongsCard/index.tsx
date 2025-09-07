import type { Song } from "@/schema/songSchema";
import { BiDotsHorizontalRounded, BiEdit, BiTrash } from "react-icons/bi";
import { EditSongModal } from "../EditSongModal";
import { useState } from "react";
import { useAuth } from "@/hooks/authHook";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/services/api";
import { toast } from "sonner";
interface Props {
  song: Song;
}

export function SongsCard({ song }: Props) {
  const { user } = useAuth();
  const [editModal, setEditModal] = useState<boolean>(false);
  const videoId = song.youtube_url.split("v=")[1]?.split("&")[0];
  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : "/placeholder.png";

  function openEditModal() {
    setEditModal(true);
  }

  function closeEditModal() {
    setEditModal(false);
  }

  async function handleDeleteSong(id: number) {
    try {
      await api.delete(`/songs/${id}`);
      toast.success("Música deletada com sucesso");
      window.location.reload();
    } catch (err) {
      toast.error("Erro ao deletar música");
    }
  }

  return (
    <>
      <EditSongModal
        songData={song}
        songId={song.id}
        open={editModal}
        onClose={closeEditModal}
      />
      <div
        key={song.id}
        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex"
      >
        <div className="relative group w-20 h-20 flex-shrink-0">
          <img
            src={thumbnail}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={song.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-red-600 hover:bg-red-700 p-1 rounded-full text-xs"
            >
              ▶
            </a>
          </div>
        </div>

        <div className="p-2 flex-1 min-w-0 flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {song.title}
            </h3>
            <span>
              🎬{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 1,
              }).format(Number(song.play_count))}
            </span>
          </div>
          <div className="flex text-xs mt-1 flex-col">
            {user && (
              <Popover>
                <PopoverTrigger>
                  <div className="flex justify-end cursor-pointer">
                    <BiDotsHorizontalRounded size={20} />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="flex flex-col gap-2 w-[130px]"
                  side="bottom"
                  align="end"
                >
                  <div
                    onClick={openEditModal}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <BiEdit size={20} />
                    <p>Editar</p>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleDeleteSong(song.id)}
                  >
                    <BiTrash
                      size={20}
                      className="cursor-pointer text-red-500"
                    />
                    <p>Deletar</p>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <span>
              📅 {new Date(song.created_at).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
