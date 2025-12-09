"use client";

import { Target, Trophy, Handshake } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface SeasonStats {
  games: number;
  goals: number;
  assists: number;
}

interface SeasonStatsCardProps {
  stats: SeasonStats;
  seasonName?: string;
}

export function SeasonStatsCard({
  stats,
  seasonName = "Temporada 2024",
}: SeasonStatsCardProps) {
  const statItems = [
    {
      icon: Trophy,
      label: "Jogos",
      value: stats.games,
      color: "from-[var(--varzea-blue)] to-[var(--varzea-blue-light)]",
      iconColor: "text-[var(--varzea-blue-light)]",
    },
    {
      icon: Target,
      label: "Gols",
      value: stats.goals,
      color: "from-[var(--varzea-green)] to-[var(--varzea-green-dark)]",
      iconColor: "text-[var(--varzea-green)]",
    },
    {
      icon: Handshake,
      label: "Assists",
      value: stats.assists,
      color: "from-[var(--varzea-gold)] to-[var(--varzea-orange)]",
      iconColor: "text-[var(--varzea-gold)]",
    },
  ];

  return (
    <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            Stats da Temporada
          </span>
          <span className="text-xs font-normal text-white/50">
            {seasonName}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-xl bg-white/5 p-4 text-center transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              {/* Gradient glow effect */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative">
                <item.icon
                  className={`mx-auto mb-2 h-6 w-6 ${item.iconColor}`}
                />
                <p className="text-3xl font-bold tabular-nums">{item.value}</p>
                <p className="mt-1 text-xs text-white/50 uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
