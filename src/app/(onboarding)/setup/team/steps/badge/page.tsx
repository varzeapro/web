"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { PhotoUpload } from "@/src/components/onboarding/photo-upload";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

export default function TeamBadgePage() {
  const router = useRouter();
  const { role, setCurrentStep, teamData, updateTeamData, nextStep } =
    useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "TEAM") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(1);
  }, [role, router, setCurrentStep]);

  const handleBadgeChange = (file: File | null, preview: string | null) => {
    updateTeamData({ badge: file, badgePreview: preview });
  };

  const handleNext = () => {
    nextStep();
    router.push("/setup/team/steps/location");
  };

  const canProceed =
    teamData.name.trim() !== "" && teamData.badgePreview !== null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crie seu time! 🛡️
          </h1>
          <p className="text-slate-400">
            Comece dando um nome e adicionando o escudo.
          </p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleNext}
          isNextDisabled={!canProceed}
          nextLabel={canProceed ? "Próximo" : "Complete os campos"}
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 space-y-6 animate-slide-up">
          {/* Team name */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-slate-300">
                Nome do Time
              </Label>
              <Input
                id="teamName"
                placeholder="Ex: Várzea FC"
                value={teamData.name}
                onChange={(e) => updateTeamData({ name: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 text-lg h-12"
              />
            </div>
          </div>

          {/* Badge upload */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <PhotoUpload
              value={teamData.badgePreview}
              onChange={handleBadgeChange}
              label="Escudo do Time"
              description="Adicione o escudo ou logo do seu time"
              shape="square"
              accentColor="emerald"
            />
          </div>
        </div>

        {/* Tip */}
        <p className="text-center text-sm text-slate-500 mt-6">
          💡 Dica: Se não tiver um escudo, pode usar uma foto do time!
        </p>
      </div>
    </div>
  );
}
