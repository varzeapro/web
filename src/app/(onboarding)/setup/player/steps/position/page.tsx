"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { PositionSelector } from "@/src/components/onboarding/position-selector";

export default function PlayerPositionPage() {
  const router = useRouter();
  const {
    role,
    setCurrentStep,
    playerData,
    updatePlayerData,
    nextStep,
    prevStep,
  } = useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "PLAYER") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(2);
  }, [role, router, setCurrentStep]);

  const handlePositionChange = (positions: string[]) => {
    updatePlayerData({ positions });
  };

  const handleNext = () => {
    nextStep();
    router.push("/setup/player/steps/location");
  };

  const handleBack = () => {
    prevStep();
    router.push("/setup/player/steps/photo");
  };

  const canProceed = playerData.positions.length > 0;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Qual sua posição? ⚽
          </h1>
          <p className="text-slate-400">
            Times vão buscar jogadores pela posição que precisam.
          </p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={!canProceed}
          nextLabel={canProceed ? "Próximo" : "Selecione uma posição"}
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 animate-slide-up">
          <PositionSelector
            value={playerData.positions}
            onChange={handlePositionChange}
            maxSelections={2}
            accentColor="blue"
          />
        </div>
      </div>
    </div>
  );
}
