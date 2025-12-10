"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { setUserRole } from "@/src/app/actions/onboarding";
import { useOnboardingStore } from "@/src/store/onboarding-store";

interface RoleCardProps {
  role: "PLAYER" | "TEAM";
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  isLoading: boolean;
  onSelect: () => void;
}

function RoleCard({
  role,
  title,
  description,
  features,
  icon,
  gradient,
  glowColor,
  isLoading,
  onSelect,
}: RoleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLoading}
      className={cn(
        // Base styles
        "group cursor-pointer relative w-full overflow-hidden rounded-3xl p-1 transition-all duration-500 ease-out",
        // Transform on hover
        isHovered && !isLoading && "scale-[1.02] -translate-y-2",
        // Glow effect
        isHovered && !isLoading && glowColor,
        // Disabled state
        isLoading && "opacity-70 cursor-wait"
      )}
    >
      {/* Gradient border */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500",
          gradient,
          isHovered && "opacity-100"
        )}
      />

      {/* Card content */}
      <div
        className={cn(
          "relative flex flex-col items-center gap-6 rounded-[22px] bg-slate-900/95 p-8 backdrop-blur-sm",
          "border border-slate-700/50 transition-all duration-500",
          isHovered && "border-transparent bg-slate-900/80"
        )}
      >
        {/* Floating sparkles */}
        <div
          className={cn(
            "absolute top-4 right-4 opacity-0 transition-all duration-300",
            isHovered && "opacity-100"
          )}
        >
          <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
        </div>

        {/* Icon container with gradient background */}
        <div
          className={cn(
            "relative flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500",
            "bg-linear-to-br",
            role === "PLAYER"
              ? "from-blue-500/20 to-cyan-500/20"
              : "from-emerald-500/20 to-lime-500/20",
            isHovered && "scale-110"
          )}
        >
          {/* Pulsing ring */}
          <div
            className={cn(
              "absolute inset-0 rounded-full opacity-0 transition-opacity duration-500",
              role === "PLAYER" ? "bg-blue-500/30" : "bg-emerald-500/30",
              isHovered && "opacity-100 animate-ping"
            )}
          />

          {/* Icon */}
          <div
            className={cn(
              "relative transition-all duration-300",
              role === "PLAYER" ? "text-blue-400" : "text-emerald-400",
              isHovered && "scale-110"
            )}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-2xl font-bold text-white transition-all duration-300",
            isHovered && "scale-105"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-center text-slate-400 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        <ul className="space-y-2 text-sm text-slate-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <div
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  role === "PLAYER" ? "bg-blue-400" : "bg-emerald-400"
                )}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all duration-300",
            role === "PLAYER"
              ? "bg-linear-to-r from-blue-600 to-cyan-600"
              : "bg-linear-to-r from-emerald-600 to-lime-600",
            isHovered && "gap-4 px-8"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Preparando...</span>
            </div>
          ) : (
            <>
              <span>Começar</span>
              <ArrowRight
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isHovered && "translate-x-1"
                )}
              />
            </>
          )}
        </div>
      </div>
    </button>
  );
}

export function RoleSelector() {
  const router = useRouter();
  const [loading, setLoading] = useState<"PLAYER" | "TEAM" | null>(null);
  const setRole = useOnboardingStore((state) => state.setRole);

  const handleRoleSelection = async (role: "PLAYER" | "TEAM") => {
    setLoading(role);
    try {
      // Salvar no store local
      setRole(role);

      // Salvar no backend
      await setUserRole(role);

      // Redirecionar para o primeiro step do wizard
      if (role === "PLAYER") {
        router.push("/setup/player/steps/photo");
      } else {
        router.push("/setup/team/steps/badge");
      }
    } catch (error) {
      console.error("Erro ao selecionar perfil:", error);
      setLoading(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12 animate-slide-up">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Bem-vindo ao{" "}
          <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            VárzeaPro
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          O Tinder do futebol amador. Conecte-se com times e jogadores na sua
          região.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 animate-slide-up animation-delay-200">
        <RoleCard
          role="PLAYER"
          title="Sou Jogador"
          description="Crie seu card de atleta, mostre suas habilidades e seja descoberto por times que precisam de reforço."
          features={[
            "Perfil estilo card esportivo",
            "Match com times da região",
            "Receba convites para peladas",
          ]}
          icon={<User className="h-12 w-12" />}
          gradient="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
          glowColor="shadow-[0_0_60px_-15px_rgba(59,130,246,0.5)]"
          isLoading={loading !== null}
          onSelect={() => handleRoleSelection("PLAYER")}
        />

        <RoleCard
          role="TEAM"
          title="Sou Time"
          description="Cadastre seu time, defina os dias de jogo e encontre jogadores para completar o elenco."
          features={[
            "Página do time personalizada",
            "Busque por posição e nível",
            "Gerencie convites e confirmações",
          ]}
          icon={<Shield className="h-12 w-12" />}
          gradient="bg-gradient-to-br from-emerald-500 via-lime-500 to-yellow-500"
          glowColor="shadow-[0_0_60px_-15px_rgba(16,185,129,0.5)]"
          isLoading={loading !== null}
          onSelect={() => handleRoleSelection("TEAM")}
        />
      </div>

      {/* Footer hint */}
      <p className="text-center text-sm text-slate-500 mt-8 animate-fade-in animation-delay-400">
        Você poderá adicionar o outro perfil depois nas configurações
      </p>
    </div>
  );
}
