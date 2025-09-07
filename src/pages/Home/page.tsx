import { useState } from "react";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import { SongTab } from "@/components/SongTab";
import { SuggestionTab } from "@/components/SuggestionTab";

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<"musicas" | "sugestoes">(
    "musicas"
  );

  return (
    <>
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "musicas" && <SongTab />}

          {activeTab === "sugestoes" && <SuggestionTab />}
        </main>
      </div>
    </>
  );
}
