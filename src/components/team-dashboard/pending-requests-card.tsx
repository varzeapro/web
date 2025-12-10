"use client";

import { UserPlus, Check, X, Clock } from "lucide-react";
import Link from "next/link";
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
import { Badge } from "@/src/components/ui/badge";

interface PlayerRequest {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  position: string;
  level: "iniciante" | "intermediário" | "avançado";
  requestedAt: string;
}

interface PendingRequestsCardProps {
  requests: PlayerRequest[];
  onAccept?: (playerId: string) => void;
  onReject?: (playerId: string) => void;
}

const levelColors = {
  iniciante: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediário: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  avançado: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function PendingRequestsCard({
  requests,
  onAccept,
  onReject,
}: PendingRequestsCardProps) {
  if (requests.length === 0) {
    return (
      <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <UserPlus className="h-10 w-10 text-white/20" />
          <p className="text-sm text-white/50">Nenhuma solicitação pendente</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-(--varzea-blue-light)" />
            Solicitações
          </span>
          <Badge className="bg-(--varzea-blue)/30 text-(--varzea-blue-light) border-0">
            {requests.length} pendente{requests.length > 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {requests.map((request) => (
          <div key={request.id} className="rounded-lg bg-white/5 p-3">
            {/* Player Info */}
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-white/20">
                <AvatarImage src={request.avatar} alt={request.name} />
                <AvatarFallback className="bg-white/10 text-sm font-medium">
                  {request.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/jogadores/${request.id}`}
                  className="hover:underline decoration-white/50"
                >
                  <p className="font-medium truncate">{request.name}</p>
                </Link>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge
                    className={`text-[10px] border ${
                      levelColors[request.level]
                    }`}
                  >
                    {request.level}
                  </Badge>
                  <span className="text-xs text-white/50">
                    {request.position}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-white/40">
                <Clock className="h-3 w-3" />
                {request.requestedAt}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={() => onReject?.(request.id)}
                variant="outline"
                size="sm"
                className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <X className="h-4 w-4 mr-1" />
                Recusar
              </Button>
              <Button
                onClick={() => onAccept?.(request.id)}
                size="sm"
                className="flex-1 bg-(--varzea-green) hover:bg-(--varzea-green)/90"
              >
                <Check className="h-4 w-4 mr-1" />
                Aceitar
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export type { PlayerRequest };
