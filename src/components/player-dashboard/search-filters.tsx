"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

interface SearchFiltersData {
  positions: string[];
  levels: string[];
  maxDistance: number;
  days: string[];
}

interface SearchFiltersProps {
  filters: SearchFiltersData;
  onFiltersChange: (filters: SearchFiltersData) => void;
}

const positionOptions = [
  "Goleiro",
  "Zagueiro",
  "Lateral",
  "Volante",
  "Meia",
  "Atacante",
];
const levelOptions = ["Iniciante", "Intermediário", "Avançado"];
const dayOptions = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const distanceOptions = [5, 10, 15, 25, 50];

export function SearchFilters({
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [open, setOpen] = useState(false);

  const activeFiltersCount =
    filters.positions.length +
    filters.levels.length +
    filters.days.length +
    (filters.maxDistance !== 10 ? 1 : 0);

  const toggleArrayFilter = (
    key: "positions" | "levels" | "days",
    value: string
  ) => {
    const current = localFilters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setLocalFilters({ ...localFilters, [key]: updated });
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    setOpen(false);
  };

  const handleClear = () => {
    const cleared: SearchFiltersData = {
      positions: [],
      levels: [],
      maxDistance: 10,
      days: [],
    };
    setLocalFilters(cleared);
    onFiltersChange(cleared);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-(--varzea-green) text-white border-0">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-[#1a1a2e] border-white/10 text-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white flex items-center justify-between">
            <span>Filtros de Busca</span>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Positions */}
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-3">Posição</h4>
            <div className="flex flex-wrap gap-2">
              {positionOptions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => toggleArrayFilter("positions", pos)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    localFilters.positions.includes(pos)
                      ? "bg-(--varzea-green) text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Levels */}
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-3">
              Nível do Time
            </h4>
            <div className="flex flex-wrap gap-2">
              {levelOptions.map((level) => (
                <button
                  key={level}
                  onClick={() => toggleArrayFilter("levels", level)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    localFilters.levels.includes(level)
                      ? "bg-(--varzea-green) text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-3">
              Distância Máxima
            </h4>
            <div className="flex gap-2">
              {distanceOptions.map((dist) => (
                <button
                  key={dist}
                  onClick={() =>
                    setLocalFilters({ ...localFilters, maxDistance: dist })
                  }
                  className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                    localFilters.maxDistance === dist
                      ? "bg-(--varzea-green) text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {dist} km
                </button>
              ))}
            </div>
          </div>

          {/* Days */}
          <div>
            <h4 className="text-sm font-medium text-white/70 mb-3">
              Dias da Semana
            </h4>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleArrayFilter("days", day)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    localFilters.days.includes(day)
                      ? "bg-(--varzea-green) text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={handleApply}
          className="w-full mt-8 bg-(--varzea-green) hover:bg-(--varzea-green)/90 text-white font-semibold py-6"
        >
          Aplicar Filtros
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export type { SearchFiltersData };
