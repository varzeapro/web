"use client";

import { useParams, useRouter } from "next/navigation";
import { PublicProfile } from "@/src/components/player/public-profile";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";

// MOCK DATA
const mockPlayers: Record<string, any> = {
  "1": {
    id: "1",
    name: "Fernando Rocha",
    age: 24,
    position: "Atacante",
    location: "São Paulo, SP",
    bio: "Atacante rápido com bom drible. Jogo na várzea há 5 anos. Busco time para fins de semana.",
    stats: {
      games: 34,
      goals: 28,
      assists: 12,
    },
  },
  "2": {
    id: "2",
    name: "Diego Martins",
    age: 30,
    position: "Goleiro",
    location: "Osasco, SP",
    bio: "Goleiro experiente. Pego pênalti.",
    stats: {
      games: 50,
      goals: 0,
      assists: 2,
    },
  },
};

export default function JogadorPublicProfilePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const player = mockPlayers[id] || mockPlayers["1"]; // Fallback to 1

  const handleContact = () => {
    // In a real app, this would create a conversation and redirect to chat
    console.log("Starting conversation with", player.name);
    alert(`Mensagem enviada para ${player.name} (Simulação)`);
  };

  return (
    <div className="min-h-screen bg-onboarding">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">Perfil do Jogador</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <PublicProfile player={player} onContact={handleContact} />
      </main>
    </div>
  );
}
