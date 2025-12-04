"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { updatePlayerProfile } from "@/src/app/actions/player";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/src/lib/auth-client";

const playerSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  dataNascimento: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 16;
  }, "Você deve ter pelo menos 16 anos."),
  cidade: z.string().min(2, "Cidade obrigatória"),
  estado: z.string().length(2, "Use a sigla do estado (ex: SP)"),
  posicoes: z.array(z.string()).min(1, "Selecione pelo menos uma posição"),
});

type PlayerFormValues = z.infer<typeof playerSchema>;

export default function PlayerSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.onboardingCompleted) {
      router.push("/player/dashboard");
    }
  }, [session, router]);

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      nome: "",
      dataNascimento: "",
      cidade: "",
      estado: "",
      posicoes: [],
    },
  });

  const onSubmit = async (data: PlayerFormValues) => {
    setLoading(true);
    try {
      await updatePlayerProfile(data);
      router.push("/player/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Completar Perfil de Jogador</CardTitle>
          <CardDescription>
            Precisamos de mais algumas informações para montar seu card.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" {...form.register("nome")} />
              {form.formState.errors.nome && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.nome.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                {...form.register("dataNascimento")}
              />
              {form.formState.errors.dataNascimento && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.dataNascimento.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" {...form.register("cidade")} />
                {form.formState.errors.cidade && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.cidade.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado (UF)</Label>
                <Input
                  id="estado"
                  maxLength={2}
                  {...form.register("estado")}
                  placeholder="SP"
                />
                {form.formState.errors.estado && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.estado.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Posição Principal</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...form.register("posicoes.0")}
              >
                <option value="">Selecione...</option>
                <option value="1">Goleiro</option>
                <option value="2">Zagueiro</option>
                <option value="3">Lateral</option>
                <option value="4">Meio-Campo</option>
                <option value="5">Atacante</option>
              </select>
              {form.formState.errors.posicoes && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.posicoes.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Salvando..." : "Salvar e Continuar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
