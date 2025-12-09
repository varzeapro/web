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

  const isOnboardingCompleted = session.user.onboardingCompleted === true;
  const currentRole = session.user.role as UserRole | null;

  // If user has completed onboarding
  if (isOnboardingCompleted) {
    // If specific roles are required, check access
    if (allowedRoles && allowedRoles.length > 0) {
      if (!currentRole || !allowedRoles.includes(currentRole)) {
        // Redirect to appropriate dashboard
        if (currentRole === "PLAYER") {
          redirect("/player");
        } else if (currentRole === "TEAM") {
          redirect("/team");
        }
      }
    } else {
      // No specific roles required (e.g., onboarding pages)
      // Onboarded users should NOT access onboarding pages
      // Redirect them to their dashboard
      if (currentRole === "PLAYER") {
        redirect("/player");
      } else if (currentRole === "TEAM") {
        redirect("/team");
      }
      // If no role but onboarded (edge case), allow access
    }

    return session;
  }

  // User has NOT completed onboarding
  if (checkOnboarding) {
    // If trying to access protected pages that require specific roles
    if (allowedRoles && allowedRoles.length > 0) {
      // User hasn't onboarded yet, send them to onboarding
      redirect("/welcome");
    }
    // If no specific roles required (onboarding pages), allow access
  }

  return session;
}
