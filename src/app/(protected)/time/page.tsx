"use client";

import { useState } from "react";
import {
  MatchStatusHero,
  type MatchStatusData,
  PanicButton,
  PayablePlayersList,
  type PayablePlayer,
  PendingRequestsCard,
  type PlayerRequest,
  TeamBottomNavbar,
} from "@/src/components/team-dashboard";

// ============================================
// MOCK DATA - Cenário de URGÊNCIA
// Jogo amanhã, faltam 2 jogadores, jogadores a PAGAR
// ============================================

const mockNextMatch: MatchStatusData = {
  id: "1",
  date: "10 Dez",
  time: "19:00",
  location: "Quadra do Parque Ibirapuera",
  opponentTeam: {
    name: "Gaviões da Fiel FC",
    initials: "GF",
  },
  confirmedPlayers: 9,
  requiredPlayers: 11,
  hoursUntilMatch: 20, // Less than 24h - triggers URGENT state
};

// 💰 Jogadores que o TIME precisa PAGAR (correto para várzea)
const mockPayablePlayers: PayablePlayer[] = [
  {
    id: "1",
    name: "Carlos Silva",
    initials: "CS",
    amount: 50,
    isPaid: true,
    matchDate: "03 Dez",
  },
  {
    id: "2",
    name: "João Santos",
    initials: "JS",
    amount: 50,
    isPaid: true,
    matchDate: "03 Dez",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    initials: "PO",
    amount: 50,
    isPaid: false,
    matchDate: "03 Dez",
  },
  {
    id: "4",
    name: "Lucas Ferreira",
    initials: "LF",
    amount: 30,
    isPaid: false,
    matchDate: "26 Nov",
  },
  {
    id: "5",
    name: "Rafael Costa",
    initials: "RC",
    amount: 50,
    isPaid: true,
    matchDate: "26 Nov",
  },
];

const mockRequests: PlayerRequest[] = [
  {
    id: "1",
    name: "Fernando Rocha",
    initials: "FR",
    position: "Atacante",
    level: "intermediário",
    requestedAt: "2h atrás",
  },
  {
    id: "2",
    name: "Diego Martins",
    initials: "DM",
    position: "Goleiro",
    level: "avançado",
    requestedAt: "5h atrás",
  },
];

// ============================================
// PAGE COMPONENT
// ============================================

export default function TeamDashboard() {
  const [isPanicSent, setIsPanicSent] = useState(false);

  const handlePanic = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(
      "🚨 Panic alert sent! Team is now visible to available players"
    );
    setIsPanicSent(true);
  };

  const handleMarkPaid = (playerId: string) => {
    console.log(`Marked player ${playerId} as PAID`);
  };

  const handleAcceptRequest = (playerId: string) => {
    console.log(`Accepted player: ${playerId}`);
  };

  const handleRejectRequest = (playerId: string) => {
    console.log(`Rejected player: ${playerId}`);
  };

  const playersNeeded =
    mockNextMatch.requiredPlayers - mockNextMatch.confirmedPlayers;

  return (
    <div className="min-h-screen bg-onboarding pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-white">
            ⚽ <span className="text-(--varzea-green)">União São Jorge</span>
          </h1>
          <p className="text-sm text-white/60">Painel do Capitão</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md space-y-6 px-4 py-6">
        {/* Match Status Hero */}
        <section className="animate-fade-in">
          <MatchStatusHero match={mockNextMatch} />
        </section>

        {/* Panic Button - only show if players are needed */}
        {playersNeeded > 0 && (
          <section className="animate-fade-in animation-delay-100">
            <PanicButton onPanic={handlePanic} />
          </section>
        )}

        {/* Pending Requests */}
        <section className="animate-fade-in animation-delay-200">
          <PendingRequestsCard
            requests={mockRequests}
            onAccept={handleAcceptRequest}
            onReject={handleRejectRequest}
          />
        </section>

        {/* Payable Players - Team pays players! */}
        <section className="animate-fade-in animation-delay-300">
          <PayablePlayersList
            players={mockPayablePlayers}
            onMarkPaid={handleMarkPaid}
          />
        </section>
      </main>

      {/* Bottom Navigation */}
      <TeamBottomNavbar activeItem="home" />
    </div>
  );
}
