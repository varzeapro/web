"use client";

import { Slider } from "@/src/components/ui/slider";
import { cn } from "@/src/lib/utils";
import { MapPin, Navigation } from "lucide-react";

interface RadiusSelectorProps {
  value: number;
  onChange: (radius: number) => void;
  min?: number;
  max?: number;
  step?: number;
  accentColor?: "blue" | "emerald";
}

export function RadiusSelector({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 1,
  accentColor = "blue",
}: RadiusSelectorProps) {
  const colorClasses = {
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-500/10",
      ring: "ring-blue-500/30",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      ring: "ring-emerald-500/30",
    },
  };

  const colors = colorClasses[accentColor];

  // Calcular o tamanho do círculo visual (proporcional ao valor)
  const circleSize = 80 + (value / max) * 120; // Min 80px, max 200px

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">Raio de Atuação</h3>
        <p className="text-sm text-slate-400 mt-1">
          Qual distância você topa ir jogar?
        </p>
      </div>

      {/* Visual representation */}
      <div className="relative w-56 h-56 flex items-center justify-center">
        {/* Animated circles */}
        <div
          className={cn(
            "absolute rounded-full transition-all duration-500 ease-out",
            "border-2 border-dashed opacity-30",
            accentColor === "blue" ? "border-blue-500" : "border-emerald-500"
          )}
          style={{
            width: `${circleSize + 40}px`,
            height: `${circleSize + 40}px`,
          }}
        />
        <div
          className={cn(
            "absolute rounded-full transition-all duration-500 ease-out",
            "border-2 opacity-50",
            accentColor === "blue" ? "border-blue-500" : "border-emerald-500"
          )}
          style={{
            width: `${circleSize + 20}px`,
            height: `${circleSize + 20}px`,
          }}
        />
        <div
          className={cn(
            "absolute rounded-full transition-all duration-500 ease-out",
            accentColor === "blue"
              ? "bg-linear-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500"
              : "bg-linear-to-br from-emerald-500/20 to-lime-500/20 border-2 border-emerald-500"
          )}
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
          }}
        />

        {/* Center pin */}
        <div
          className={cn(
            "relative z-10 flex flex-col items-center justify-center",
            "w-16 h-16 rounded-full bg-slate-800 border-2",
            accentColor === "blue" ? "border-blue-500" : "border-emerald-500"
          )}
        >
          <MapPin className={cn("h-6 w-6", colors.text)} />
        </div>

        {/* Distance label */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4",
            "px-4 py-2 rounded-full bg-slate-800 border",
            accentColor === "blue"
              ? "border-blue-500/50"
              : "border-emerald-500/50"
          )}
        >
          <span className={cn("text-2xl font-bold", colors.text)}>{value}</span>
          <span className="text-sm text-slate-400 ml-1">km</span>
        </div>
      </div>

      {/* Slider */}
      <div className="w-full px-4 mt-4">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(values) => onChange(values[0])}
          className={cn(
            accentColor === "blue"
              ? "**:[[role=slider]]:bg-blue-500 **:[[role=slider]]:border-blue-400"
              : "**:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400"
          )}
        />

        {/* Min/Max labels */}
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>{min} km</span>
          <span>{max} km</span>
        </div>
      </div>

      {/* Description */}
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg",
          colors.bg
        )}
      >
        <Navigation className={cn("h-4 w-4", colors.text)} />
        <span className="text-sm text-slate-300">
          {value <= 5
            ? "Só bem pertinho de casa"
            : value <= 15
            ? "Na minha região"
            : value <= 30
            ? "Posso me deslocar um pouco"
            : "Vou onde tiver pelada!"}
        </span>
      </div>
    </div>
  );
}
