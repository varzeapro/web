"use client";

import { useState } from "react";
import {
  NextGameCard,
  TeamSwipeCard,
  SeasonStatsCard,
  EarningsCard,
} from "@/src/components/player-dashboard";

// ============================================
// MOCK DATA
// ============================================

const mockNextGame = {
  id: "1",
  date: "15 Dez",
  time: "19:00",
  location: "Quadra do Parque Ibirapuera",
  opponentTeam: {
    name: "Gaviões da Fiel FC",
    initials: "GF",
    avatar: undefined,
  },
  status: "confirmed" as const,
};

const mockTeams = [
  {
    id: "1",
    name: "União São Jorge",
    initials: "USJ",
    avatar: undefined,
    lookingFor: "Atacante",
    level: "intermediário" as const,
    location: "Vila Madalena, SP",
    distance: "2.5 km",
    playDays: ["Sáb", "Dom"],
    playTime: "14:00 - 17:00",
    paymentPerGame: 50,
  },
  {
    id: "2",
    name: "Real Periferia",
    initials: "RP",
    avatar: undefined,
    lookingFor: "Meio-campista",
    level: "avançado" as const,
    location: "Pinheiros, SP",
    distance: "3.8 km",
    playDays: ["Qua", "Sex"],
    playTime: "19:00 - 21:00",
    paymentPerGame: 80,
  },
  {
    id: "3",
    name: "Bola na Rede FC",
    initials: "BR",
    avatar: undefined,
    lookingFor: "Goleiro",
    level: "iniciante" as const,
    location: "Butantã, SP",
    distance: "5.2 km",
    playDays: ["Sáb"],
    playTime: "08:00 - 12:00",
    paymentPerGame: 30,
  },
];

const mockStats = {
  games: 12,
  goals: 8,
  assists: 5,
};

const mockEarnings = {
  totalEarnings: 720,
  pendingPayments: 100,
  gamesThisSeason: 12,
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function PlayerDashboard() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const currentTeam = mockTeams[currentTeamIndex];
  const hasMoreTeams = currentTeamIndex < mockTeams.length;

  const handleLike = (teamId: string) => {
    console.log("Like:", teamId);
    setCurrentTeamIndex((prev) => prev + 1);
  };

  const handleSkip = (teamId: string) => {
    console.log("Skip:", teamId);
    setCurrentTeamIndex((prev) => prev + 1);
  };

  const handleFindMatch = () => {
    console.log("Find match clicked");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Olá, <span className="text-(--varzea-green)">Jogador</span> 👋
        </h1>
        <p className="text-sm text-white/60">Pronto para entrar em campo?</p>
      </div>

      {/* Single Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column - Desktop Only */}
        <div className="hidden md:block md:col-span-3">
          <SeasonStatsCard stats={mockStats} />
        </div>

        {/* Center Column */}
        <div className="col-span-1 md:col-span-6 space-y-6">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                🔥 Oportunidades de Jogo
              </h2>
              <span className="text-xs text-white/50">
                {hasMoreTeams
                  ? `${mockTeams.length - currentTeamIndex} restantes`
                  : ""}
              </span>
            </div>

            {hasMoreTeams && currentTeam ? (
              <TeamSwipeCard
                team={currentTeam}
                onLike={handleLike}
                onSkip={handleSkip}
              />
            ) : (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-white/70">
                  Você viu todas as oportunidades!
                </p>
                <p className="text-sm text-white/50 mt-1">
                  Volte mais tarde para novos times.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-3 space-y-6">
          <section>
            <h3 className="text-lg font-bold text-white mb-3 hidden md:block">
              Financeiro
            </h3>
            <EarningsCard
              totalEarnings={mockEarnings.totalEarnings}
              pendingPayments={mockEarnings.pendingPayments}
              gamesThisSeason={mockEarnings.gamesThisSeason}
            />
          </section>

          <section>
            <h3 className="text-lg font-bold text-white mb-3 hidden md:block">
              Próximo Jogo
            </h3>
            <NextGameCard game={mockNextGame} onFindMatch={handleFindMatch} />
          </section>
        </div>
      </div>
    </div>
  );
}
