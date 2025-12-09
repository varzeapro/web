"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/onboarding-store";
import { OnboardingStepper } from "@/src/components/onboarding/onboarding-stepper";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { MapPin, Building2 } from "lucide-react";

export default function TeamLocationPage() {
  const router = useRouter();
  const { role, setCurrentStep, teamData, updateTeamData, nextStep, prevStep } =
    useOnboardingStore();

  // Ensure correct step
  useEffect(() => {
    if (role !== "TEAM") {
      router.push("/welcome");
      return;
    }
    setCurrentStep(2);
  }, [role, router, setCurrentStep]);

  const handleNext = () => {
    nextStep();
    router.push("/setup/team/steps/schedule");
  };

  const handleBack = () => {
    prevStep();
    router.push("/setup/team/steps/badge");
  };

  const canProceed =
    teamData.city.trim() !== "" &&
    teamData.state.trim() !== "" &&
    teamData.modality !== null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Onde vocês jogam? 📍
          </h1>
          <p className="text-slate-400">
            Jogadores próximos vão encontrar seu time.
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
          {/* Modality */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Building2 className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Modalidade</h3>
            </div>

            <Select
              value={teamData.modality || ""}
              onValueChange={(value) =>
                updateTeamData({
                  modality: value as "Futsal" | "Campo" | "Society",
                })
              }
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white h-12">
                <SelectValue placeholder="Selecione a modalidade" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="Futsal">⚽ Futsal</SelectItem>
                <SelectItem value="Society">🏟️ Society (7x7)</SelectItem>
                <SelectItem value="Campo">🏟️ Campo (11x11)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <MapPin className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Localização</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="city" className="text-slate-300">
                  Cidade
                </Label>
                <Input
                  id="city"
                  placeholder="São Paulo"
                  value={teamData.city}
                  onChange={(e) => updateTeamData({ city: e.target.value })}
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
                  value={teamData.state}
                  onChange={(e) =>
                    updateTeamData({ state: e.target.value.toUpperCase() })
                  }
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 uppercase"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldLocation" className="text-slate-300">
                Local do campo (opcional)
              </Label>
              <Input
                id="fieldLocation"
                placeholder="Ex: Arena Society do Bairro"
                value={teamData.fieldLocation}
                onChange={(e) =>
                  updateTeamData({ fieldLocation: e.target.value })
                }
                className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
