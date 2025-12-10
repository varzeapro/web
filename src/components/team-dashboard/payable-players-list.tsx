"use client";

import { useState } from "react";
import { Wallet, Check, Clock, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface PayablePlayer {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  amount: number;
  isPaid: boolean;
  matchDate: string;
}

interface PayablePlayersListProps {
  players: PayablePlayer[];
  onMarkPaid?: (playerId: string) => void;
}

export function PayablePlayersList({
  players,
  onMarkPaid,
}: PayablePlayersListProps) {
  const [localPlayers, setLocalPlayers] = useState(players);

  const unpaidCount = localPlayers.filter((p) => !p.isPaid).length;
  const totalDebt = localPlayers
    .filter((p) => !p.isPaid)
    .reduce((acc, p) => acc + p.amount, 0);
  const totalPaid = localPlayers
    .filter((p) => p.isPaid)
    .reduce((acc, p) => acc + p.amount, 0);

  const handleMarkPaid = (playerId: string) => {
    setLocalPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, isPaid: true } : p))
    );
    onMarkPaid?.(playerId);
  };

  return (
    <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-(--varzea-gold)" />
            Pagamentos Pendentes
          </span>
          {unpaidCount > 0 && (
            <span className="flex items-center gap-1 text-sm font-normal text-orange-400">
              <AlertCircle className="h-4 w-4" />
              {unpaidCount} a pagar
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Summary */}
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 mb-4">
          <div>
            <p className="text-xs text-white/50">Dívida Total</p>
            <p
              className={cn(
                "text-xl font-bold",
                totalDebt > 0 ? "text-orange-400" : "text-(--varzea-green)"
              )}
            >
              R$ {totalDebt}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">Já Pago</p>
            <p className="text-xl font-bold text-(--varzea-green)">
              R$ {totalPaid}
            </p>
          </div>
        </div>

        {/* Player List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {localPlayers.map((player) => (
            <div
              key={player.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                player.isPaid ? "bg-green-500/10" : "bg-orange-500/10"
              )}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback className="bg-white/10 text-xs font-medium">
                  {player.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{player.name}</p>
                <p className="text-xs text-white/40">{player.matchDate}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "font-semibold",
                    player.isPaid ? "text-(--varzea-green)" : "text-orange-400"
                  )}
                >
                  R$ {player.amount}
                </span>

                {player.isPaid ? (
                  <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    Pago
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleMarkPaid(player.id)}
                    className="bg-(--varzea-green) hover:bg-(--varzea-green)/90 text-xs h-7"
                  >
                    Pagar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export type { PayablePlayer };
