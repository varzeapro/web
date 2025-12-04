"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { setUserRole } from "@/src/app/actions/onboarding";
import { useRouter } from "next/navigation";
import { User, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { authClient } from "@/src/lib/auth-client";

export default function WelcomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  const handleRoleSelection = async (role: "PLAYER" | "TEAM") => {
    setLoading(true);
    try {
      await setUserRole(role);
      if (role === "PLAYER") {
        router.push("/setup/player");
      } else {
        router.push("/setup/team");
      }
    } catch (error) {
      console.error("Failed to set role:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Bem-vindo ao VárzeaPro
          </h1>
          <p className="mt-2 text-xl text-slate-400">
            Como você deseja usar a plataforma?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card Jogador */}
          <Card
            className="cursor-pointer border-slate-800 bg-slate-900 transition-all hover:border-primary hover:bg-slate-800"
            onClick={() => !loading && handleRoleSelection("PLAYER")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
                <User className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-white">Sou Jogador</CardTitle>
              <CardDescription>
                Crie seu perfil, poste vídeos e seja descoberto por times.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full" disabled={loading}>
                {loading ? "Processando..." : "Escolher Jogador"}
              </Button>
            </CardContent>
          </Card>

          {/* Card Time */}
          <Card
            className="cursor-pointer border-slate-800 bg-slate-900 transition-all hover:border-primary hover:bg-slate-800"
            onClick={() => !loading && handleRoleSelection("TEAM")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-white">Sou Time</CardTitle>
              <CardDescription>
                Gerencie seu elenco, busque reforços e marque jogos.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full" disabled={loading}>
                {loading ? "Processando..." : "Escolher Time"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
