import { requireAuth } from "@/src/lib/auth-guard";
import Link from "next/link";
import { TeamBottomNavbar } from "@/src/components/team-dashboard";

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Requires authenticated user with TEAM role
  await requireAuth(["TEAM"]);

  return (
    <>
      <div className="min-h-screen bg-onboarding w-full overflow-x-hidden pb-24 md:pb-0">
        {/* Header - Full width on desktop */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0f0f1a]/90 backdrop-blur-lg px-4 py-4 lg:px-8">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <div>
              <Link href="/time">
                <h1 className="text-2xl font-bold text-white">
                  ⚽ <span className="text-(--varzea-green)">VárzeaPro</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Nav Actions */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/time"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Início
              </Link>
              <Link
                href="/time/elenco"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Explorar Jogadores
              </Link>
              <Link
                href="/time/partidas"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Minhas Partidas
              </Link>
              <Link
                href="/time/financas"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                Finanças
              </Link>
              <Link
                href="/time/configuracoes"
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                👤
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>

      {/* Mobile Bottom Navigation - FORA do container para garantir position:fixed */}
      <div className="md:hidden">
        <TeamBottomNavbar />
      </div>
    </>
  );
}
