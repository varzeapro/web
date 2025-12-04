"use server";

import { db } from "@/src/db";
import { players, playerPositions, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const playerSchema = z.object({
  nome: z.string().min(2),
  dataNascimento: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 16;
  }, "Você deve ter pelo menos 16 anos."),
  cidade: z.string().min(2),
  estado: z.string().length(2),
  posicoes: z.array(z.string()).min(1, "Selecione pelo menos uma posição."),
});

export async function updatePlayerProfile(data: z.infer<typeof playerSchema>) {
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
          nome: validated.nome,
          dataNascimento: new Date(validated.dataNascimento),
          cidade: validated.cidade,
          estado: validated.estado,
        })
        .where(eq(players.id, existingPlayer.id));
      playerId = existingPlayer.id;
    } else {
      const [result] = await tx
        .insert(players)
        .values({
          userId: session.user.id,
          nome: validated.nome,
          dataNascimento: new Date(validated.dataNascimento),
          cidade: validated.cidade,
          estado: validated.estado,
        })
        .$returningId();
      playerId = result.id;
    }

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

    await tx
      .update(users)
      .set({ onboardingCompleted: true })
      .where(eq(users.id, session.user.id));
  });

  revalidatePath("/player/dashboard");
  return { success: true };
}
