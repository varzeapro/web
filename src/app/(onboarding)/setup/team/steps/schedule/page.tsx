"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { GameDaysSelector } from "@/src/components/onboarding/game-days-selector";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Clock } from "lucide-react";

export default function TeamSchedulePage() {
  const router = useRouter();
  const { role, setCurrentStep, teamData, updateTeamData, nextStep, prevStep } =
    useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "TEAM") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(3);
  }, [role, router, setCurrentStep]);

  const handleNext = () => {
    nextStep();
    router.push("/setup/team/steps/level");
  };

  const handleBack = () => {
    prevStep();
    router.push("/setup/team/steps/location");
  };

  const canProceed = teamData.gameDays.length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Quando vocês jogam? 📅
          </h1>
          <p className="text-slate-400">
            Jogadores vão filtrar por disponibilidade.
          </p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={!canProceed}
          nextLabel={canProceed ? "Próximo" : "Selecione os dias"}
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 space-y-6 animate-slide-up">
          {/* Game days */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <GameDaysSelector
              value={teamData.gameDays}
              onChange={(days) => updateTeamData({ gameDays: days })}
              accentColor="emerald"
            />
          </div>

          {/* Game time */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Horário habitual (opcional)
              </h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gameTime" className="text-slate-300">
                Ex: 20h, 21h30, etc.
              </Label>
              <Input
                id="gameTime"
                placeholder="20h00"
                value={teamData.gameTime}
                onChange={(e) => updateTeamData({ gameTime: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
