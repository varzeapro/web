"use client";

import { useOnboardingStore } from "@/src/store/onboarding-store";
import { cn } from "@/src/lib/utils";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface Step {
  number: number;
  title: string;
}

const playerSteps: Step[] = [
  { number: 1, title: "Foto" },
  { number: 2, title: "Posição" },
  { number: 3, title: "Local" },
  { number: 4, title: "Nível" },
];

const teamSteps: Step[] = [
  { number: 1, title: "Escudo" },
  { number: 2, title: "Local" },
  { number: 3, title: "Horários" },
  { number: 4, title: "Nível" },
];

interface OnboardingStepperProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  showButtons?: boolean;
}

export function OnboardingStepper({
  onBack,
  onNext,
  nextLabel = "Próximo",
  backLabel = "Voltar",
  isNextDisabled = false,
  isLoading = false,
  showButtons = true,
}: OnboardingStepperProps) {
  const { role, currentStep, getProgress } = useOnboardingStore();
  const steps = role === "PLAYER" ? playerSteps : teamSteps;
  const progress = getProgress();

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out",
            role === "PLAYER"
              ? "bg-linear-to-r from-blue-500 to-cyan-500"
              : "bg-linear-to-r from-emerald-500 to-lime-500"
          )}
          style={{ width: `${progress}%` }}
        />
        {/* Glow effect */}
        <div
          className={cn(
            "absolute inset-y-0 rounded-full blur-sm transition-all duration-700 ease-out",
            role === "PLAYER" ? "bg-blue-400/50" : "bg-emerald-400/50"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps indicators */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div
              key={step.number}
              className={cn(
                "flex flex-col items-center gap-2 transition-all duration-300",
                isCurrent && "scale-110"
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500",
                  // Completed states
                  isCompleted &&
                    role === "PLAYER" &&
                    "border-blue-500 bg-blue-500 text-white shadow-lg shadow-blue-500/30",
                  isCompleted &&
                    role === "TEAM" &&
                    "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
                  // Current states
                  isCurrent &&
                    role === "PLAYER" &&
                    "border-blue-500 bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20",
                  isCurrent &&
                    role === "TEAM" &&
                    "border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20",
                  // Inactive states
                  !isCompleted &&
                    !isCurrent &&
                    "border-slate-700 bg-slate-800/50 text-slate-500"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 animate-scale-in" />
                ) : (
                  <span className="text-sm font-semibold">{step.number}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isCurrent && "text-white",
                  isCompleted && "text-slate-300",
                  !isCompleted && !isCurrent && "text-slate-500"
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      {showButtons && (
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={currentStep === 1 || isLoading}
            className={cn(
              "flex-1 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-white",
              "transition-all duration-300",
              currentStep === 1 && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {backLabel}
          </Button>

          <Button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled || isLoading}
            className={cn(
              "flex-1 transition-all duration-300",
              role === "PLAYER"
                ? "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                : "bg-linear-to-r from-emerald-600 to-lime-600 hover:from-emerald-500 hover:to-lime-500",
              "text-white font-semibold shadow-lg",
              role === "PLAYER"
                ? "shadow-blue-500/25 hover:shadow-blue-500/40"
                : "shadow-emerald-500/25 hover:shadow-emerald-500/40"
            )}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Processando...</span>
              </div>
            ) : (
              <>
                {nextLabel}
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
