"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { PhotoUpload } from "@/src/components/onboarding/photo-upload";

export default function PlayerPhotoPage() {
  const router = useRouter();
  const { role, setCurrentStep, playerData, updatePlayerData, nextStep } =
    useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "PLAYER") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(1);
  }, [role, router, setCurrentStep]);

  const handlePhotoChange = (file: File | null, preview: string | null) => {
    updatePlayerData({ photo: file, photoPreview: preview });
  };

  const handleNext = () => {
    nextStep();
    router.push("/setup/player/steps/position");
  };

  const canProceed = playerData.photoPreview !== null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Vamos montar seu card! 🎴
          </h1>
          <p className="text-slate-400">
            Comece adicionando uma foto para seu perfil de jogador.
          </p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleNext}
          isNextDisabled={!canProceed}
          nextLabel={canProceed ? "Próximo" : "Adicione uma foto"}
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 animate-slide-up">
          <PhotoUpload
            value={playerData.photoPreview}
            onChange={handlePhotoChange}
            label="Sua Foto"
            description="Essa será a foto do seu card de jogador"
            shape="circle"
            accentColor="blue"
          />
        </div>

        {/* Tip */}
        <p className="text-center text-sm text-slate-500 mt-6">
          💡 Dica: Use uma foto nítida, de preferência jogando futebol!
        </p>
      </div>
    </div>
  );
}
