"use client";

import { useState } from "react";
import {
  NextGameCard,
  TeamSwipeCard,
  SeasonStatsCard,
  BottomNavbar,
  type NavItem,
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
  },
];

const mockStats = {
  games: 12,
  goals: 8,
  assists: 5,
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function PlayerDashboard() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [activeNav, setActiveNav] = useState<NavItem>("home");

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
    setActiveNav("search");
  };

  const handleNavigate = (item: NavItem) => {
    console.log("Navigate to:", item);
    setActiveNav(item);
  };

  return (
    <div className="min-h-screen bg-onboarding pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-white">
            Olá, <span className="text-(--varzea-green)">Jogador</span> 👋
          </h1>
          <p className="text-sm text-white/60">Pronto para entrar em campo?</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Next Game Card */}
        <section className="animate-fade-in">
          <NextGameCard game={mockNextGame} onFindMatch={handleFindMatch} />
        </section>

        {/* Teams Match Section */}
        <section className="animate-fade-in animation-delay-200">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              🔥 Encontre seu time
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
                Você viu todos os times da região!
              </p>
              <p className="text-sm text-white/50 mt-1">
                Volte mais tarde para novos times.
              </p>
            </div>
          )}
        </section>

        {/* Season Stats */}
        <section className="animate-fade-in animation-delay-400">
          <SeasonStatsCard stats={mockStats} />
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeItem={activeNav} onNavigate={handleNavigate} />
    </div>
  );
}
