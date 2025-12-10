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
} from "@/src/components/team-dashboard";

// ============================================
// MOCK DATA
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
  hoursUntilMatch: 20,
};

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("🚨 Panic alert sent!");
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
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          ⚽ <span className="text-(--varzea-green)">União São Jorge</span>
        </h1>
        <p className="text-sm text-white/60">Painel do Capitão</p>
      </div>

      {/* Single Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column - Desktop Only */}
        <div className="hidden md:block md:col-span-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-bold text-white mb-2">Resumo</h3>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex justify-between">
                <span>Jogos no Mês</span>
                <span className="text-white">4</span>
              </div>
              <div className="flex justify-between">
                <span>Gasto Total</span>
                <span className="text-white">R$ 400</span>
              </div>
              <div className="flex justify-between">
                <span>Vitórias</span>
                <span className="text-(--varzea-green)">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="col-span-1 md:col-span-6 space-y-6">
          <section>
            <h2 className="text-xl font-bold text-white mb-4 md:hidden">
              Próximo Jogo
            </h2>
            <MatchStatusHero match={mockNextMatch} />
          </section>

          {playersNeeded > 0 && (
            <section>
              <PanicButton onPanic={handlePanic} />
            </section>
          )}

          <section>
            <h3 className="text-lg font-bold text-white mb-3">
              Solicitações Pendentes
            </h3>
            <PendingRequestsCard
              requests={mockRequests}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-1 md:col-span-3">
          <section>
            <h3 className="text-lg font-bold text-white mb-3">Financeiro</h3>
            <PayablePlayersList
              players={mockPayablePlayers}
              onMarkPaid={handleMarkPaid}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
