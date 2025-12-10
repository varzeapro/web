"use client";

import { useState } from "react";
import {
  MatchCard,
  type MatchData,
} from "@/src/components/player-dashboard/match-card";
import { BottomNavbar } from "@/src/components/player-dashboard/bottom-navbar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

// ============================================
// MOCK DATA
// ============================================

const mockUpcomingMatches: MatchData[] = [
  {
    id: "1",
    date: "15 Dez",
    time: "19:00",
    location: "Quadra do Parque Ibirapuera",
    opponentTeam: {
      name: "Gaviões da Fiel FC",
      initials: "GF",
    },
    status: "confirmed",
  },
  {
    id: "2",
    date: "22 Dez",
    time: "14:00",
    location: "Campo do Pacaembu",
    opponentTeam: {
      name: "Real Periferia",
      initials: "RP",
    },
    status: "upcoming",
  },
];

const mockPastMatches: MatchData[] = [
  {
    id: "3",
    date: "08 Dez",
    time: "16:00",
    location: "Arena Pinheiros",
    opponentTeam: {
      name: "União São Jorge",
      initials: "USJ",
    },
    status: "completed",
    result: { myScore: 3, opponentScore: 1 },
  },
  {
    id: "4",
    date: "01 Dez",
    time: "10:00",
    location: "Quadra Municipal",
    opponentTeam: {
      name: "Bola na Rede FC",
      initials: "BR",
    },
    status: "completed",
    result: { myScore: 2, opponentScore: 2 },
  },
  {
    id: "5",
    date: "24 Nov",
    time: "15:00",
    location: "Campo do SESC",
    opponentTeam: {
      name: "Barcelona da Zona Sul",
      initials: "BZ",
    },
    status: "completed",
    result: { myScore: 1, opponentScore: 3 },
  },
  {
    id: "6",
    date: "17 Nov",
    time: "09:00",
    location: "Centro Esportivo",
    opponentTeam: {
      name: "Fúria FC",
      initials: "FF",
    },
    status: "cancelled",
  },
];

// ============================================
// PAGE COMPONENT
// ============================================

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleMatchClick = (matchId: string) => {
    console.log("Match clicked:", matchId);
    // TODO: Navigate to match details
  };

  return (
    <div className="min-h-screen bg-onboarding pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-white mb-4">
            📅 Minhas Partidas
          </h1>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl">
              <TabsTrigger
                value="upcoming"
                className="rounded-lg data-[state=active]:bg-(--varzea-green) data-[state=active]:text-white text-white/60"
              >
                Próximas ({mockUpcomingMatches.length})
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-lg data-[state=active]:bg-(--varzea-green) data-[state=active]:text-white text-white/60"
              >
                Histórico ({mockPastMatches.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="mt-0 space-y-3">
            {mockUpcomingMatches.length > 0 ? (
              mockUpcomingMatches.map((match, index) => (
                <div
                  key={match.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MatchCard match={match} onClick={handleMatchClick} />
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-white/70">Nenhuma partida marcada</p>
                <p className="text-sm text-white/50 mt-1">
                  Encontre um time e agende um jogo!
                </p>
              </div>
            )}
          </TabsContent>

          {/* Match History */}
          <TabsContent value="history" className="mt-0 space-y-3">
            {mockPastMatches.length > 0 ? (
              mockPastMatches.map((match, index) => (
                <div
                  key={match.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MatchCard match={match} onClick={handleMatchClick} />
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-4xl mb-3">🏟️</p>
                <p className="text-white/70">Sem histórico de partidas</p>
                <p className="text-sm text-white/50 mt-1">
                  Suas partidas anteriores aparecerão aqui
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeItem="matches" />
    </div>
  );
}
