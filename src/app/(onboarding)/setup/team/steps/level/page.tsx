"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { SkillLevelSelector } from "@/src/components/onboarding/skill-level-selector";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { createTeamProfile } from "@/src/app/actions/team";
import { toast } from "sonner";
import { User } from "lucide-react";

export default function TeamLevelPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { role, setCurrentStep, teamData, updateTeamData, prevStep, reset } =
    useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "TEAM") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(4);
  }, [role, router, setCurrentStep]);

  const handleSubmit = async () => {
    if (!teamData.teamLevel || !teamData.responsibleName.trim()) return;

    setIsSubmitting(true);
    try {
      await createTeamProfile({
        nomeTime: teamData.name,
        modalidade: teamData.modality || "Society",
        cidade: teamData.city,
        estado: teamData.state,
        nomeResponsavel: teamData.responsibleName,
        // TODO: Upload de escudo para S3
        // TODO: Adicionar campos adicionais ao schema
      });

      toast.success("Time criado com sucesso! 🏆");
      reset();
      router.push("/team/dashboard");
    } catch (error) {
      console.error("Erro ao criar time:", error);
      toast.error("Erro ao criar time. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    prevStep();
    router.push("/setup/team/steps/schedule");
  };

  const canProceed =
    teamData.teamLevel !== null && teamData.responsibleName.trim() !== "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Finalizando! 🏆
          </h1>
          <p className="text-slate-400">Últimas informações sobre o time.</p>
        </div>

        {/* Stepper */}
        <OnboardingStepper
          onNext={handleSubmit}
          onBack={handleBack}
          isNextDisabled={!canProceed}
          isLoading={isSubmitting}
          nextLabel={isSubmitting ? "Criando Time..." : "Criar Time"}
          showButtons={true}
        />

        {/* Content */}
        <div className="mt-8 space-y-6 animate-slide-up">
          {/* Responsible person */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <User className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Responsável</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibleName" className="text-slate-300">
                Nome do responsável pelo time
              </Label>
              <Input
                id="responsibleName"
                placeholder="Seu nome"
                value={teamData.responsibleName}
                onChange={(e) =>
                  updateTeamData({ responsibleName: e.target.value })
                }
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Team level */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <SkillLevelSelector
              value={teamData.teamLevel}
              onChange={(level) => updateTeamData({ teamLevel: level })}
              accentColor="emerald"
              label="Nível do Time"
            />
          </div>
        </div>

        {/* Encouragement */}
        <p className="text-center text-sm text-slate-500 mt-6">
          ⚽ Pronto para encontrar os melhores jogadores da região!
        </p>
      </div>
    </div>
  );
}
