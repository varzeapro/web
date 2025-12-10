"use client";

import { Calendar, Clock, MapPin, Trophy, X, Check } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";

type MatchStatus = "upcoming" | "confirmed" | "cancelled" | "completed";

interface MatchData {
  id: string;
  date: string;
  time: string;
  location: string;
  opponentTeam: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status: MatchStatus;
  result?: {
    myScore: number;
    opponentScore: number;
  };
}

interface MatchCardProps {
  match: MatchData;
  onClick?: (matchId: string) => void;
}

const statusConfig = {
  upcoming: {
    label: "Próximo",
    color:
      "bg-[var(--varzea-blue)]/20 text-[var(--varzea-blue-light)] border-[var(--varzea-blue)]/30",
  },
  confirmed: {
    label: "Confirmado",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  cancelled: {
    label: "Cancelado",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  completed: {
    label: "Realizado",
    color: "bg-white/10 text-white/60 border-white/20",
  },
};

export function MatchCard({ match, onClick }: MatchCardProps) {
  const statusCfg = statusConfig[match.status];
  const isCompleted = match.status === "completed";
  const isCancelled = match.status === "cancelled";

  const getResultIcon = () => {
    if (!match.result) return null;
    if (match.result.myScore > match.result.opponentScore) {
      return <Trophy className="h-4 w-4 text-[var(--varzea-gold)]" />;
    } else if (match.result.myScore < match.result.opponentScore) {
      return <X className="h-4 w-4 text-red-400" />;
    }
    return <Check className="h-4 w-4 text-white/50" />;
  };

  return (
    <Card
      className={cn(
        "border-0 text-white overflow-hidden cursor-pointer transition-all hover:scale-[1.02]",
        isCancelled
          ? "bg-gradient-to-br from-[#1a1a1a] to-[#141414] opacity-60"
          : "bg-gradient-to-br from-[#1a1a2e] to-[#16162a]"
      )}
      onClick={() => onClick?.(match.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <Avatar className="h-14 w-14 border-2 border-white/20">
            <AvatarImage
              src={match.opponentTeam.avatar}
              alt={match.opponentTeam.name}
            />
            <AvatarFallback className="bg-[var(--varzea-green-dark)] text-lg font-bold text-white">
              {match.opponentTeam.initials}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3
                className={cn(
                  "font-bold truncate",
                  isCancelled && "line-through opacity-70"
                )}
              >
                {match.opponentTeam.name}
              </h3>
              <Badge className={cn("border shrink-0 ml-2", statusCfg.color)}>
                {statusCfg.label}
              </Badge>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>{match.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{match.time}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 mt-1.5 text-sm text-white/40">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{match.location}</span>
            </div>
          </div>

          {/* Result (if completed) */}
          {isCompleted && match.result && (
            <div className="flex flex-col items-center justify-center gap-1 pl-2 border-l border-white/10">
              {getResultIcon()}
              <div className="text-center">
                <span className="text-lg font-bold text-[var(--varzea-green)]">
                  {match.result.myScore}
                </span>
                <span className="text-white/30 mx-1">x</span>
                <span className="text-lg font-bold text-white/60">
                  {match.result.opponentScore}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export type { MatchData, MatchStatus };
