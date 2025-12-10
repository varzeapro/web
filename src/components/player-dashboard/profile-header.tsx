"use client";

import { Camera, Award } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

interface ProfileHeaderProps {
  player: {
    name: string;
    nickname?: string;
    avatar?: string;
    initials: string;
    level: "iniciante" | "intermediário" | "avançado";
    stats: {
      games: number;
      goals: number;
      assists: number;
    };
  };
  onEditAvatar?: () => void;
}

const levelConfig = {
  iniciante: {
    label: "Iniciante",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  intermediário: {
    label: "Intermediário",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  avançado: {
    label: "Avançado",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};

export function ProfileHeader({ player, onEditAvatar }: ProfileHeaderProps) {
  const levelCfg = levelConfig[player.level];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1a1a2e] to-[#16162a] p-6">
      {/* Background glow */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-(--varzea-green)/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-(--varzea-blue)/10 blur-2xl" />

      <div className="relative flex flex-col items-center gap-4">
        {/* Avatar with edit button */}
        <div className="relative">
          <Avatar className="h-28 w-28 border-4 border-(--varzea-green)/30 shadow-xl">
            <AvatarImage src={player.avatar} alt={player.name} />
            <AvatarFallback className="bg-(--varzea-green-dark) text-3xl font-bold text-white">
              {player.initials}
            </AvatarFallback>
          </Avatar>
          <Button
            onClick={onEditAvatar}
            size="icon-sm"
            className="absolute -bottom-1 -right-1 rounded-full bg-(--varzea-green) text-white hover:bg-(--varzea-green)/90"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        {/* Name and nickname */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{player.name}</h1>
          {player.nickname && (
            <p className="text-sm text-white/60">@{player.nickname}</p>
          )}
        </div>

        {/* Level badge */}
        <Badge className={`border ${levelCfg.color}`}>
          <Award className="h-3 w-3 mr-1" />
          {levelCfg.label}
        </Badge>

        {/* Stats */}
        <div className="mt-2 flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {player.stats.games}
            </p>
            <p className="text-xs text-white/50">Jogos</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-(--varzea-green)">
              {player.stats.goals}
            </p>
            <p className="text-xs text-white/50">Gols</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-(--varzea-gold)">
              {player.stats.assists}
            </p>
            <p className="text-xs text-white/50">Assists</p>
          </div>
        </div>
      </div>
    </div>
  );
}
