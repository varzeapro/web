"use client";

import { useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  X,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

interface CreateMatchData {
  opponentName: string;
  date: string;
  time: string;
  location: string;
  paymentPerPlayer: number;
  requiredPlayers: number;
}

interface CreateMatchSheetProps {
  onCreateMatch?: (data: CreateMatchData) => void;
}

export function CreateMatchSheet({ onCreateMatch }: CreateMatchSheetProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CreateMatchData>({
    opponentName: "",
    date: "",
    time: "",
    location: "",
    paymentPerPlayer: 50,
    requiredPlayers: 11,
  });

  const handleSubmit = () => {
    if (
      !formData.opponentName ||
      !formData.date ||
      !formData.time ||
      !formData.location
    ) {
      return;
    }
    onCreateMatch?.(formData);
    setOpen(false);
    setFormData({
      opponentName: "",
      date: "",
      time: "",
      location: "",
      paymentPerPlayer: 50,
      requiredPlayers: 11,
    });
  };

  const updateField = (
    field: keyof CreateMatchData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-(--varzea-green) hover:bg-(--varzea-green)/90">
          <Plus className="h-4 w-4 mr-1" />
          Nova Partida
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-[#1a1a2e] mx-auto max-w-7xl pb-10 px-10 border-white/10 text-white rounded-t-3xl max-h-[90vh] overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white text-xl">
            Criar Nova Partida
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          {/* Opponent Name */}
          <div className="space-y-2">
            <Label className="text-white/70 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Adversário
            </Label>
            <Input
              value={formData.opponentName}
              onChange={(e) => updateField("opponentName", e.target.value)}
              placeholder="Nome do time adversário"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white/70 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/70 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horário
              </Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => updateField("time", e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-white/70 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Local
            </Label>
            <Input
              value={formData.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Quadra, campo, endereço..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
          </div>

          {/* Payment & Players */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-white/70 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Valor/Jogador
              </Label>
              <Input
                type="number"
                value={formData.paymentPerPlayer}
                onChange={(e) =>
                  updateField("paymentPerPlayer", parseInt(e.target.value) || 0)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/70 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Jogadores
              </Label>
              <Input
                type="number"
                value={formData.requiredPlayers}
                onChange={(e) =>
                  updateField("requiredPlayers", parseInt(e.target.value) || 11)
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            className="w-full py-6 bg-(--varzea-green) hover:bg-(--varzea-green)/90 text-white font-semibold"
          >
            Criar Partida
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export type { CreateMatchData };
