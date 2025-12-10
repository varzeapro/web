"use client";

import { useState } from "react";
import { UserPlus, MoreVertical, Crown, Shield, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

// ============================================
// MOCK DATA
// ============================================

interface RosterPlayer {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  position: string;
  role: "captain" | "vice" | "player";
  joinedAt: string;
  gamesPlayed: number;
}

const mockRoster: RosterPlayer[] = [
  {
    id: "1",
    name: "Carlos Silva",
    initials: "CS",
    position: "Atacante",
    role: "captain",
    joinedAt: "Jan 2024",
    gamesPlayed: 24,
  },
  {
    id: "2",
    name: "João Santos",
    initials: "JS",
    position: "Goleiro",
    role: "vice",
    joinedAt: "Jan 2024",
    gamesPlayed: 22,
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    initials: "PO",
    position: "Zagueiro",
    role: "player",
    joinedAt: "Mar 2024",
    gamesPlayed: 18,
  },
  {
    id: "4",
    name: "Lucas Ferreira",
    initials: "LF",
    position: "Lateral",
    role: "player",
    joinedAt: "Mar 2024",
    gamesPlayed: 16,
  },
  {
    id: "5",
    name: "Rafael Costa",
    initials: "RC",
    position: "Volante",
    role: "player",
    joinedAt: "Abr 2024",
    gamesPlayed: 14,
  },
  {
    id: "6",
    name: "Bruno Almeida",
    initials: "BA",
    position: "Meia",
    role: "player",
    joinedAt: "Mai 2024",
    gamesPlayed: 12,
  },
  {
    id: "7",
    name: "Thiago Souza",
    initials: "TS",
    position: "Meia",
    role: "player",
    joinedAt: "Jun 2024",
    gamesPlayed: 10,
  },
  {
    id: "8",
    name: "Gabriel Lima",
    initials: "GL",
    position: "Atacante",
    role: "player",
    joinedAt: "Jul 2024",
    gamesPlayed: 8,
  },
  {
    id: "9",
    name: "Matheus Pereira",
    initials: "MP",
    position: "Lateral",
    role: "player",
    joinedAt: "Ago 2024",
    gamesPlayed: 6,
  },
];

const roleConfig = {
  captain: {
    label: "Capitão",
    icon: Crown,
    color: "text-[var(--varzea-gold)]",
  },
  vice: {
    label: "Vice",
    icon: Shield,
    color: "text-[var(--varzea-blue-light)]",
  },
  player: { label: "Jogador", icon: null, color: "text-white/50" },
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function RosterPage() {
  const [roster] = useState(mockRoster);

  const handleRemovePlayer = (playerId: string) => {
    console.log("Remove player:", playerId);
  };

  const handlePromotePlayer = (
    playerId: string,
    newRole: "vice" | "captain"
  ) => {
    console.log("Promote player:", playerId, "to", newRole);
  };

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">👥 Elenco</h1>
          <p className="text-xs text-white/50">{roster.length} jogadores</p>
        </div>
        <Button
          size="sm"
          className="bg-(--varzea-green) hover:bg-(--varzea-green)/90"
        >
          <UserPlus className="h-4 w-4 mr-1" />
          Convidar
        </Button>
      </div>

      {/* Roster List */}
      <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            Jogadores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {roster.map((player, index) => {
            const roleInfo = roleConfig[player.role];
            const RoleIcon = roleInfo.icon;

            return (
              <div
                key={player.id}
                className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback className="bg-white/10 text-sm font-medium">
                    {player.initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{player.name}</p>
                    {RoleIcon && (
                      <RoleIcon className={`h-4 w-4 ${roleInfo.color}`} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge className="text-[10px] bg-white/10 text-white/60 border-0">
                      {player.position}
                    </Badge>
                    <span className="text-xs text-white/40">
                      {player.gamesPlayed} jogos
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-white/40 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[#1a1a2e] border-white/10 text-white"
                  >
                    {player.role !== "captain" && (
                      <DropdownMenuItem
                        onClick={() => handlePromotePlayer(player.id, "vice")}
                        className="hover:bg-white/10"
                      >
                        <Shield className="h-4 w-4 mr-2 text-(--varzea-blue-light)" />
                        Promover a Vice
                      </DropdownMenuItem>
                    )}
                    {player.role !== "captain" && (
                      <DropdownMenuItem
                        onClick={() => handleRemovePlayer(player.id)}
                        className="hover:bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remover do time
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
