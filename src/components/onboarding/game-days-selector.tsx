"use client";

import { cn } from "@/src/lib/utils";
import { Calendar } from "lucide-react";

interface GameDay {
  id: string;
  name: string;
  shortName: string;
}

const gameDays: GameDay[] = [
  { id: "segunda", name: "Segunda", shortName: "SEG" },
  { id: "terca", name: "Terça", shortName: "TER" },
  { id: "quarta", name: "Quarta", shortName: "QUA" },
  { id: "quinta", name: "Quinta", shortName: "QUI" },
  { id: "sexta", name: "Sexta", shortName: "SEX" },
  { id: "sabado", name: "Sábado", shortName: "SÁB" },
  { id: "domingo", name: "Domingo", shortName: "DOM" },
];

interface GameDaysSelectorProps {
  value: string[];
  onChange: (days: string[]) => void;
  accentColor?: "blue" | "emerald";
}

export function GameDaysSelector({
  value,
  onChange,
  accentColor = "emerald",
}: GameDaysSelectorProps) {
  const handleDayClick = (dayId: string) => {
    if (value.includes(dayId)) {
      onChange(value.filter((id) => id !== dayId));
    } else {
      onChange([...value, dayId]);
    }
  };

  const colorClasses = {
    blue: {
      selected:
        "bg-gradient-to-br from-blue-600 to-cyan-600 text-white border-transparent shadow-lg shadow-blue-500/30",
      hover: "hover:border-blue-500 hover:bg-blue-500/10",
    },
    emerald: {
      selected:
        "bg-gradient-to-br from-emerald-600 to-lime-600 text-white border-transparent shadow-lg shadow-emerald-500/30",
      hover: "hover:border-emerald-500 hover:bg-emerald-500/10",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Dias de Jogo</h3>
        <p className="text-sm text-slate-400 mt-1">
          Quando seu time costuma jogar?
        </p>
      </div>

      {/* Calendar icon */}
      <div
        className={cn(
          "p-4 rounded-full",
          accentColor === "blue" ? "bg-blue-500/10" : "bg-emerald-500/10"
        )}
      >
        <Calendar
          className={cn(
            "h-8 w-8",
            accentColor === "blue" ? "text-blue-400" : "text-emerald-400"
          )}
        />
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2 w-full">
        {gameDays.map((day) => {
          const isSelected = value.includes(day.id);
          const isWeekend = day.id === "sabado" || day.id === "domingo";

          return (
            <button
              key={day.id}
              type="button"
              onClick={() => handleDayClick(day.id)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-xl",
                "border-2 transition-all duration-300 ease-out",
                "min-h-[80px]",
                isSelected && colors.selected,
                isSelected && "scale-105",
                !isSelected && "border-slate-700 bg-slate-800/30",
                !isSelected && colors.hover,
                isWeekend && !isSelected && "bg-slate-800/50"
              )}
            >
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isSelected ? "text-white/80" : "text-slate-500"
                )}
              >
                {day.shortName}
              </span>
              <span
                className={cn(
                  "text-lg font-bold mt-1 transition-colors duration-300",
                  isSelected ? "text-white" : "text-slate-300"
                )}
              >
                {day.name.charAt(0)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected summary */}
      <div className="w-full">
        {value.length === 0 ? (
          <p className="text-center text-sm text-slate-500">
            Selecione os dias que seu time joga
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            {value.map((dayId) => {
              const day = gameDays.find((d) => d.id === dayId);
              return (
                <span
                  key={dayId}
                  className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium animate-scale-in",
                    accentColor === "blue"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  )}
                >
                  {day?.name}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
