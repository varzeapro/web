"use client";

import { Calendar, Clock, MapPin, Trophy } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

interface NextGameData {
  id: string;
  date: string;
  time: string;
  location: string;
  opponentTeam: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status: "confirmed" | "pending";
}

interface NextGameCardProps {
  game?: NextGameData | null;
  onFindMatch?: () => void;
}

export function NextGameCard({ game, onFindMatch }: NextGameCardProps) {
  if (!game) {
    return (
      <Card className="relative overflow-hidden border-0 bg-linear-to-br from-(--varzea-green-dark) to-(--varzea-blue) text-white shadow-xl">
        <div className="absolute inset-0 bg-[url('/pattern-field.svg')] opacity-10" />
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />

        <CardContent className="relative flex flex-col items-center gap-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm animate-float">
            <Trophy className="h-8 w-8 text-(--varzea-gold)" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold">Nenhum jogo marcado</h3>
            <p className="text-sm text-white/70">
              Encontre um time e entre em campo!
            </p>
          </div>

          <Button
            onClick={onFindMatch}
            className="mt-2 bg-(--varzea-gold) text-black font-semibold hover:bg-(--varzea-gold)/90 shadow-lg"
            size="lg"
          >
            Buscar Partidas
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-linear-to-br from-(--varzea-green-dark) to-(--varzea-blue) text-white shadow-xl">
      <div className="absolute inset-0 bg-[url('/pattern-field.svg')] opacity-10" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />

      <CardContent className="relative py-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-(--varzea-green)" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/80">
              Próximo Jogo
            </span>
          </div>
          <Badge
            variant="secondary"
            className={
              game.status === "confirmed"
                ? "bg-(--varzea-green) text-white border-0"
                : "bg-(--varzea-orange) text-white border-0"
            }
          >
            {game.status === "confirmed" ? "Confirmado" : "Pendente"}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="flex items-center gap-4">
          {/* Opponent Avatar */}
          <Avatar className="h-16 w-16 border-2 border-white/20 shadow-lg">
            <AvatarImage
              src={game.opponentTeam.avatar}
              alt={game.opponentTeam.name}
            />
            <AvatarFallback className="bg-white/10 text-lg font-bold text-white">
              {game.opponentTeam.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <p className="text-xs text-white/60">Você vs</p>
            <h3 className="text-xl font-bold">{game.opponentTeam.name}</h3>
          </div>
        </div>

        {/* Game Details */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <Calendar className="h-4 w-4 text-(--varzea-gold)" />
            <span className="text-sm font-medium">{game.date}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-(--varzea-gold)" />
            <span className="text-sm font-medium">{game.time}</span>
          </div>
          <div className="col-span-3 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
            <MapPin className="h-4 w-4 shrink-0 text-(--varzea-gold)" />
            <span className="truncate text-sm font-medium">
              {game.location}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
