"use client";

import { useState } from "react";
import { DollarSign, Check, X, User } from "lucide-react";
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
import { Switch } from "@/src/components/ui/switch";
import { cn } from "@/src/lib/utils";

interface PlayerPayment {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  hasPaid: boolean;
  amount: number;
}

interface PaymentListProps {
  players: PlayerPayment[];
  matchFee: number;
  onTogglePayment?: (playerId: string, paid: boolean) => void;
}

export function PaymentList({
  players,
  matchFee,
  onTogglePayment,
}: PaymentListProps) {
  const [localPayments, setLocalPayments] = useState(players);

  const paidCount = localPayments.filter((p) => p.hasPaid).length;
  const totalCollected = localPayments
    .filter((p) => p.hasPaid)
    .reduce((acc, p) => acc + p.amount, 0);
  const totalExpected = localPayments.length * matchFee;

  const handleToggle = (playerId: string, paid: boolean) => {
    setLocalPayments((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, hasPaid: paid } : p))
    );
    onTogglePayment?.(playerId, paid);
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[var(--varzea-gold)]" />A
            Caixinha
          </span>
          <span className="text-sm font-normal text-white/50">
            R$ {matchFee}/jogador
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Summary */}
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 mb-4">
          <div>
            <p className="text-xs text-white/50">Arrecadado</p>
            <p className="text-xl font-bold text-[var(--varzea-green)]">
              R$ {totalCollected}
              <span className="text-sm font-normal text-white/30">
                {" "}
                / R$ {totalExpected}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">Pagaram</p>
            <p className="text-xl font-bold">
              {paidCount}
              <span className="text-sm font-normal text-white/30">
                {" "}
                / {localPayments.length}
              </span>
            </p>
          </div>
        </div>

        {/* Player List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {localPayments.map((player) => (
            <div
              key={player.id}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                player.hasPaid ? "bg-green-500/10" : "bg-white/5"
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
              </div>

              <div className="flex items-center gap-3">
                {player.hasPaid ? (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <Check className="h-3.5 w-3.5" />
                    Pago
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-white/40">
                    <X className="h-3.5 w-3.5" />
                    Pendente
                  </span>
                )}
                <Switch
                  checked={player.hasPaid}
                  onCheckedChange={(checked) =>
                    handleToggle(player.id, checked)
                  }
                  className="data-[state=checked]:bg-[var(--varzea-green)]"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export type { PlayerPayment };
