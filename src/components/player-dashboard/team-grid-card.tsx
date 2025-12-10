"use client";

import { MapPin, Users, Heart } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface TeamGridData {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  lookingFor: string;
  level: "iniciante" | "intermediário" | "avançado";
  location: string;
  distance: string;
  playDays: string[];
}

interface TeamGridCardProps {
  team: TeamGridData;
  onInterest?: (teamId: string) => void;
}

const levelColors = {
  iniciante: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediário: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  avançado: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function TeamGridCard({ team, onInterest }: TeamGridCardProps) {
  return (
    <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#16162a] text-white overflow-hidden group hover:scale-[1.02] transition-transform">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-(--varzea-green)/30">
            <AvatarImage src={team.avatar} alt={team.name} />
            <AvatarFallback className="bg-(--varzea-green-dark) text-sm font-bold text-white">
              {team.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate">{team.name}</h3>
            <div className="flex items-center gap-1 text-white/50 text-xs mt-0.5">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{team.distance}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <Badge className={cn("text-[10px] border", levelColors[team.level])}>
            {team.level}
          </Badge>
          <Badge className="text-[10px] bg-(--varzea-blue)/20 text-(--varzea-blue-light) border-(--varzea-blue)/30">
            {team.lookingFor}
          </Badge>
        </div>

        {/* Days */}
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-3.5 w-3.5 text-white/40" />
          <div className="flex gap-1">
            {team.playDays.slice(0, 3).map((day) => (
              <span
                key={day}
                className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium"
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <Button
          onClick={() => onInterest?.(team.id)}
          size="sm"
          className="w-full bg-(--varzea-green) hover:bg-(--varzea-green)/90 text-white gap-1.5"
        >
          <Heart className="h-3.5 w-3.5" fill="currentColor" />
          Quero Jogar
        </Button>
      </CardContent>
    </Card>
  );
}

export type { TeamGridData };
