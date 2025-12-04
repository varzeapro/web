import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export type UserRole = "PLAYER" | "TEAM" | "ADMIN";

export async function requireAuth(
  allowedRoles?: UserRole[],
  checkOnboarding: boolean = true
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const isOnboardingCompleted = session.user.onboardingCompleted;
  const currentRole = session.user.role as UserRole | null;

  // Logic to prevent re-onboarding if already completed
  if (isOnboardingCompleted) {
    if (allowedRoles && currentRole && !allowedRoles.includes(currentRole)) {
      if (currentRole === "PLAYER") {
        redirect("/player/dashboard");
      } else if (currentRole === "TEAM") {
        redirect("/team/dashboard");
      }
    }

    // If no specific roles are required (e.g. onboarding pages), but user is already onboarded,
    // redirect them to their dashboard to prevent re-onboarding.
    if (!allowedRoles || allowedRoles.length === 0) {
      if (currentRole === "PLAYER") {
        redirect("/player/dashboard");
      } else if (currentRole === "TEAM") {
        redirect("/team/dashboard");
      }
    }

    return session;
  }

  // If onboarding is NOT completed
  // 3. If logged in AND onboarded -> redirect to dashboard (if on /welcome) OR allow access (if on dashboard)

  // Since we can't easily check "current path" inside this server function without extra args,
  // we will assume this is used on pages that REQUIRE specific roles.

  // If the user hasn't completed onboarding, they shouldn't have a valid role (PLAYER/TEAM) effectively.
  // But our schema change makes role nullable or we removed the default.

  // If onboarding is NOT completed
  if (checkOnboarding && !isOnboardingCompleted) {
    if (allowedRoles && allowedRoles.length > 0) {
      redirect("/welcome");
    }
    return session;
  }

  return session;
}
