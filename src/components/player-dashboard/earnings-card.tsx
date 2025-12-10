"use client";

import { Wallet, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

interface EarningsCardProps {
  totalEarnings: number;
  pendingPayments: number;
  gamesThisSeason: number;
}

export function EarningsCard({
  totalEarnings,
  pendingPayments,
  gamesThisSeason,
}: EarningsCardProps) {
  const avgPerGame =
    gamesThisSeason > 0 ? Math.round(totalEarnings / gamesThisSeason) : 0;

  return (
    <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white shadow-xl overflow-hidden">
      {/* Golden accent bar at top */}
      <div className="h-1 bg-linear-to-r from-(--varzea-gold) to-(--varzea-orange)" />

      <CardContent className="py-5 px-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--varzea-gold)/20">
              <Wallet className="h-5 w-5 text-(--varzea-gold)" />
            </div>
            <span className="font-semibold text-white">Meus Ganhos</span>
          </div>
          <span className="text-xs text-white/60">Temporada 2024</span>
        </div>

        {/* Main Earnings */}
        <div className="text-center mb-4">
          <p className="text-xs text-white/60 mb-1">Total Recebido</p>
          <p className="text-4xl font-bold text-(--varzea-gold)">
            R$ {totalEarnings.toLocaleString("pt-BR")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <TrendingUp className="h-4 w-4 mx-auto mb-1 text-(--varzea-green)" />
            <p className="text-lg font-bold text-white">R$ {avgPerGame}</p>
            <p className="text-[10px] text-white/60">média/jogo</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <Calendar className="h-4 w-4 mx-auto mb-1 text-(--varzea-blue-light)" />
            <p className="text-lg font-bold text-white">{gamesThisSeason}</p>
            <p className="text-[10px] text-white/60">jogos</p>
          </div>
          <div className="rounded-lg bg-orange-500/10 p-3 text-center">
            <Wallet className="h-4 w-4 mx-auto mb-1 text-orange-400" />
            <p className="text-lg font-bold text-orange-400">
              R$ {pendingPayments}
            </p>
            <p className="text-[10px] text-white/60">a receber</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
