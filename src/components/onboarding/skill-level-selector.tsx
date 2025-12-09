"use client";

import { cn } from "@/src/lib/utils";
import { Star, Trophy, Flame, Zap, Crown } from "lucide-react";

interface SkillLevel {
  level: 1 | 2 | 3 | 4 | 5;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const skillLevels: SkillLevel[] = [
  {
    level: 1,
    name: "Iniciante",
    description: "Estou começando a jogar",
    icon: <Star className="h-6 w-6" />,
  },
  {
    level: 2,
    name: "Amador",
    description: "Jogo ocasionalmente com amigos",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    level: 3,
    name: "Intermediário",
    description: "Jogo regularmente, tenho boa técnica",
    icon: <Flame className="h-6 w-6" />,
  },
  {
    level: 4,
    name: "Avançado",
    description: "Jogo em campeonatos amadores",
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    level: 5,
    name: "Profissional",
    description: "Já joguei ou jogo profissionalmente",
    icon: <Crown className="h-6 w-6" />,
  },
];

interface SkillLevelSelectorProps {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (level: 1 | 2 | 3 | 4 | 5) => void;
  accentColor?: "blue" | "emerald";
  label?: string;
}

export function SkillLevelSelector({
  value,
  onChange,
  accentColor = "blue",
  label = "Qual seu nível?",
}: SkillLevelSelectorProps) {
  const colorClasses = {
    blue: {
      selected: "border-blue-500 bg-blue-500/10",
      text: "text-blue-400",
      bar: "bg-gradient-to-r from-blue-600 to-cyan-500",
      glow: "shadow-blue-500/30",
    },
    emerald: {
      selected: "border-emerald-500 bg-emerald-500/10",
      text: "text-emerald-400",
      bar: "bg-gradient-to-r from-emerald-600 to-lime-500",
      glow: "shadow-emerald-500/30",
    },
  };

  const colors = colorClasses[accentColor];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <p className="text-sm text-slate-400 mt-1">
          Seja honesto para encontrar partidas equilibradas
        </p>
      </div>

      {/* Level bars visualization */}
      <div className="flex items-end justify-center gap-1.5 h-20 mb-2">
        {[1, 2, 3, 4, 5].map((level) => {
          const isActive = value !== null && level <= value;
          const height = 20 + level * 15; // 35, 50, 65, 80, 95

          return (
            <div
              key={level}
              className={cn(
                "w-8 rounded-t-md transition-all duration-500 ease-out",
                isActive && colors.bar,
                isActive && `shadow-lg ${colors.glow}`,
                !isActive && "bg-slate-700/50"
              )}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>

      {/* Options */}
      <div className="w-full space-y-3">
        {skillLevels.map((skill) => {
          const isSelected = value === skill.level;

          return (
            <button
              key={skill.level}
              type="button"
              onClick={() => onChange(skill.level)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl",
                "border-2 transition-all duration-300 ease-out",
                "text-left",
                isSelected && colors.selected,
                isSelected && `shadow-lg ${colors.glow}`,
                !isSelected &&
                  "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "shrink-0 p-2 rounded-lg transition-colors duration-300",
                  isSelected ? colors.text : "text-slate-500",
                  isSelected ? `bg-${accentColor}-500/20` : "bg-slate-700/50"
                )}
              >
                {skill.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-semibold transition-colors duration-300",
                      isSelected ? "text-white" : "text-slate-300"
                    )}
                  >
                    {skill.name}
                  </span>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(skill.level)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3 transition-colors duration-300",
                          isSelected
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-600"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-400 truncate">
                  {skill.description}
                </p>
              </div>

              {/* Selection indicator */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-300",
                  "flex items-center justify-center shrink-0",
                  isSelected && "border-white bg-white",
                  !isSelected && "border-slate-600"
                )}
              >
                {isSelected && (
                  <div className={cn("w-2 h-2 rounded-full", colors.bar)} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
