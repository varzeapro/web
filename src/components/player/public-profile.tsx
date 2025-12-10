"use client";

import { MessageCircle, MapPin, Trophy, Calendar } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

interface PublicProfileProps {
  player: {
    id: string;
    name: string;
    age: number;
    position: string;
    location: string;
    bio: string;
    stats?: {
      games: number;
      goals: number;
      assists: number;
    };
    media?: string[]; // URLs for photos/videos
  };
  onContact: () => void;
}

export function PublicProfile({ player, onContact }: PublicProfileProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-[#131320] shadow-xl">
          <AvatarImage src={undefined} />
          <AvatarFallback className="bg-white/10 text-4xl font-bold text-white">
            {player.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{player.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2 text-white/60">
              <Badge variant="outline" className="border-white/20 text-white">
                {player.position}
              </Badge>
              <span className="flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3" /> {player.location}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Calendar className="h-3 w-3" /> {player.age} anos
              </span>
            </div>
          </div>

          <p className="text-white/80 max-w-xl">{player.bio}</p>

          <Button
            onClick={onContact}
            className="w-full md:w-auto bg-(--varzea-green) text-black hover:bg-(--varzea-green)/90 font-bold gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            Entrar em Contato
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {player.stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <h3 className="text-2xl font-bold text-white">
              {player.stats.games}
            </h3>
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Jogos
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <h3 className="text-2xl font-bold text-(--varzea-green)">
              {player.stats.goals}
            </h3>
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Gols
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
            <h3 className="text-2xl font-bold text-white">
              {player.stats.assists}
            </h3>
            <p className="text-xs text-white/50 uppercase tracking-wider">
              Assistências
            </p>
          </div>
        </div>
      )}

      {/* Media / Highlights */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-(--varzea-gold)" />
          Destaques
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-video bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-white/20"
            >
              Video/Foto Placeholder
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
