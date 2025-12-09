"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";

interface Position {
  id: string;
  name: string;
  shortName: string;
  description: string;
  x: number; // percentual no campo
  y: number; // percentual no campo
}

// IDs devem corresponder ao banco de dados:
// 1 = Goleiro, 2 = Zagueiro, 3 = Lateral, 4 = Meio-Campo, 5 = Atacante
const positions: Position[] = [
  {
    id: "1",
    name: "Goleiro",
    shortName: "GOL",
    description: "Defende o gol",
    x: 50,
    y: 90,
  },
  {
    id: "2",
    name: "Zagueiro",
    shortName: "ZAG",
    description: "Defensor central",
    x: 35,
    y: 70,
  },
  {
    id: "2",
    name: "Zagueiro",
    shortName: "ZAG",
    description: "Defensor central",
    x: 65,
    y: 70,
  },
  {
    id: "3",
    name: "Lateral",
    shortName: "LAT",
    description: "Defensor pelas pontas",
    x: 10,
    y: 55,
  },
  {
    id: "3",
    name: "Lateral",
    shortName: "LAT",
    description: "Defensor pelas pontas",
    x: 90,
    y: 55,
  },
  {
    id: "4",
    name: "Meio-Campo",
    shortName: "MEI",
    description: "Armador de jogadas",
    x: 50,
    y: 45,
  },
  {
    id: "4",
    name: "Meio-Campo",
    shortName: "MEI",
    description: "Armador de jogadas",
    x: 30,
    y: 35,
  },
  {
    id: "4",
    name: "Meio-Campo",
    shortName: "MEI",
    description: "Armador de jogadas",
    x: 70,
    y: 35,
  },
  {
    id: "5",
    name: "Atacante",
    shortName: "ATA",
    description: "Finalizador",
    x: 25,
    y: 18,
  },
  {
    id: "5",
    name: "Atacante",
    shortName: "ATA",
    description: "Finalizador",
    x: 50,
    y: 12,
  },
  {
    id: "5",
    name: "Atacante",
    shortName: "ATA",
    description: "Finalizador",
    x: 75,
    y: 18,
  },
];

interface PositionSelectorProps {
  value: string[];
  onChange: (positions: string[]) => void;
  maxSelections?: number;
  accentColor?: "blue" | "emerald";
}

export function PositionSelector({
  value,
  onChange,
  maxSelections = 2,
  accentColor = "blue",
}: PositionSelectorProps) {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  const handlePositionClick = (positionId: string) => {
    if (value.includes(positionId)) {
      // Remover se já está selecionado
      onChange(value.filter((id) => id !== positionId));
    } else if (value.length < maxSelections) {
      // Adicionar se ainda há espaço
      onChange([...value, positionId]);
    }
  };

  const colorClasses = {
    blue: {
      selected: "bg-blue-500 text-white shadow-lg shadow-blue-500/50",
      hover: "hover:bg-blue-500/30 hover:border-blue-500",
      ring: "ring-blue-500",
    },
    emerald: {
      selected: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50",
      hover: "hover:bg-emerald-500/30 hover:border-emerald-500",
      ring: "ring-emerald-500",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Onde você joga?</h3>
        <p className="text-sm text-slate-400 mt-1">
          Selecione até {maxSelections} posições
        </p>
      </div>

      {/* Campo de futebol */}
      <div className="relative w-full max-w-sm aspect-3/4 bg-linear-to-b from-emerald-900/30 to-emerald-800/20 rounded-2xl border border-emerald-700/30 overflow-hidden">
        {/* Linhas do campo */}
        <div className="absolute inset-0">
          {/* Linha central */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
          {/* Círculo central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-white/20" />
          {/* Área grande superior */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-1/4 border-b border-l border-r border-white/20" />
          {/* Área grande inferior */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-1/4 border-t border-l border-r border-white/20" />
          {/* Pequena área superior */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[12%] border-b border-l border-r border-white/20" />
          {/* Pequena área inferior */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[12%] border-t border-l border-r border-white/20" />
        </div>

        {/* Posições */}
        {positions.map((position, index) => {
          const isSelected = value.includes(position.id);
          const isHovered = hoveredPosition === position.id;
          const selectionIndex = value.indexOf(position.id);

          return (
            <button
              key={`${position.id}-${index}`}
              type="button"
              className={cn(
                "absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full",
                "flex items-center justify-center text-xs font-bold",
                "border-2 transition-all duration-300 ease-out",
                isSelected && colors.selected,
                isSelected && "scale-110 z-10",
                !isSelected &&
                  "bg-slate-800/80 border-slate-600 text-slate-300",
                !isSelected && colors.hover,
                isHovered && !isSelected && "scale-110"
              )}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              onClick={() => handlePositionClick(position.id)}
              onMouseEnter={() => setHoveredPosition(position.id)}
              onMouseLeave={() => setHoveredPosition(null)}
            >
              {position.shortName}

              {/* Badge de ordem de seleção */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-slate-900 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {selectionIndex + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Posições selecionadas */}
      <div className="flex flex-wrap justify-center gap-2">
        {value.length === 0 ? (
          <p className="text-sm text-slate-500">
            Toque nas posições no campo acima
          </p>
        ) : (
          value.map((posId, index) => {
            const pos = positions.find((p) => p.id === posId);
            return (
              <div
                key={posId}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium",
                  "flex items-center gap-2 animate-scale-in",
                  accentColor === "blue"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                )}
              >
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                {pos?.name}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
