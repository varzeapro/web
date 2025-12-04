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
import { createTeamProfile } from "@/src/app/actions/team";
import { useRouter } from "next/navigation";
import { useState } from "react";

const teamSchema = z.object({
  nomeTime: z.string().min(2, "Nome do time obrigatório"),
  modalidade: z.string().min(2, "Modalidade obrigatória"),
  cidade: z.string().min(2, "Cidade obrigatória"),
  estado: z.string().length(2, "Use a sigla (ex: SP)"),
  nomeResponsavel: z.string().min(2, "Nome do responsável obrigatório"),
});

type TeamFormValues = z.infer<typeof teamSchema>;

export default function TeamSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      nomeTime: "",
      modalidade: "",
      cidade: "",
      estado: "",
      nomeResponsavel: "",
    },
  });

  const onSubmit = async (data: TeamFormValues) => {
    setLoading(true);
    try {
      await createTeamProfile(data);
      router.push("/team/dashboard");
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
          <CardTitle>Criar Time</CardTitle>
          <CardDescription>
            Cadastre seu time para encontrar jogadores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nomeTime">Nome do Time</Label>
              <Input id="nomeTime" {...form.register("nomeTime")} />
              {form.formState.errors.nomeTime && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.nomeTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modalidade">Modalidade</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...form.register("modalidade")}
              >
                <option value="">Selecione...</option>
                <option value="Futsal">Futsal</option>
                <option value="Campo">Campo</option>
                <option value="Society">Society</option>
              </select>
              {form.formState.errors.modalidade && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.modalidade.message}
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
              <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
              <Input
                id="nomeResponsavel"
                {...form.register("nomeResponsavel")}
              />
              {form.formState.errors.nomeResponsavel && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.nomeResponsavel.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando Time..." : "Criar Time"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
