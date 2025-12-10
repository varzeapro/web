"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  TeamMatchCard,
  type PlayerConfirmation,
  ConfirmationList,
  CreateMatchSheet,
  type CreateMatchData,
  TeamBottomNavbar,
} from "@/src/components/team-dashboard";
import Link from "next/link";

// ============================================
// MOCK DATA
// ============================================

const mockRosterPlayers = [
  { id: "1", name: "Carlos Silva", initials: "CS" },
  { id: "2", name: "João Santos", initials: "JS" },
  { id: "3", name: "Pedro Oliveira", initials: "PO" },
  { id: "4", name: "Lucas Ferreira", initials: "LF" },
  { id: "5", name: "Rafael Costa", initials: "RC" },
  { id: "6", name: "Bruno Almeida", initials: "BA" },
  { id: "7", name: "Thiago Souza", initials: "TS" },
  { id: "8", name: "Gabriel Lima", initials: "GL" },
  { id: "9", name: "Matheus Pereira", initials: "MP" },
];

const mockUpcomingMatches = [
  {
    id: "1",
    date: "15 Dez",
    time: "19:00",
    location: "Quadra do Parque Ibirapuera",
    opponentTeam: { name: "Gaviões da Fiel FC", initials: "GF" },
    paymentPerPlayer: 50,
    requiredPlayers: 11,
    confirmations: [
      {
        id: "1",
        name: "Carlos Silva",
        initials: "CS",
        status: "confirmed" as const,
      },
      {
        id: "2",
        name: "João Santos",
        initials: "JS",
        status: "confirmed" as const,
      },
      {
        id: "3",
        name: "Pedro Oliveira",
        initials: "PO",
        status: "confirmed" as const,
      },
      {
        id: "4",
        name: "Lucas Ferreira",
        initials: "LF",
        status: "pending" as const,
      },
      {
        id: "5",
        name: "Rafael Costa",
        initials: "RC",
        status: "confirmed" as const,
      },
      {
        id: "6",
        name: "Bruno Almeida",
        initials: "BA",
        status: "declined" as const,
      },
      {
        id: "7",
        name: "Thiago Souza",
        initials: "TS",
        status: "confirmed" as const,
      },
      {
        id: "8",
        name: "Gabriel Lima",
        initials: "GL",
        status: "pending" as const,
      },
      {
        id: "9",
        name: "Matheus Pereira",
        initials: "MP",
        status: "confirmed" as const,
      },
    ],
  },
  {
    id: "2",
    date: "22 Dez",
    time: "16:00",
    location: "Campo do Pacaembu",
    opponentTeam: { name: "Real Periferia", initials: "RP" },
    paymentPerPlayer: 60,
    requiredPlayers: 11,
    confirmations: [
      {
        id: "1",
        name: "Carlos Silva",
        initials: "CS",
        status: "pending" as const,
      },
      {
        id: "2",
        name: "João Santos",
        initials: "JS",
        status: "pending" as const,
      },
      {
        id: "3",
        name: "Pedro Oliveira",
        initials: "PO",
        status: "pending" as const,
      },
    ],
  },
];

const mockPastMatches = [
  {
    id: "3",
    date: "08 Dez",
    time: "19:00",
    location: "Arena Pinheiros",
    opponentTeam: { name: "União SP", initials: "US" },
    paymentPerPlayer: 50,
    requiredPlayers: 11,
    confirmations: mockRosterPlayers.map((p) => ({
      ...p,
      status: "confirmed" as const,
    })),
    isPast: true,
    result: { myScore: 3, opponentScore: 1 },
  },
  {
    id: "4",
    date: "01 Dez",
    time: "15:00",
    location: "Quadra Municipal",
    opponentTeam: { name: "Fúria FC", initials: "FF" },
    paymentPerPlayer: 40,
    requiredPlayers: 11,
    confirmations: mockRosterPlayers.map((p) => ({
      ...p,
      status: "confirmed" as const,
    })),
    isPast: true,
    result: { myScore: 2, opponentScore: 2 },
  },
];

// ============================================
// PAGE COMPONENT
// ============================================

export default function TeamMatchesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const handleCreateMatch = (data: CreateMatchData) => {
    console.log("Creating match:", data);
    // TODO: API call to create match
  };

  const handleRemindPlayer = (playerId: string) => {
    console.log("Reminding player:", playerId);
    // TODO: Send reminder notification
  };

  const handleMatchClick = (matchId: string) => {
    setSelectedMatch(selectedMatch === matchId ? null : matchId);
  };

  const getSelectedMatchConfirmations = () => {
    const allMatches = [...mockUpcomingMatches, ...mockPastMatches];
    return allMatches.find((m) => m.id === selectedMatch)?.confirmations || [];
  };

  return (
    <div className="min-h-screen bg-onboarding pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto max-w-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/time">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/70 hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">📅 Partidas</h1>
              <p className="text-xs text-white/50">Gerencie os jogos do time</p>
            </div>
          </div>
          <CreateMatchSheet onCreateMatch={handleCreateMatch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-md px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 p-1 rounded-xl mb-6">
            <TabsTrigger
              value="upcoming"
              className="rounded-lg data-[state=active]:bg-(--varzea-green) data-[state=active]:text-white text-white/60"
            >
              Próximas ({mockUpcomingMatches.length})
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="rounded-lg data-[state=active]:bg-(--varzea-green) data-[state=active]:text-white text-white/60"
            >
              Histórico ({mockPastMatches.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="mt-0 space-y-4">
            {mockUpcomingMatches.map((match, index) => (
              <div
                key={match.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TeamMatchCard {...match} onClick={handleMatchClick} />

                {/* Expandable confirmation list */}
                {selectedMatch === match.id && (
                  <Card className="mt-2 border-0 bg-[#1a1a2e] text-white animate-fade-in">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        👥 Confirmações
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ConfirmationList
                        players={match.confirmations}
                        onRemind={handleRemindPlayer}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}

            {mockUpcomingMatches.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-white/70">Nenhuma partida marcada</p>
                <p className="text-sm text-white/50 mt-1">
                  Clique em "Nova Partida" para agendar
                </p>
              </div>
            )}
          </TabsContent>

          {/* Past Matches */}
          <TabsContent value="past" className="mt-0 space-y-4">
            {mockPastMatches.map((match, index) => (
              <div
                key={match.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TeamMatchCard {...match} onClick={handleMatchClick} />
              </div>
            ))}

            {mockPastMatches.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
                <p className="text-4xl mb-3">🏟️</p>
                <p className="text-white/70">Sem histórico de partidas</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <TeamBottomNavbar activeItem="matches" />
    </div>
  );
}
