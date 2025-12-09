"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { SkillLevelSelector } from "@/src/components/onboarding/skill-level-selector";
import { updatePlayerProfile } from "@/src/app/actions/player";
import { toast } from "sonner";

export default function PlayerSkillPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    role,
    setCurrentStep,
    playerData,
    updatePlayerData,
    prevStep,
    reset,
  } = useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "PLAYER") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(4);
  }, [role, router, setCurrentStep]);

  const handleSubmit = async () => {
    if (!playerData.skillLevel) return;

    setIsSubmitting(true);
    try {
      // Preparar dados para enviar
      await updatePlayerProfile({
        cidade: playerData.city,
        estado: playerData.state,
        posicoes: playerData.positions,
        radius: playerData.radius,
        skillLevel: playerData.skillLevel || undefined,
      });

      toast.success("Perfil criado com sucesso! 🎉");
      reset();
      router.push("/player/dashboard");
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
      toast.error("Erro ao criar perfil. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push("/setup/player/steps/location");
  };

  const canProceed = playerData.skillLevel !== null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Qual seu nível? 🏆
          </h1>
          <p className="text-slate-400">
            Isso ajuda a encontrar partidas equilibradas.
          </p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleSubmit}
          onBack={handleBack}
          isNextDisabled={!canProceed}
          isLoading={isSubmitting}
          nextLabel={isSubmitting ? "Finalizando..." : "Concluir Cadastro"}
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 animate-slide-up">
          <SkillLevelSelector
            value={playerData.skillLevel}
            onChange={(level) => updatePlayerData({ skillLevel: level })}
            accentColor="blue"
          />
        </div>

        {/* Encouragement */}
        <p className="text-center text-sm text-slate-500 mt-6">
          🎯 Seja honesto! Isso garante partidas mais divertidas.
        </p>
      </div>
    </div>
  );
}
