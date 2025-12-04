"use server";

import { db } from "@/src/db";
import { teams, users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const teamSchema = z.object({
  nomeTime: z.string().min(2),
  modalidade: z.string().min(2),
  cidade: z.string().min(2),
  estado: z.string().length(2),
  nomeResponsavel: z.string().min(2),
});

export async function createTeamProfile(data: z.infer<typeof teamSchema>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const validated = teamSchema.parse(data);

  await db.transaction(async (tx) => {
    const existingTeam = await tx.query.teams.findFirst({
      where: eq(teams.userId, session.user.id),
    });

    if (existingTeam) {
      await tx
        .update(teams)
        .set({
          nomeTime: validated.nomeTime,
          modalidade: validated.modalidade,
          cidade: validated.cidade,
          estado: validated.estado,
          nomeResponsavel: validated.nomeResponsavel,
        })
        .where(eq(teams.id, existingTeam.id));
    } else {
      await tx.insert(teams).values({
        userId: session.user.id,
        nomeTime: validated.nomeTime,
        modalidade: validated.modalidade,
        cidade: validated.cidade,
        estado: validated.estado,
        nomeResponsavel: validated.nomeResponsavel,
        plano: "FREE",
        contatosRealizados: 0,
      });
    }

    await tx
      .update(users)
      .set({ onboardingCompleted: true })
      .where(eq(users.id, session.user.id));
  });

  revalidatePath("/team/dashboard");
  return { success: true };
}
