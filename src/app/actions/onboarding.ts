"use server";

import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export async function setUserRole(role: "PLAYER" | "TEAM") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (user?.onboardingCompleted) {
    throw new Error("Onboarding already completed");
  }

  await db.update(users).set({ role }).where(eq(users.id, session.user.id));

  return { success: true };
}
