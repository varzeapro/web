"use client";

import { CheckCircle, XCircle, HelpCircle, Bell } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

type ConfirmationStatus = "confirmed" | "declined" | "pending";

interface PlayerConfirmation {
  id: string;
  name: string;
  initials: string;
  avatar?: string;
  status: ConfirmationStatus;
}

interface ConfirmationListProps {
  players: PlayerConfirmation[];
  onRemind?: (playerId: string) => void;
}

const statusConfig = {
  confirmed: {
    icon: CheckCircle,
    label: "Confirmado",
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  declined: {
    icon: XCircle,
    label: "Não vai",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  pending: {
    icon: HelpCircle,
    label: "Aguardando",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
};

export function ConfirmationList({ players, onRemind }: ConfirmationListProps) {
  // Sort: pending first, then confirmed, then declined
  const sortedPlayers = [...players].sort((a, b) => {
    const order = { pending: 0, confirmed: 1, declined: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="space-y-2">
      {sortedPlayers.map((player) => {
        const config = statusConfig[player.status];
        const StatusIcon = config.icon;

        return (
          <div
            key={player.id}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
              config.bg
            )}
          >
            <Avatar className="h-9 w-9 border border-white/10">
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback className="bg-white/10 text-xs font-medium text-white">
                {player.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {player.name}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn("flex items-center gap-1 text-xs", config.color)}
              >
                <StatusIcon className="h-4 w-4" />
                {config.label}
              </span>

              {player.status === "pending" && onRemind && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRemind(player.id)}
                  className="h-7 px-2 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                >
                  <Bell className="h-3.5 w-3.5 mr-1" />
                  Lembrar
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
