"use client";

import { MapPin, Target, Calendar, Clock, Radar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface ProfileInfoProps {
  info: {
    position: string;
    location: string;
    playDays: string[];
    playTime: string;
    searchRadius: string;
  };
  onEdit?: () => void;
}

export function ProfileInfo({ info }: ProfileInfoProps) {
  const infoItems = [
    { icon: Target, label: "Posição", value: info.position },
    { icon: MapPin, label: "Localização", value: info.location },
    {
      icon: Calendar,
      label: "Dias disponíveis",
      value: info.playDays.join(", "),
    },
    { icon: Clock, label: "Horário", value: info.playTime },
    { icon: Radar, label: "Raio de busca", value: info.searchRadius },
  ];

  return (
    <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <span>📋</span> Informações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3"
          >
            <item.icon className="h-5 w-5 shrink-0 text-(--varzea-gold)" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/50">{item.label}</p>
              <p className="text-sm font-medium truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
