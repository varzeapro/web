"use client";

import { RoleSelector } from "@/src/components/onboarding/role-selector";
import { useEffect } from "react";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // Redirecionar se já completou onboarding
  useEffect(() => {
    if (session?.user?.onboardingCompleted) {
      const role = session.user.role;
      if (role === "PLAYER") {
        router.push("/player");
      } else if (role === "TEAM") {
        router.push("/team");
      }
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-onboarding p-4">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl animate-float animation-delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <RoleSelector />
      </div>
    </div>
  );
}
