import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar se o usuário já está logado
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se já está logado, redirecionar
  if (session) {
    const isOnboardingCompleted = session.user.onboardingCompleted === true;
    const currentRole = session.user.role;

    if (isOnboardingCompleted) {
      // Usuário já completou onboarding, mandar pro dashboard
      if (currentRole === "PLAYER") {
        redirect("/player/dashboard");
      } else if (currentRole === "TEAM") {
        redirect("/team/dashboard");
      }
    }
    // Usuário logado mas não completou onboarding, mandar pro welcome
    redirect("/welcome");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">VárzeaPro</h1>
          <p className="mt-2 text-slate-400">
            A plataforma definitiva para o futebol amador.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
