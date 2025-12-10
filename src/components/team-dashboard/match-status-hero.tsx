"use client";

import { Calendar, Clock, MapPin, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Progress } from "@/src/components/ui/progress";
import { cn } from "@/src/lib/utils";

interface MatchStatusData {
  id: string;
  date: string;
  time: string;
  location: string;
  opponentTeam: {
    name: string;
    avatar?: string;
    initials: string;
  };
  confirmedPlayers: number;
  requiredPlayers: number;
  hoursUntilMatch: number;
}

interface MatchStatusHeroProps {
  match: MatchStatusData | null;
  onPanic?: () => void;
}

export function MatchStatusHero({ match, onPanic }: MatchStatusHeroProps) {
  if (!match) {
    return (
      <Card className="relative overflow-hidden border-0 bg-linear-to-br from-[#1a1a2e] to-[#16162a] text-white shadow-xl">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <Calendar className="h-12 w-12 text-white/30" />
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Nenhum jogo marcado</h3>
            <p className="text-sm text-white/60">
              Agende uma partida para seu time!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isUrgent =
    match.hoursUntilMatch <= 24 &&
    match.confirmedPlayers < match.requiredPlayers;
  const isCritical =
    match.hoursUntilMatch <= 12 &&
    match.confirmedPlayers < match.requiredPlayers;
  const playersNeeded = match.requiredPlayers - match.confirmedPlayers;
  const progressPercent =
    (match.confirmedPlayers / match.requiredPlayers) * 100;

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 text-white shadow-xl transition-all",
        isCritical
          ? "bg-linear-to-br from-red-900/80 to-red-950/90 animate-pulse"
          : isUrgent
          ? "bg-linear-to-br from-orange-900/70 to-orange-950/80"
          : "bg-linear-to-br from-(--varzea-green-dark) to-(--varzea-blue)"
      )}
    >
      {/* Alert Banner */}
      {isUrgent && (
        <div
          className={cn(
            "flex items-center justify-center gap-2 py-2 text-sm font-semibold",
            isCritical ? "bg-red-600" : "bg-orange-500"
          )}
        >
          <AlertTriangle className="h-4 w-4" />
          {isCritical
            ? "URGENTE: Jogo em menos de 12h!"
            : "Atenção: Jogo em menos de 24h!"}
        </div>
      )}

      <CardContent className="relative py-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-white/70">
            Próximo Jogo
          </span>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>em {match.hoursUntilMatch}h</span>
          </div>
        </div>

        {/* Opponent */}
        <div className="flex items-center gap-4 mb-5">
          <Avatar className="h-14 w-14 border-2 border-white/20 shadow-lg">
            <AvatarImage
              src={match.opponentTeam.avatar}
              alt={match.opponentTeam.name}
            />
            <AvatarFallback className="bg-white/10 text-lg font-bold text-white">
              {match.opponentTeam.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-white/60">Adversário</p>
            <h3 className="text-xl font-bold">{match.opponentTeam.name}</h3>
          </div>
        </div>

        {/* Match Details */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <Calendar className="h-4 w-4 text-(--varzea-gold)" />
            <span className="text-sm font-medium">{match.date}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-(--varzea-gold)" />
            <span className="text-sm font-medium">{match.time}</span>
          </div>
          <div className="col-span-2 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <MapPin className="h-4 w-4 shrink-0 text-(--varzea-gold)" />
            <span className="truncate text-sm font-medium">
              {match.location}
            </span>
          </div>
        </div>

        {/* Players Confirmation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">Confirmados</span>
            </div>
            <span
              className={cn(
                "text-lg font-bold",
                playersNeeded > 0
                  ? "text-(--varzea-gold)"
                  : "text-(--varzea-green)"
              )}
            >
              {match.confirmedPlayers} de {match.requiredPlayers}
            </span>
          </div>

          <Progress
            value={progressPercent}
            className={cn(
              "h-3",
              isCritical
                ? "[&>div]:bg-red-500"
                : isUrgent
                ? "[&>div]:bg-orange-500"
                : "[&>div]:bg-(--varzea-green)"
            )}
          />

          {playersNeeded > 0 && (
            <p className="text-center text-sm text-white/70">
              Faltam{" "}
              <span className="font-bold text-white">{playersNeeded}</span>{" "}
              jogador{playersNeeded > 1 ? "es" : ""}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export type { MatchStatusData };
