"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";

export type ConfirmationStatus = "confirmed" | "declined" | "pending";

interface PlayerConfirmation {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  status: ConfirmationStatus;
}

interface TeamMatchCardProps {
  id: string;
  date: string;
  time: string;
  location: string;
  opponentTeam: {
    name: string;
    initials: string;
    avatar?: string;
  };
  paymentPerPlayer: number;
  confirmations: PlayerConfirmation[];
  requiredPlayers: number;
  isPast?: boolean;
  result?: { myScore: number; opponentScore: number };
  onClick?: (matchId: string) => void;
}

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/20",
  },
  declined: { icon: XCircle, color: "text-red-400", bg: "bg-red-500/20" },
  pending: {
    icon: HelpCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
  },
};

export function TeamMatchCard({
  id,
  date,
  time,
  location,
  opponentTeam,
  paymentPerPlayer,
  confirmations,
  requiredPlayers,
  isPast = false,
  result,
  onClick,
}: TeamMatchCardProps) {
  const confirmedCount = confirmations.filter(
    (p) => p.status === "confirmed"
  ).length;
  const declinedCount = confirmations.filter(
    (p) => p.status === "declined"
  ).length;
  const pendingCount = confirmations.filter(
    (p) => p.status === "pending"
  ).length;

  const isComplete = confirmedCount >= requiredPlayers;
  const needsAttention =
    !isPast && !isComplete && confirmedCount < requiredPlayers;

  return (
    <Card
      onClick={() => onClick?.(id)}
      className={cn(
        "border-0 text-white shadow-lg cursor-pointer transition-all hover:scale-[1.02]",
        isPast
          ? "bg-linear-to-br from-[#1a1a2e]/80 to-[#0f0f1a]/80 opacity-80"
          : needsAttention
          ? "bg-linear-to-br from-orange-900/40 to-[#1a1a2e]"
          : "bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a]"
      )}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src={opponentTeam.avatar} alt={opponentTeam.name} />
              <AvatarFallback className="bg-white/10 font-bold">
                {opponentTeam.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-white/50">vs</p>
              <p className="font-semibold">{opponentTeam.name}</p>
            </div>
          </div>

          {isPast && result ? (
            <div className="text-right">
              <p className="text-2xl font-bold">
                <span
                  className={
                    result.myScore > result.opponentScore
                      ? "text-(--varzea-green)"
                      : result.myScore < result.opponentScore
                      ? "text-red-400"
                      : "text-white"
                  }
                >
                  {result.myScore}
                </span>
                <span className="text-white/30 mx-1">x</span>
                <span className="text-white/70">{result.opponentScore}</span>
              </p>
            </div>
          ) : (
            <Badge className="bg-(--varzea-gold)/20 text-(--varzea-gold) border-0">
              💰 R$ {paymentPerPlayer}/jogador
            </Badge>
          )}
        </div>

        {/* Match Details */}
        <div className="flex flex-wrap gap-3 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[150px]">{location}</span>
          </div>
        </div>

        {/* Confirmations Summary */}
        <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-white/50" />
            <span className="text-sm">
              <span
                className={cn(
                  "font-bold",
                  isComplete ? "text-(--varzea-green)" : "text-orange-400"
                )}
              >
                {confirmedCount}
              </span>
              <span className="text-white/50">/{requiredPlayers}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-green-400">
              <CheckCircle className="h-3.5 w-3.5" /> {confirmedCount}
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <XCircle className="h-3.5 w-3.5" /> {declinedCount}
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              <HelpCircle className="h-3.5 w-3.5" /> {pendingCount}
            </span>
          </div>

          <ChevronRight className="h-4 w-4 text-white/30" />
        </div>
      </CardContent>
    </Card>
  );
}

export type { PlayerConfirmation, TeamMatchCardProps };
