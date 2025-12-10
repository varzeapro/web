"use client";

import { useState } from "react";
import { MapPin, Users, Clock, X, Heart } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

interface TeamData {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  lookingFor: string;
  level: "iniciante" | "intermediário" | "avançado";
  location: string;
  distance: string;
  playDays: string[];
  playTime: string;
  paymentPerGame?: number; // 💰 Payment offered to players
}

interface TeamSwipeCardProps {
  team: TeamData;
  onLike?: (teamId: string) => void;
  onSkip?: (teamId: string) => void;
}

const levelColors = {
  iniciante: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediário: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  avançado: "bg-red-500/20 text-red-400 border-red-500/30",
};

const levelLabels = {
  iniciante: "Iniciante",
  intermediário: "Intermediário",
  avançado: "Avançado",
};

export function TeamSwipeCard({ team, onLike, onSkip }: TeamSwipeCardProps) {
  const [animationClass, setAnimationClass] = useState("");

  const handleLike = () => {
    setAnimationClass("animate-slide-out-right");
    setTimeout(() => {
      onLike?.(team.id);
      setAnimationClass("");
    }, 300);
  };

  const handleSkip = () => {
    setAnimationClass("animate-slide-out-left");
    setTimeout(() => {
      onSkip?.(team.id);
      setAnimationClass("");
    }, 300);
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 bg-linear-to-b from-[#1a1a2e] to-[#16162a] text-white shadow-2xl transition-transform duration-300",
        animationClass
      )}
    >
      <CardContent className="p-0">
        {/* Payment Badge - Prominent! */}
        {team.paymentPerGame && team.paymentPerGame > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-(--varzea-gold) text-black font-bold text-sm px-3 py-1 shadow-lg">
              💰 R$ {team.paymentPerGame}/jogo
            </Badge>
          </div>
        )}

        {/* Team Header */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="absolute inset-0 bg-linear-to-r from-(--varzea-blue)/20 to-(--varzea-green)/20" />

          <div className="relative flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-(--varzea-green)/50 shadow-lg">
              <AvatarImage src={team.avatar} alt={team.name} />
              <AvatarFallback className="bg-(--varzea-green-dark) text-2xl font-bold text-white">
                {team.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold">{team.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn("border", levelColors[team.level])}>
                  {levelLabels[team.level]}
                </Badge>
                <Badge className="bg-(--varzea-blue)/30 text-(--varzea-blue-light) border-(--varzea-blue)/30">
                  {team.lookingFor}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Team Details */}
        <div className="space-y-3 px-6 pb-4">
          <div className="flex items-center gap-3 text-white/70">
            <MapPin className="h-5 w-5 text-(--varzea-gold)" />
            <span className="text-sm">{team.location}</span>
            <span className="text-xs text-white/40">• {team.distance}</span>
          </div>

          <div className="flex items-center gap-3 text-white/70">
            <Users className="h-5 w-5 text-(--varzea-gold)" />
            <div className="flex flex-wrap gap-1">
              {team.playDays.map((day) => (
                <span
                  key={day}
                  className="rounded bg-white/10 px-2 py-0.5 text-xs font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/70">
            <Clock className="h-5 w-5 text-(--varzea-gold)" />
            <span className="text-sm">{team.playTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 border-t border-white/10 bg-black/20 px-6 py-5">
          <Button
            onClick={handleSkip}
            size="icon-lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-all duration-200 hover:scale-110"
          >
            <X className="h-8 w-8" />
          </Button>

          <Button
            onClick={handleLike}
            size="icon-lg"
            className="h-20 w-20 rounded-full bg-linear-to-br from-(--varzea-green) to-(--varzea-green-dark) text-white hover:from-(--varzea-green)/90 hover:to-(--varzea-green-dark)/90 shadow-lg shadow-(--varzea-green)/30 transition-all duration-200 hover:scale-110"
          >
            <Heart className="h-10 w-10" fill="currentColor" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
