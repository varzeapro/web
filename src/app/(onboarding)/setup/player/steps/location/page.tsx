"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { RadiusSelector } from "@/src/components/onboarding/radius-selector";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function PlayerLocationPage() {
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
    setCurrentStep(3);
  }, [role, router, setCurrentStep]);

  const handleNext = () => {
    nextStep();
    router.push("/setup/player/steps/skill");
  };

  const handleBack = () => {
    prevStep();
    router.push("/setup/player/steps/position");
  };

  const canProceed =
    playerData.city.trim() !== "" && playerData.state.trim() !== "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Onde você joga? 📍
          </h1>
          <p className="text-slate-400">
            Encontraremos times próximos de você.
          </p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={!canProceed}
          nextLabel="Próximo"
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 space-y-6 animate-slide-up">
          {/* Location inputs */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              Sua Localização
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="city" className="text-slate-300">
                  Cidade
                </Label>
                <Input
                  id="city"
                  placeholder="São Paulo"
                  value={playerData.city}
                  onChange={(e) => updatePlayerData({ city: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-slate-300">
                  UF
                </Label>
                <Input
                  id="state"
                  placeholder="SP"
                  maxLength={2}
                  value={playerData.state}
                  onChange={(e) =>
                    updatePlayerData({ state: e.target.value.toUpperCase() })
                  }
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Radius selector */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <RadiusSelector
              value={playerData.radius}
              onChange={(radius) => updatePlayerData({ radius })}
              min={1}
              max={50}
              accentColor="blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
