"use server";

import { db } from "@/src/db";
import { players, playerPositions, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema atualizado para o novo wizard
const playerSchema = z.object({
  cidade: z.string().min(2, "Cidade obrigatória"),
  estado: z.string().length(2, "Use a sigla do estado (ex: SP)"),
  posicoes: z.array(z.string()).min(1, "Selecione pelo menos uma posição."),
  // Campos opcionais que podemos adicionar ao banco depois
  radius: z.number().optional(),
  skillLevel: z.number().min(1).max(5).optional(),
});

export type PlayerProfileData = z.infer<typeof playerSchema>;

export async function updatePlayerProfile(data: PlayerProfileData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validated = playerSchema.parse(data);

  await db.transaction(async (tx) => {
    const existingPlayer = await tx.query.players.findFirst({
      where: eq(players.userId, session.user.id),
    });

    let playerId;

    if (existingPlayer) {
      await tx
        .update(players)
        .set({
          nome: session.user.name || "Jogador",
          cidade: validated.cidade,
          estado: validated.estado,
          // TODO: Adicionar radius e skillLevel ao schema do banco
        })
        .where(eq(players.id, existingPlayer.id));
      playerId = existingPlayer.id;
    } else {
      const [result] = await tx
        .insert(players)
        .values({
          userId: session.user.id,
          nome: session.user.name || "Jogador",
          dataNascimento: new Date("2000-01-01"), // Valor padrão temporário
          cidade: validated.cidade,
          estado: validated.estado,
        })
        .$returningId();
      playerId = result.id;
    }

    // Limpar posições antigas e inserir novas
    await tx
      .delete(playerPositions)
      .where(eq(playerPositions.playerId, playerId));

    if (validated.posicoes.length > 0) {
      await tx.insert(playerPositions).values(
        validated.posicoes.map((posId) => ({
          playerId: playerId,
          positionId: parseInt(posId),
        }))
      );
    }

    // Marcar onboarding como completo
    await tx
      .update(users)
      .set({ onboardingCompleted: true })
      .where(eq(users.id, session.user.id));
  });

  revalidatePath("/player");
  return { success: true };
}
